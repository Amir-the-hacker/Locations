import { defineConfig } from "orval";

export default defineConfig({
    // HTTP client generation
    locationsApi: {
        input: {
            target: "./openapi.json",
        },
        output: {
            mode: "tags-split",
            client: "react-query",
            httpClient: "axios",
            target: "src/api/endpoints",
            schemas: "src/api/models",
        },
    },
    // Zod schema generation
    locationsApiZod: {
        input: {
            target: "./openapi.json",
        },
        output: {
            mode: "tags-split",
            client: "zod",
            target: "src/api/endpoints",
            fileExtension: ".zod.ts",
        },
    },
});
