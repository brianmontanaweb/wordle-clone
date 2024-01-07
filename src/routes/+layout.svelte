<script lang="ts">
	import { dev } from '$app/environment';

	const isMswEnabled = dev && import.meta.env.VITE_MSW_ENABLED === 'true';
	let isReady = !isMswEnabled;

	if (isMswEnabled) {
		import('src/mocks').then(({ inject }) => inject()).then(() => (isReady = true));
	}
</script>

{#if isReady}
	<slot />
{/if}
