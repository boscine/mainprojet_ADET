import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import 'dotenv/config';

// 1. Remove .js and ensure names match
import authRoutes from './routes/auth.routes';
import apiRoutes from './routes/api.routes';
import { verifyToken } from './middleware/auth.middleware'; // Matches the export now!

const app = new Hono();

app.use('*', cors({ origin: 'http://localhost:4200' }));

// ── Routes ─────────────────────────────────────────────────────────────────────
app.route('/api/auth', authRoutes);   // public  → login, register (no token needed)
app.use('/api/v1/*', verifyToken);    // 🔒 only protect /api/v1/* routes
app.route('/api/v1', apiRoutes);      // protected routes


serve({ fetch: app.fetch, port: 3000 }, () =>
  console.log('API running → http://localhost:3000')
);