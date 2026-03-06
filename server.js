import express from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'pottery-class-api' });
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'Email and password required' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ ok: false, error: 'Invalid credentials' });
    }

    // Hash incoming password with SHA-256 (simple, no extra deps)
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    if (user.passwordHash !== passwordHash) {
      return res.status(401).json({ ok: false, error: 'Invalid credentials' });
    }

    res.json({ ok: true, email: user.email });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// Serve production build from dist/
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Catch-all route for SPA
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Pottery Class server running on port ${PORT}`);
});