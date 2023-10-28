<script lang="ts">
    import "./styles/main.scss";
    import Select from "./lib/Select.svelte";

    let a: string = "";
</script>

<div class="container">
    <div class="welcome">
        <div class="title">
            <span class="h1">quickdev</span>
            <br />
            <span>made with ♥ by quarksoftworks</span>
        </div>
        <div class="start">
            <div class="title">
                <span class="h2">start</span>
            </div>
            <Select name="language" options={["node.js", "html,css,js"]}/>
            <button>start coding</button>
        </div>
    </div>
</div>

<style lang="scss">
    :root {
        overflow: hidden;
    }

    .container {
        display: flex;
        border-right: 1px solid white;
        height: 100vh;
        width: 70vh;

        & > .welcome {
            margin: 75px 30px;
            display: flex;
            flex-direction: column;
            gap: 2ch;

            & > .start {
                display: flex;
                flex-direction: column;
                gap: 1ch;
            }
        }
    }
</style>
