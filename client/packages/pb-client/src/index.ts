// @prime-my-brain/pb-client
// Shared PocketBase client instance and configuration

import PocketBase from 'pocketbase';

let pbUrl = 'http://localhost:8090';

// Allow runtime configuration via environment variable
if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PB_URL) {
  pbUrl = import.meta.env.VITE_PB_URL;
}

export const pb = new PocketBase(pbUrl);

// Disable auto-cancellation for concurrent requests
pb.autoCancellation(false);

export type PocketBaseClient = typeof pb;

export default pb;
