<script lang="ts">
    import { slide } from "svelte/transition";
    export let options: string[] = [];
    export let name: string;
    let dropdownVisible = false;
    let dropdownElement: HTMLDivElement;

    function toggleDropdown() {
        dropdownVisible = !dropdownVisible;
    }
</script>

<div
    class="custom-dropdown"
    bind:this={dropdownElement}
    on:click={toggleDropdown}
>
    <span>{name}</span>
    {#if dropdownVisible}
        <ul transition:slide>
            {#each options as option (option)}
                <li>{option}</li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="scss">
    .custom-dropdown {
        text-align: center;
        border: none;
        appearance: none;
        padding: 10px;
        font-family: "Inter";
        font-weight: bolder;
        color: rgb(255, 255, 255);
        background: none;
        border: 1px solid white;
        transition: 0.3s;

        &:hover {
            scale: 1.1;
        }
    }

    .custom-dropdown ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .custom-dropdown li {
        padding: 10px;
        cursor: pointer;

        &:hover {
            background-color: rgb(255, 255, 255);
            color: black;
        }
    }
</style>
