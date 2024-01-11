<script lang="ts">
	const onClickHandler = (event: MouseEvent) => {
		let key = (event.target as HTMLButtonElement).textContent;
		if (!key) return;
		if (key === '←') {
			key = 'Backspace';
		}

		document.dispatchEvent(new KeyboardEvent('keyup', { key: key, bubbles: true }));
	};
</script>

<button class="keyboard-button" on:click={onClickHandler}>
	<slot />
</button>

<style>
	.keyboard-button {
		cursor: pointer;
		text-transform: uppercase;
	}
</style>
