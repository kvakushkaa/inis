import uiKitImage from '../assets/products/ui-kit-pro.png';
import iconBundleImage from '../assets/products/icon-bundle.png';
import synthwaveImage from '../assets/products/synthwave.png';

const products = [
  {
    id: 'ui-kit-pro',
    title: 'UI Kit Pro',
    description: 'Design system pack',
    category: 'UI KIT',
    price: 89,
    rating: 4.8,
    image: uiKitImage,
    accent: '#0F766E',
  },
  {
    id: 'icon-bundle',
    title: 'Icon Bundle 240',
    description: 'Vector icon set',
    category: 'ICONS',
    price: 35,
    rating: 4.6,
    image: iconBundleImage,
    accent: '#F59E0B',
  },
  {
    id: 'synthwave',
    title: 'Synthwave Presets',
    description: 'Audio preset pack',
    category: 'AUDIO',
    price: 55,
    rating: 4.9,
    image: synthwaveImage,
    accent: '#5B21B6',
  },
];

export default products;
