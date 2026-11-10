const products = [
  {
    id: 'ui-kit-pro',
    title: 'UI Kit Pro',
    description: 'Design system pack',
    fullDescription:
      'Полный набор UI-компонентов, токенов и макетов для быстрой сборки цифровых продуктов.',
    category: 'UI KIT',
    price: 89,
    rating: 4.8,
    inStock: true,
    image: '/products/ui-kit-pro.png',
    accent: '#0F766E',
  },
  {
    id: 'icon-bundle',
    title: 'Icon Bundle 240',
    description: 'Vector icon set',
    fullDescription:
      '240 векторных иконок в едином стиле: outline и filled варианты для веб и мобильных интерфейсов.',
    category: 'ICONS',
    price: 35,
    rating: 4.6,
    inStock: true,
    image: '/products/icon-bundle.png',
    accent: '#F59E0B',
  },
  {
    id: 'synthwave',
    title: 'Synthwave Presets',
    description: 'Audio preset pack',
    fullDescription:
      'Набор synthwave-пресетов для DAW: басы, пэды, лиды и готовые цепочки эффектов.',
    category: 'AUDIO',
    price: 55,
    rating: 4.9,
    inStock: true,
    image: '/products/synthwave.png',
    accent: '#5B21B6',
  },
];

export function getAllProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((product) => product.id === id) || null;
}

export default products;
