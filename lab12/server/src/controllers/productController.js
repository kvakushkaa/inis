const Product = require('../models/Product');

// GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
}

// GET /api/products/:id
async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    return res.status(200).json(product);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Некорректный ID товара' });
    }
    return res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
}

// POST /api/products
async function createProduct(req, res) {
  try {
    const { name, price, imageUrl, description, category } = req.body;

    if (!name || price === undefined || price === null || price === '') {
      return res.status(400).json({
        message: 'Поля name и price обязательны',
      });
    }

    const product = await Product.create({
      name,
      price,
      imageUrl,
      description,
      category,
    });

    return res.status(201).json(product);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
}

// PUT /api/products/:id
async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    return res.status(200).json(product);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Некорректный ID товара' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
}

// DELETE /api/products/:id
async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    return res.status(200).json({
      message: 'Товар удалён',
      product,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Некорректный ID товара' });
    }
    return res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
