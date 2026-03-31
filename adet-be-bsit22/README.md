# adet-be-bsit22

## Setup

```bash
npm install
npm run dev
```

## .env
```
JWT_SECRET=your_super_secret_key_change_this
```

## Folder Structure

```
src/
├── routes/
│   ├── auth.routes.js      ← POST /api/auth/login
│   └── api.routes.js       ← protected routes (add yours here)
├── middleware/
│   └── auth.middleware.js  ← verifies JWT on every /api/* request
└── server.js               ← app entry point
```

## Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'
```

## Test Protected Route
```bash
curl http://localhost:3000/api/hello \
  -H "Authorization: Bearer <your_token>"
```
