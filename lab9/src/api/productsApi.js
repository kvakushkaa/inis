import fallbackProducts from '../data/products';

const API_URL = import.meta.env.VITE_API_URL || '/api/products';

/**
 * Загрузка каталога из REST API ЛР8.
 * При ошибке сети — локальный fallback (для офлайн-демо).
 */
export async function fetchProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return data.map((item) => ({
      id: item._id || item.id,
      title: item.name || item.title,
      description: item.description || '',
      category: item.category || 'DIGITAL',
      price: Number(item.price),
      rating: Number(item.rating ?? 4.8),
      image: item.imageUrl || item.image || '',
      accent: item.accent || '#0F766E',
    }));
  } catch (error) {
    console.warn('API unavailable, using local products:', error.message);
    return fallbackProducts;
  }
}
