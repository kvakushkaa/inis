const Review = require('../models/Review');
const { sanitizeReviewText } = require('../utils/sanitize');

// GET /api/reviews?productId=
async function getReviews(req, res) {
  try {
    const filter = {};
    if (req.query.productId) {
      filter.productId = String(req.query.productId);
    }

    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
}

// POST /api/reviews — безопасный путь (sanitization)
async function createReview(req, res) {
  try {
    const { productId, author, text } = req.body;

    if (!productId || !author || text === undefined || text === null || text === '') {
      return res.status(400).json({
        message: 'Поля productId, author и text обязательны',
      });
    }

    const cleanAuthor = sanitizeReviewText(author);
    const cleanText = sanitizeReviewText(text);

    if (!cleanAuthor || !cleanText) {
      return res.status(400).json({
        message: 'После очистки данные отзыва пусты (удалены опасные теги)',
      });
    }

    const review = await Review.create({
      productId: String(productId),
      author: cleanAuthor,
      text: cleanText,
    });

    return res.status(201).json(review);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
}

/**
 * POST /api/vulnerable/reviews
 * Намеренно уязвимый эндпоинт ТОЛЬКО для демонстрации XSS «до защиты» (ЛР11).
 * Не использует sanitization — не включать в прод.
 */
async function createVulnerableReview(req, res) {
  try {
    const { productId, author, text } = req.body;

    if (!productId || !author || !text) {
      return res.status(400).json({ message: 'Поля productId, author и text обязательны' });
    }

    const review = await Review.create({
      productId: String(productId),
      author: String(author),
      text: String(text),
    });

    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
}

module.exports = {
  getReviews,
  createReview,
  createVulnerableReview,
};
