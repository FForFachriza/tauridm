<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Item from '$lib/components/ui/item/';
	import { Progress } from '$lib/components/ui/progress';
	import { downloadState } from '$lib/store/store.svelte';
	import { FolderOpen, PauseIcon, SquareIcon, SquareStopIcon } from '@lucide/svelte';
	import prettyBytes from 'pretty-bytes';
</script>

<main class="w-full h-full gap-y-4 flex flex-col">
	{#if downloadState.length === 0}
		<div class="flex h-full w-full justify-center items-center">
			<p>There is nothing here.....</p>
		</div>
	{:else}
		{#each downloadState as item (item.gid)}
			<Item.Root variant="outline">
				<Item.Header class="flex justify-between items-center">
					<p class="font-semibold text-foreground truncate flex-1">
						{item.filename}
					</p>
					<Badge class="capitalize">{item.status}</Badge>
				</Item.Header>
				<Item.Media />
				<Item.Content class="-mx-3.5 w-full">
					<Progress value={item.progress} max={100} />
					<Item.Description class="flex flex-row gap-x-4 mt-2">
						<p>{prettyBytes(+item!.completedLength!)} / {prettyBytes(+item!.totalLength!)}</p>
						<p>•</p>
						<p>Speed: {prettyBytes(+item!.downloadSpeed!)}</p>
						<p>•</p>
						<p>
							ETA: {Math.floor(
								(+item!.totalLength! - +item!.completedLength!) / (+item!.downloadSpeed! || 1)
							)} seconds
						</p>
					</Item.Description>
				</Item.Content>
				<Item.Footer class="flex flex-row gap-x-2 justify-start">
					{#if item.status === 'complete'}
						<Button variant="outline" class="flex flex-row justify-start items-center">
							<FolderOpen />
							<p>Open Folder</p>
						</Button>
					{:else}
						<Button variant="outline" class="flex flex-row justify-start items-center">
							<PauseIcon />
							<p>Pause</p>
						</Button>
						<Button variant="outline" class="flex flex-row justify-start items-center">
							<SquareStopIcon />
							<p>Stop</p>
						</Button>
					{/if}
				</Item.Footer>
			</Item.Root>
		{/each}
	{/if}
</main>
