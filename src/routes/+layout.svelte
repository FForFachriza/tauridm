<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { aria2, close } from 'maria2';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { getAria2Connection } from '$lib/aria2_connection';

	let { children } = $props();

	onMount(async () => {
		const conn = await getAria2Connection();
		const version = await aria2.getVersion(conn);

		console.log(version);
	});
</script>

<Sidebar>
	{@render children()}
</Sidebar>
