require('dotenv').config();

const { connectDB, disconnectDB } = require('./config/db');
const Product = require('./models/Product');

const seedProducts = [
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
];

async function seed() {
  try {
    await connectDB();
    await Product.deleteMany({});
    const created = await Product.insertMany(seedProducts);
    console.log(`Seeded ${created.length} products`);
    created.forEach((p) => console.log(`- ${p.name} (${p._id})`));
  } catch (error) {
    console.error(error);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
}

seed();
