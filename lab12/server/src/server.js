require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connectDB } = require('./config/db');
const Product = require('./models/Product');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 5012;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://127.0.0.1:51712';

app.use(
  cors({
    origin: [clientOrigin, 'http://localhost:51712', 'http://127.0.0.1:51712'],
  }),
);
app.use(express.json({ limit: '32kb' }));

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'DigiVault API (ЛР12, вариант 3) — analytics',
    endpoints: {
      products: '/api/products',
      reviews: '/api/reviews',
      analyticsSummary: '/api/analytics/summary',
    },
  });
});

app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

const SEED_PRODUCTS = [
  { name: 'UI Kit Pro', price: 89, imageUrl: '/products/ui-kit-pro.png', description: 'Design system pack', category: 'UI KIT' },
  { name: 'UI Kit Lite', price: 49, imageUrl: '/products/ui-kit-lite.png', description: 'Starter UI pack', category: 'UI KIT' },
  { name: 'Dashboard UI', price: 120, imageUrl: '/products/dashboard-ui.png', description: 'Admin templates', category: 'UI KIT' },
  { name: 'Icon Bundle 240', price: 35, imageUrl: '/products/icon-bundle.png', description: 'Vector icon set', category: 'ICONS' },
  { name: 'Icon Mega Pack', price: 55, imageUrl: '/products/icon-mega.png', description: '1200 icons', category: 'ICONS' },
  { name: 'Synthwave Presets', price: 55, imageUrl: '/products/synthwave.png', description: 'Audio preset pack', category: 'AUDIO' },
  { name: 'Lo-Fi Beats Kit', price: 40, imageUrl: '/products/lofi.png', description: 'Sample pack', category: 'AUDIO' },
  { name: 'Cinema SFX', price: 75, imageUrl: '/products/cinema-sfx.png', description: 'Sound effects', category: 'AUDIO' },
  { name: 'Motion Pack XL', price: 99, imageUrl: '/products/motion.png', description: 'After Effects templates', category: 'MOTION' },
  { name: 'Logo Reveal Pack', price: 65, imageUrl: '/products/logo-reveal.png', description: 'Motion logos', category: 'MOTION' },
  { name: '3D Mockup Studio', price: 110, imageUrl: '/products/mockups.png', description: 'Device mockups', category: 'MOCKUPS' },
  { name: 'Packaging Mockups', price: 80, imageUrl: '/products/packaging.png', description: 'Box mockups', category: 'MOCKUPS' },
];

async function seedIfEmpty() {
  const count = await Product.countDocuments();
  if (count >= SEED_PRODUCTS.length) return;

  await Product.deleteMany({});
  await Product.insertMany(SEED_PRODUCTS);
  console.log(`Seeded ${SEED_PRODUCTS.length} DigiVault products for analytics`);
}

async function start() {
  try {
    await connectDB();
    await seedIfEmpty();
    app.listen(PORT, () => {
      console.log(`DigiVault analytics API on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
