<script lang="ts">
	export let charState = 3;

	const charStateStyles = ['incorrect', 'close', 'correct', ''];
</script>

<span class="char-item {charStateStyles[charState]}">
	<slot />
</span>

<style>
	.char-item {
		display: flex;
		justify-content: center;
		align-items: center;
		text-transform: capitalize;
		border: 1px solid black;
		width: 40px;
		height: 40px;
		font-size: 30px;
		margin: 0.5rem;
	}
	.correct {
		background-color: lightgreen;
	}
	.incorrect {
		background-color: lightcoral;
	}
	.close {
		background-color: lightgoldenrodyellow;
	}
</style>
