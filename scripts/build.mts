import esbuild from "esbuild";
import { build as viteBuild } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import ansi from "ansi-colors";

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