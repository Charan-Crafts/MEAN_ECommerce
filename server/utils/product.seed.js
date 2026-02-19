const products = [
  {
    name: "iPhone 15 Pro",
    description: "Latest Apple smartphone with A17 Pro chip and titanium design.",
    price: 134900,
    brand: "Apple",
    category: "Electronics",
    stock: 15,
    images: [
      {
        url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
        public_id: "iphone15pro_1"
      }
    ],
    ratings: 4.8,
    numOfReviews: 120,
    isActive: true
  },
  {
    name: "Samsung Galaxy S24",
    description: "Powerful Android flagship phone with AI features.",
    price: 89999,
    brand: "Samsung",
    category: "Electronics",
    stock: 20,
    images: [
      {
        url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
        public_id: "s24_1"
      }
    ],
    ratings: 4.6,
    numOfReviews: 85,
    isActive: true
  },
  {
    name: "Nike Air Max Shoes",
    description: "Comfortable and stylish running shoes.",
    price: 5999,
    brand: "Nike",
    category: "Footwear",
    stock: 50,
    images: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        public_id: "nike_airmax_1"
      }
    ],
    ratings: 4.5,
    numOfReviews: 60,
    isActive: true
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise cancelling wireless headphones.",
    price: 29999,
    brand: "Sony",
    category: "Accessories",
    stock: 30,
    images: [
      {
        url: "https://images.unsplash.com/photo-1580894908361-967195033215",
        public_id: "sony_headphones_1"
      }
    ],
    ratings: 4.7,
    numOfReviews: 140,
    isActive: true
  },
  {
    name: "Wooden Office Chair",
    description: "Ergonomic wooden office chair for home and workspace.",
    price: 7499,
    brand: "UrbanWood",
    category: "Furniture",
    stock: 10,
    images: [
      {
        url: "https://images.unsplash.com/photo-1582582429416-1b3c10e3f90b",
        public_id: "office_chair_1"
      }
    ],
    ratings: 4.3,
    numOfReviews: 35,
    isActive: true
  }
];

module.exports = products;