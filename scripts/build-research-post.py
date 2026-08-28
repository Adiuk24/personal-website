#!/usr/bin/env python3
"""
Convert a hyperresearch final report into a publishable HTML fragment.

The vault cites sources as [[note-id]] wikilinks, which resolve to nothing on the
open web. This walks each wikilink back to its note, reads the `source:` URL out
of the frontmatter, and rewrites the citation as a numbered, linked reference.
Citations whose note is missing are reported, never invented.
"""
import re
import sys
import json
from pathlib import Path

import markdown

VAULT = Path.home() / "research" / "notes"


def note_meta(note_id: str):
    """Return (url, title) from a vault note's frontmatter, or None."""
    f = VAULT / f"{note_id}.md"
    if not f.exists():
        return None
    url = title = None
    for line in f.read_text(encoding="utf-8", errors="ignore").splitlines()[:40]:
        if line.startswith("source:") and url is None:
            v = line.split(":", 1)[1].strip().strip("'\"")
            if v.startswith("http"):
                url = v
        elif line.startswith("title:") and title is None:
            title = line.split(":", 1)[1].strip().strip("'\"")
        elif line.strip() == "---" and url:
            break
    return (url, title or note_id) if url else None


def build(src: Path, out_html: Path, out_meta: Path):
    text = src.read_text(encoding="utf-8")

    order: list[str] = []      # note_ids in first-citation order
    resolved: dict[str, tuple] = {}
    unresolved: list[str] = []

    def repl(m):
        nid = m.group(1)
        if nid not in resolved and nid not in unresolved:
            meta = note_meta(nid)
            if meta:
                resolved[nid] = meta
                order.append(nid)
            else:
                unresolved.append(nid)
        if nid in unresolved:
            # Keep the claim, drop the dead link, mark it for the author.
            return '<sup class="cite-missing" title="source not resolved">[?]</sup>'
        n = order.index(nid) + 1
        return f'<sup class="cite"><a href="#ref-{n}" id="cite-{n}">[{n}]</a></sup>'

    text = re.sub(r"\[\[([^\]]+)\]\]", repl, text)

    body = markdown.markdown(
        text,
        extensions=["tables", "fenced_code", "toc", "attr_list"],
        output_format="html5",
    )

    refs = ['<h2 id="references">References</h2>', '<ol class="references">']
    for i, nid in enumerate(order, start=1):
        url, title = resolved[nid]
        safe = (title.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))
        refs.append(
            f'<li id="ref-{i}"><a href="{url}" target="_blank" rel="noopener noreferrer">{safe}</a>'
            f' <span class="ref-host">{url.split("/")[2] if "//" in url else url}</span>'
            f' <a class="ref-back" href="#cite-{i}">&#8617;</a></li>'
        )
    refs.append("</ol>")

    out_html.write_text(body + "\n" + "\n".join(refs), encoding="utf-8")
    out_meta.write_text(
        json.dumps(
            {
                "citations_resolved": len(order),
                "citations_unresolved": sorted(set(unresolved)),
                "words": len(src.read_text(encoding="utf-8").split()),
            },
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"resolved {len(order)} citations, {len(set(unresolved))} unresolved")
    for u in sorted(set(unresolved)):
        print(f"  unresolved: {u}")


if __name__ == "__main__":
    build(Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3]))
