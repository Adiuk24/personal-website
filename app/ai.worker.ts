import { pipeline, env, type TextGenerationPipeline, TextStreamer } from "@huggingface/transformers";

// Skip local check as we are in the browser
env.allowLocalModels = false;
env.useBrowserCache = true;

class TextGenerationPipelineSingleton {
    static task = 'text-generation' as const;
    static model = 'onnx-community/SmolLM-135M-Instruct-v0.2';
    static instance: Promise<TextGenerationPipeline> | null = null;

    static async getInstance(progress_callback?: (x: any) => void): Promise<TextGenerationPipeline> {
        if (this.instance === null) {
            this.instance = (pipeline(this.task, this.model, {
                progress_callback,
                device: 'webgpu',
                dtype: 'q4',
            }) as Promise<TextGenerationPipeline>).catch(err => {
                console.warn("WebGPU not available, falling back to CPU", err);
                return pipeline(this.task, this.model, {
                    progress_callback,
                    device: 'wasm',
                    dtype: 'q4',
                }) as Promise<TextGenerationPipeline>;
            });
        }
        return this.instance;
    }
}

self.addEventListener('message', async (event: MessageEvent) => {
    const { messages } = event.data;

    try {
        const generator = await TextGenerationPipelineSingleton.getInstance(x => {
            self.postMessage({ status: 'progress', ...x });
        });

        const streamer = new TextStreamer(generator.tokenizer, {
            skip_prompt: true,
            callback_function: (text: string) => {
                self.postMessage({ status: 'update', output: text });
            },
        });

        const output = await generator(messages, {
            max_new_tokens: 512,
            temperature: 0.7,
            do_sample: true,
            top_k: 50,
            streamer,
        });

        self.postMessage({
            status: 'complete',
            output: (output[0] as any).generated_text
        });

    } catch (error: any) {
        console.error("Worker Error:", error);
        self.postMessage({
            status: 'error',
            error: error.message
        });
    }
});
