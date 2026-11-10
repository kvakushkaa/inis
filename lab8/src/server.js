require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const Product = require('./models/Product');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5008;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'DigiVault API (ЛР8, вариант 3)',
    endpoints: {
      products: '/api/products',
    },
  });
});

app.use('/api/products', productRoutes);

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
      console.log(`DigiVault API listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
