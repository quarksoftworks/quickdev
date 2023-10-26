import esbuild from "esbuild";
import { build as viteBuild } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import ansi from "ansi-colors";
import chokidar from "chokidar";
import fs from "fs";
import { ChildProcess, execFile, spawn } from "child_process";


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
        entryPoints: ["src/server/main.ts"],
        bundle: true,
        minify: true,
        external: ["express", "dotenv"],
        outfile: "./dist/server/main.js",
        platform: "node",
        logLevel: "silent",
    }

    await esbuild.build(config).then(() => {
        console.log(`${ansi.bold("QUICKDEV")}\n[${ansi.greenBright("SUCCESS")}] Build complete.`)
    })

}

function start () {
    let childProcess = spawn('node', ['./dist/server/main.js']);

    childProcess.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    childProcess.stderr.on('data', (data) => {
        console.error(`${data}`);
    });


    return childProcess;
}

if (process.argv.includes("--watch")) {
    await build();
    let childProcess = start();

    // Initialize watcher.
    const watcher = chokidar.watch('src', { persistent: true });

    // Add event listeners.
    watcher.on('change', async (path) => {
        console.log(`File ${path} has been changed`);

        await build();
        process.kill(childProcess.pid as number);
        childProcess = start()
    });
} else {
    await build();
}