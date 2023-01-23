<script>
	import { base } from "src/lib/api";
	import Board from "src/shared/board.svelte";
	import CharItem from "src/shared/charItem.svelte";
	import LineItem from "src/shared/lineItem.svelte";
    const dataTest = new Array(6).fill('     ');

    async function fetchSecretWord() {
        try {
            const res = await fetch(`${base}/wordle`);
            const data = res.json();
            return data;
        } catch (e) {
            console.error(e);
        }
    }

    let secretWod = fetchSecretWord();
</script>

<style>
    h1 {
        text-align: center;
    }
</style>

<svelte:head>
	<title>Wordle Clone: Start</title>
</svelte:head>

<h1>Start!</h1>

<Board>
    {#await secretWod}
        <p>loading</p>
    {:then data} 
        <p>{data}</p>
    {/await}
    
    {#each dataTest as word}
        <LineItem>
            {#each word as char} 
                <CharItem>{char}</CharItem>
            {/each}
        </LineItem> 
    {/each}
</Board>