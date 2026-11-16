const Product = require('../models/Product');

/**
 * GET /api/analytics/summary
 * Агрегация MongoDB: средняя цена товаров по категориям (вариант 3, Line Chart).
 */
async function getAnalyticsSummary(req, res) {
  try {
    const rows = await Product.aggregate([
      {
        $match: {
          category: { $exists: true, $nin: [null, ''] },
          price: { $type: 'number' },
        },
      },
      {
        $group: {
          _id: '$category',
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          productCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          category: '$_id',
          avgPrice: { $round: ['$avgPrice', 2] },
          minPrice: 1,
          maxPrice: 1,
          productCount: 1,
        },
      },
    ]);

    return res.status(200).json({
      title: 'Средняя цена товаров DigiVault по категориям',
      chartType: 'line',
      categories: rows.map((row) => row.category),
      avgPrices: rows.map((row) => row.avgPrice),
      series: rows,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка аналитики', error: error.message });
  }
}

module.exports = { getAnalyticsSummary };
