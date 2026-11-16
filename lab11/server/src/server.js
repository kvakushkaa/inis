require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connectDB } = require('./config/db');
const Product = require('./models/Product');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 5011;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://127.0.0.1:51711';

app.use(
  cors({
    origin: [clientOrigin, 'http://localhost:51711', 'http://127.0.0.1:51711'],
  }),
);
app.use(express.json({ limit: '32kb' }));

// Демо XSS «до» — без CSP, иначе inline-скрипт PoC не выполнится
app.use('/demos', express.static(path.join(__dirname, '../../demos')));

// --- HTTP security headers + CSP (Helmet.js) для API и остальных маршрутов ---
const securityHeaders = helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'blob:'],
      connectSrc: ["'self'", clientOrigin],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      frameAncestors: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
});

app.use((req, res, next) => {
  if (req.path.startsWith('/demos')) {
    return next();
  }
  return securityHeaders(req, res, next);
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'DigiVault API (ЛР11, вариант 3) — security',
    endpoints: {
      products: '/api/products',
      reviews: '/api/reviews',
      demos: {
        xssBefore: '/demos/xss-before.html',
        xssAfter: '/demos/xss-after.html',
      },
    },
  });
});

app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

async function seedIfEmpty() {
  const count = await Product.countDocuments();
  if (count > 0) return;

  await Product.insertMany([
    {
      name: 'UI Kit Pro',
      price: 89,
      imageUrl: '/products/ui-kit-pro.png',
      description: 'Design system pack',
      category: 'UI KIT',
    },
    {
      name: 'Icon Bundle 240',
      price: 35,
      imageUrl: '/products/icon-bundle.png',
      description: 'Vector icon set',
      category: 'ICONS',
    },
    {
      name: 'Synthwave Presets',
      price: 55,
      imageUrl: '/products/synthwave.png',
      description: 'Audio preset pack',
      category: 'AUDIO',
    },
  ]);
  console.log('Seeded demo DigiVault products');
}

async function start() {
  try {
    await connectDB();
    await seedIfEmpty();
    app.listen(PORT, () => {
      console.log(`DigiVault secure API on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
