const mongoose = require('mongoose');

/**
 * Товар цифрового магазина DigiVault (вариант 3).
 * Обязательные поля по заданию: name, price, imageUrl.
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Название товара обязательно'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Цена товара обязательна'],
      min: [0, 'Цена не может быть отрицательной'],
    },
    imageUrl: {
      type: String,
      default: '',
      trim: true,
    },
    // дополнительные поля DigiVault (опционально)
    description: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Product', productSchema);
