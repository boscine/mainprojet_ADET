import { Hono }         from 'hono';
import jwt              from 'jsonwebtoken';
import bcrypt           from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const router = new Hono();
const prisma = new PrismaClient();

// ── POST /api/auth/login ───────────────────────────────────────────────────────
router.post('/login', async (c) => {
  const { email, password } = await c.req.json();

  // 1. Find user in database
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return c.json({ message: 'Invalid credentials' }, 401);

  // 2. Check if account is active
  if (user.status !== 'active') {
    return c.json({ message: 'Account is suspended or banned' }, 403);
  }

  // 3. Check password
  const passwordMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!passwordMatch) return c.json({ message: 'Invalid credentials' }, 401);

  // 4. Update last login
  await prisma.user.update({
    where: { id: user.id },
    data:  { lastLogin: new Date() },
  });

  // 5. Sign and return token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );

  return c.json({ token });
});

// ── POST /api/auth/register ────────────────────────────────────────────────────
router.post('/register', async (c) => {
  const { email, password, displayName } = await c.req.json();

  // 1. Validate Liceo email
  if (!email.endsWith('@liceo.edu.ph')) {
    return c.json({ message: 'Only Liceo email addresses are allowed' }, 400);
  }

  // 2. Check if email already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return c.json({ message: 'Email already registered' }, 409);

  // 3. Hash password
  const passwordHash = bcrypt.hashSync(password, 10);

  // 4. Create user
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      displayName,
      role:   'student',
      status: 'active',
    },
  });

  // 5. Sign and return token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );

  return c.json({ token }, 201);
});

export default router;