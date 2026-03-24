import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '',
});

export default async function handler(req: any, res: any) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'ID required' });
  
  try {
    const greeting = await redis.get(`greeting_${id}`);
    if (!greeting) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(greeting);
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}
