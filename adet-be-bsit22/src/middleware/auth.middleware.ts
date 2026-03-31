import { Context, Next }  from 'hono';
import jwt                from 'jsonwebtoken';

// ── Types ──────────────────────────────────────────────────────────────────────
interface JwtPayload {
  id: number;
}

// ── Verify JWT Token ───────────────────────────────────────────────────────────
// Runs before every /api/* route.
// On success → attaches userId to context and calls next()
// On failure → returns 401/403 immediately
export const verifyToken = async (c: Context, next: Next) => {

  // 1. Pull token from Authorization header
  const authHeader = c.req.header('Authorization');
  const token      = authHeader?.split(' ')[1];   // "Bearer <token>"

  if (!token) {
    return c.json({ message: 'No token provided' }, 403);
  }

  // 2. Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    c.set('userId', decoded.id);   // available in routes via c.get('userId')
    await next();
  } catch {
    return c.json({ message: 'Unauthorized' }, 401);
  }

};
