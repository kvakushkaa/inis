const express = require('express');
const {
  getReviews,
  createReview,
  createVulnerableReview,
} = require('../controllers/reviewController');

const router = express.Router();

router.route('/').get(getReviews).post(createReview);

// Демо XSS «до защиты» (не использовать в production)
router.post('/vulnerable', createVulnerableReview);

module.exports = router;
