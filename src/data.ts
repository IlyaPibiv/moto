export const CATEGORIES = [
  "Все",
  "Двигатель",
  "Тормозная система",
  "Экипировка",
  "Выхлопная система",
  "Подвеска",
  "Шины"
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Спортивный шлем Shoei X-Spirit III",
    price: 65000,
    category: "Экипировка",
    rating: 5.0,
    image: "/images/product-1.jpg"
  },
  {
    id: 2,
    name: "Тормозной диск Brembo Serie Oro",
    price: 12500,
    category: "Тормозная система",
    rating: 4.9,
    image: "/images/product-2.jpg"
  },
  {
    id: 3,
    name: "Спортивный амортизатор Öhlins TTX",
    price: 85000,
    category: "Подвеска",
    rating: 4.8,
    image: "/images/product-3.jpg"
  },
  {
    id: 4,
    name: "Выхлопная система Akrapovič Racing",
    price: 115000,
    category: "Выхлопная система",
    rating: 5.0,
    image: "/images/product-4.jpg"
  },
  {
    id: 5,
    name: "Комплект моторезины Michelin Road 6",
    price: 34900,
    category: "Шины",
    rating: 4.9,
    image: "/images/product-5.jpg"
  },
  {
    id: 6,
    name: "Кожаные перчатки Alpinestars SP-8",
    price: 9500,
    category: "Экипировка",
    rating: 4.7,
    image: "/images/product-6.jpg"
  },
  {
    id: 7,
    name: "Свеча зажигания NGK Iridium IX",
    price: 1200,
    category: "Двигатель",
    rating: 4.9,
    image: "/images/product-7.jpg"
  },
  {
    id: 8,
    name: "Блок цилиндров в сборе",
    price: 145000,
    category: "Двигатель",
    rating: 4.6,
    image: "/images/product-8.jpg"
  }
];

export const BRANDS_DATA = [
  { name: "Shoei", logo: "https://www.google.com/s2/favicons?domain=shoei.com&sz=128" },
  { name: "Brembo", logo: "https://www.google.com/s2/favicons?domain=brembo.com&sz=128" },
  { name: "Öhlins", logo: "https://www.google.com/s2/favicons?domain=ohlins.com&sz=128" },
  { name: "Akrapovič", logo: "https://www.google.com/s2/favicons?domain=akrapovic.com&sz=128" },
  { name: "Michelin", logo: "https://www.google.com/s2/favicons?domain=michelin.com&sz=128" },
  { name: "Alpinestars", logo: "https://www.google.com/s2/favicons?domain=alpinestars.com&sz=128" },
  { name: "NGK", logo: "https://www.google.com/s2/favicons?domain=ngkntk.com&sz=128" },
  { name: "Motul", logo: "https://www.google.com/s2/favicons?domain=motul.com&sz=128" }
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price);
}
