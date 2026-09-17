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
    stock: 2,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Тормозной диск Brembo Serie Oro",
    price: 12500,
    category: "Тормозная система",
    rating: 4.9,
    stock: 15,
    image: "https://images.unsplash.com/photo-1600705722908-bab1e6191b79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Спортивный амортизатор Öhlins TTX",
    price: 85000,
    category: "Подвеска",
    rating: 4.8,
    stock: 0,
    image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Выхлопная система Akrapovič Racing",
    price: 115000,
    category: "Выхлопная система",
    rating: 5.0,
    stock: 4,
    image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Комплект моторезины Michelin Road 6",
    price: 34900,
    category: "Шины",
    rating: 4.9,
    stock: 8,
    image: "https://images.unsplash.com/photo-1590634629471-125026909405?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Кожаные перчатки Alpinestars SP-8",
    price: 9500,
    category: "Экипировка",
    rating: 4.7,
    stock: 12,
    image: "https://images.unsplash.com/photo-1518776852331-50e413000b20?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Свеча зажигания NGK Iridium IX",
    price: 1200,
    category: "Двигатель",
    rating: 4.9,
    stock: 50,
    image: "https://images.unsplash.com/photo-1600705722908-bab1e6191b79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Блок цилиндров в сборе",
    price: 145000,
    category: "Двигатель",
    rating: 4.6,
    stock: 1,
    image: "https://images.unsplash.com/photo-1558981420-87aa9dad1c89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
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
