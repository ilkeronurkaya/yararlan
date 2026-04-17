import { getCloudflareContext } from '@opennextjs/cloudflare';

export const getDB = () => {
  const context = getCloudflareContext();
  if (!context) {
    // This happens during local development if not using wrangler or during build
    throw new Error('Cloudflare Request Context not found');
  }
  return context.env.DB;
};
