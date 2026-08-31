import { defineConfig } from "vite";
import Vue2 from "@vitejs/plugin-vue2";
import UserscriptPlugin from "vite-userscript-plugin";
import { name, description, version, author } from "./package.json" with { type: "json" };
import { namespace, homepage as homepageURL, bugs } from "../../package.json" with { type: "json" };

export default defineConfig({
    define: {
        "process.env.NODE_ENV": JSON.stringify("production")
    },
    plugins: [
        Vue2(),
        UserscriptPlugin({
            entry: "src/main.ts",
            header: {
                name,
                namespace,
                description,
                version: process.env.USERSCRIPT_VERSION || version,
                author,
                homepageURL,
                supportURL: bugs.url,
                match: [
                    "https://www.ascap.com/repertory"
                ],
                "run-at": "document-start",
                downloadURL: process.env.USERSCRIPT_DOWNLOAD_URL,
                updateURL: process.env.USERSCRIPT_UPDATE_URL,
            },
            server: {
                file: true,
            },
        })
    ],
    build: {
        minify: false,
        target: "esnext",
    },
});
