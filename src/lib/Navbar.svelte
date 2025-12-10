<script lang="ts">
	import { PlusIcon } from '@lucide/svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Button from './components/ui/button/button.svelte';
	import Input from './components/ui/input/input.svelte';
</script>

<div class="flex flex-row justify-between p-4 border-b h-[61px]">
	<div class="flex flex-row items-center gap-x-4">
		<h2 class="text-xl font-semibold text-foreground">All Downloads</h2>
		<div class="flex items-center gap-4 text-sm text-muted-foreground">
			<span>Speed: <span class="text-foreground font-medium">12.5 MB/s</span></span><span
				class="text-zinc-600">|</span
			><span>Active: <span class="text-foreground font-medium">3</span></span>
		</div>
	</div>

	<Dialog.Root>
		<Dialog.Trigger>
			<Button class="flex flex-row justify-start w-full  items-center">
				<PlusIcon />
				<p>Add URL</p>
			</Button>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Add Download</Dialog.Title>
			</Dialog.Header>
			<Input placeholder="Paste Magnet or URL" type="text" />
			<div class="flex flex-row justify-end gap-x-4">
				<Button variant="outline">Cancel</Button>
				<Button>Download</Button>
			</div>
		</Dialog.Content>
	</Dialog.Root>
</div>
