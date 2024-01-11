<script lang="ts">
	import KeyboardButton from './KeyboardButton.svelte';

	const keyboardButton = (event: Event) => console.log(event);
</script>

<div class="keyboard">
	<div class="keyboard-row">
		<KeyboardButton>q</KeyboardButton>
		<KeyboardButton>w</KeyboardButton>
		<KeyboardButton>e</KeyboardButton>
		<KeyboardButton>r</KeyboardButton>
		<KeyboardButton>t</KeyboardButton>
		<KeyboardButton>y</KeyboardButton>
		<KeyboardButton>u</KeyboardButton>
		<KeyboardButton>i</KeyboardButton>
		<KeyboardButton>o</KeyboardButton>
		<KeyboardButton>p</KeyboardButton>
	</div>
	<div class="keyboard-row">
		<KeyboardButton>a</KeyboardButton>
		<KeyboardButton>s</KeyboardButton>
		<KeyboardButton>d</KeyboardButton>
		<KeyboardButton>f</KeyboardButton>
		<KeyboardButton>g</KeyboardButton>
		<KeyboardButton>h</KeyboardButton>
		<KeyboardButton>j</KeyboardButton>
		<KeyboardButton>k</KeyboardButton>
		<KeyboardButton>l</KeyboardButton>
	</div>
	<div class="keyboard-row">
		<KeyboardButton>←</KeyboardButton>
		<KeyboardButton>z</KeyboardButton>
		<KeyboardButton>x</KeyboardButton>
		<KeyboardButton>c</KeyboardButton>
		<KeyboardButton>v</KeyboardButton>
		<KeyboardButton>b</KeyboardButton>
		<KeyboardButton>n</KeyboardButton>
		<KeyboardButton>m</KeyboardButton>
		<KeyboardButton>Enter</KeyboardButton>
	</div>
</div>

<style>
	.keyboard {
		margin: 1rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.keyboard-row {
		display: flex;
	}
	.keyboard-row {
		display: flex;
		gap: 0.4rem;
		margin-top: 0.4rem;
	}
</style>
