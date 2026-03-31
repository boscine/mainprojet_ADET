import { Hono } from 'hono';

const router = new Hono<{ Variables: { userId: string } }>();

router.get('/hello', (c) => {
  const userId = c.get('userId');
  return c.json({ message: `Hello ${userId}` });
});

// THIS LINE IS THE KEY:
export default router;