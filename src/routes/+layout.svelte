<script lang="ts">
	import Sidebar from '$lib/Sidebar.svelte';
	import './layout.css';

	let { children } = $props();
</script>

<main class="antialiased font-sans">
	<Sidebar>
		{@render children()}
	</Sidebar>
</main>
