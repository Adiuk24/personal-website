#!/usr/bin/env python3
"""
Render the 1200x630 OpenGraph card for a research post.

Matches the card design by hand-built for ai-privacy-gateway: black field, orange
rule on top, letterspaced eyebrow, wrapped title, byline, source-count pill.

  python3 scripts/build-og-image.py <slug> "<title>" <citations>
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BLACK = (10, 10, 10)
WHITE = (255, 255, 255)
ORANGE = (242, 125, 38)
GREY = (161, 158, 149)
MARGIN = 72

TITLE_FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD_FONT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def wrap(draw, text, font, max_width):
    """Greedy wrap on measured width — PIL has no text layout engine."""
    lines, line = [], []
    for word in text.split():
        trial = " ".join(line + [word])
        if draw.textlength(trial, font=font) <= max_width or not line:
            line.append(word)
        else:
            lines.append(" ".join(line))
            line = [word]
    if line:
        lines.append(" ".join(line))
    return lines


def tracked(draw, xy, text, font, fill, tracking):
    """Draw text with extra letter spacing; PIL applies none of its own."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking


def build(slug: str, title: str, citations: int, out_dir: Path):
    img = Image.new("RGB", (W, H), BLACK)
    d = ImageDraw.Draw(img)

    d.rectangle([0, 0, W, 8], fill=ORANGE)

    eyebrow = ImageFont.truetype(BOLD_FONT, 20)
    tracked(d, (MARGIN, 84), "PUBLISHED RESEARCH", eyebrow, ORANGE, 6)

    # Shrink the title until it fits three lines; long titles otherwise collide
    # with the byline.
    for size in (66, 60, 54, 48, 42):
        title_font = ImageFont.truetype(TITLE_FONT, size)
        lines = wrap(d, title, title_font, W - 2 * MARGIN - 40)
        if len(lines) <= 3:
            break

    y = 138
    for line in lines:
        d.text((MARGIN, y), line, font=title_font, fill=WHITE)
        y += int(size * 1.28)

    name_font = ImageFont.truetype(BOLD_FONT, 27)
    url_font = ImageFont.truetype(TITLE_FONT, 21)
    d.text((MARGIN, 484), "Arif Adito", font=name_font, fill=WHITE)
    d.text((MARGIN, 532), "arifadito.com", font=url_font, fill=GREY)

    pill_font = ImageFont.truetype(TITLE_FONT, 23)
    label = f"{citations} sources"
    tw = d.textlength(label, font=pill_font)
    pw, ph = tw + 56, 52
    px, py = W - MARGIN - pw, 496
    d.rounded_rectangle([px, py, px + pw, py + ph], radius=ph // 2, outline=ORANGE, width=2)
    d.text((px + 28, py + 12), label, font=pill_font, fill=ORANGE)

    out = out_dir / f"{slug}.png"
    img.save(out)
    print(f"wrote {out} ({len(lines)} title lines at {size}px)")


if __name__ == "__main__":
    build(
        sys.argv[1],
        sys.argv[2],
        int(sys.argv[3]),
        Path(__file__).resolve().parent.parent / "public" / "og",
    )
