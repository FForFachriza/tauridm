import { CircleCheckBig, Cog, Download, Layers } from '@lucide/svelte';

export const sidebarItems = [
	{
		href: '/',
		label: 'All Downloads',
		icon: Layers
	},
	{
		href: '/downloads/downloading',
		label: 'Downloading',
		icon: Download
	},
	{
		href: '/downloads/completed',
		label: 'Completed',
		icon: CircleCheckBig
	},
	{
		href: '/settings',
		label: 'Settings',
		icon: Cog
	}
];
