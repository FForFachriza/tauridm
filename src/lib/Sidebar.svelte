<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Button } from './components/ui/button';
	import { sidebarItems } from './sidebar-items';
	import { page } from '$app/state';
	import { cn } from './utils';
	import Navbar from './Navbar.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	console.log(page.url.pathname);
</script>

<main class="flex flex-row antialiased font-sans">
	<aside class="w-56 border-r">
		<div class="p-4 border-b">
			<h1 class="text-xl font-bold text-foreground tracking-tight">TauriDM</h1>
		</div>
		<div class="flex flex-1 flex-col justify-between min-h-[calc(100vh-64px)] gap-y-1 p-3">
			<div>
				{#each sidebarItems as item (item.href)}
					<Button
						href={item.href}
						variant="ghost"
						class={cn(
							'flex flex-row justify-start w-full py-5 items-center',
							page.url.pathname === item.href &&
								'bg-accent text-accent-foreground dark:bg-accent/50'
						)}
					>
						<item.icon />
						<p>{item.label}</p>
					</Button>
				{/each}
			</div>
			<div class="flex flex-row pt-2 border-t items-center">
				<Button variant="ghost" class="flex flex-row justify-start w-full  items-center">
					<div class="size-3 bg-green-200 rounded-full"></div>
					<p>Connected</p>
				</Button>
			</div>
		</div>
	</aside>
	<section class="flex flex-col w-full">
		<Navbar />
		<section class="flex flex-1 p-4">
			{@render children()}
		</section>
	</section>
</main>
