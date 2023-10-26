import esbuild from "esbuild";
import { build as viteBuild } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import ansi from "ansi-colors";
import { ChildProcess, spawn } from "child_process";


async function build() {
    // client
    await viteBuild({
        root: "./src/client",
        mode: "dev",
        plugins: [svelte({})],
        build: {
            rollupOptions: {
                output: {
                    dir: "./dist/client"
                }
            }
        }
    })


    // server
    let config: esbuild.BuildOptions = {
        entryPoints: ["src/server/**/*.ts"],
        bundle: false,
        minify: true,
        outdir: "./dist/server",
        platform: "node",
        format: "esm",
        logLevel: "silent",
    }

    await esbuild.build(config).then(() => {
        console.log(`${ansi.bold("QUICKDEV")}\n[${ansi.greenBright("SUCCESS")}] Build complete.`)
    })

}

if (process.argv.includes("--watch")) {
    const fs = require('fs');

    let process: ChildProcess;

    fs.watch("src", async (eventType, filename) => {
        build();
        if ( process ) process.kill();
        process = await spawn("node", ["./dist/server/main.js"]);
    });
} else {
    await build();
}