<script lang="ts">
	import { PlusIcon } from '@lucide/svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from './ui/button';
	import { Input } from './ui/input';
	import { getAria2Connection } from '$lib/aria2_connection';
	import { aria2 } from 'maria2';
	import { toast } from 'svelte-sonner';
	import { downloadState } from '$lib/store/store.svelte';

	let dialogOpen = $state<boolean>(false);
	let downloadUrl = $state<string>('');

	const addDownload = async () => {
		dialogOpen = false;
		toast.info('Download added successfully');

		try {
			const conn = await getAria2Connection();
			const gid = await aria2.addUri(conn, [downloadUrl]);

			downloadState.push({
				gid: gid,
				filename: 'Fetching metadata...',
				status: 'active',
				progress: 0,
				downloadSpeed: '0',
				totalLength: '0',
				completedLength: '0',
				filepath: ''
			});

			const index = downloadState.findIndex((item) => item.gid === gid);

			const intervalId = setInterval(async () => {
				try {
					const status = await aria2.tellStatus(conn, gid, [
						'status',
						'totalLength',
						'completedLength',
						'downloadSpeed',
						'errorCode',
						'files'
					]);

					if (index !== -1) {
						const total = +status.totalLength;
						const completed = +status.completedLength;
						const progress = Number(total > 0 ? ((completed / total) * 100).toFixed(2) : '0');

						if (downloadState[index].filename === 'Fetching metadata...' && status.files[0]?.path) {
							const rawPath = status.files[0].path;
							const cleanName = rawPath.replace(/\\/g, '/').split('/').pop() || 'Unknown File';

							downloadState[index].filename = cleanName;
							downloadState[index].filepath = rawPath;
						}
						downloadState[index].progress = progress;
						downloadState[index].status = status.status;
						downloadState[index].downloadSpeed = status.downloadSpeed;
						downloadState[index].totalLength = status.totalLength;
						downloadState[index].completedLength = status.completedLength;
					}

					if (['complete', 'error', 'removed'].includes(status.status)) {
						if (status.status === 'complete') toast.success('Download Completed!');
						if (status.status === 'error') toast.error(`Error: ${status.errorCode}`);
						clearInterval(intervalId);
					}
				} catch (err) {
					toast.error(`Error Pooling: ${err}`);
					clearInterval(intervalId);
				}
			}, 1000);
		} catch (err) {
			toast.error(`Failed to Add Download: ${err}`);
		}
	};
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

	<Dialog.Root bind:open={dialogOpen}>
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
			<Input bind:value={downloadUrl} placeholder="Paste Magnet or URL" type="text" />
			<div class="flex flex-row justify-end gap-x-4">
				<Dialog.Close>
					<Button variant="outline">Cancel</Button>
				</Dialog.Close>
				<Button onclick={addDownload}>Download</Button>
			</div>
		</Dialog.Content>
	</Dialog.Root>
</div>
