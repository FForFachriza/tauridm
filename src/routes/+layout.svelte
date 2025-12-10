<script lang="ts">
	import Sidebar from '$lib/Sidebar.svelte';
	import './layout.css';

	let { children } = $props();
</script>

	<Sidebar>
		{@render children()}
	</Sidebar>
