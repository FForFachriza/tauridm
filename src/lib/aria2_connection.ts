import { open, createWebSocket, type Conn } from 'maria2';

let aria2Instance: Conn | undefined;
let connectionPromise: Promise<Conn> | undefined;

export const getAria2Connection = async (): Promise<Conn> => {
	if (aria2Instance) {
		return aria2Instance;
	}

	if (connectionPromise) {
		return connectionPromise;
	}

	connectionPromise = (async () => {
		try {
			const socket = createWebSocket('ws://localhost:6800/jsonrpc');
			const conn = await open(socket);
			aria2Instance = conn;
			return conn;
		} catch (error) {
			connectionPromise = undefined;
			console.error('Failed to establish Aria2 connection:', error);
			throw error;
		}
	})();

	return connectionPromise;
};
