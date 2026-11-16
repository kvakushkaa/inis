const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: [true, 'productId обязателен'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Автор обязателен'],
      trim: true,
      maxlength: 80,
    },
    text: {
      type: String,
      required: [true, 'Текст отзыва обязателен'],
      trim: true,
      maxlength: 2000,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Review', reviewSchema);
