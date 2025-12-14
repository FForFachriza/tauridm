import { type Aria2DownloadStatus } from 'maria2';

type DownloadState = Partial<Aria2DownloadStatus> & {
	filename: string | undefined;
	progress: number | undefined;
	filepath: string | undefined;
};

export const downloadState = $state<DownloadState[]>([]);
