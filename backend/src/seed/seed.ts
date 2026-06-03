import mongoose from 'mongoose';
import { ProductSchema } from '../products/schemas/product.schema';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const products = [
  {
    name: 'Red Rose Bouquet',
    slug: 'red-rose-bouquet',
    description: 'A stunning arrangement of deep red roses hand-tied to perfection.',
    price: 294,
    category: 'bouquets',
    imageUrl: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600',
    isFeatured: true,
    rating: 4.8,
    numReviews: 24,
    stock: 15,
  },
  {
    name: 'Sunflower Bouquet',
    slug: 'sunflower-bouquet',
    description: 'Bright and cheerful sunflowers to light up any room.',
    price: 189,
    category: 'bouquets',
    imageUrl: 'https://images.unsplash.com/photo-1504185945330-7a3ca1380535?w=600',
    isFeatured: true,
    rating: 4.5,
    numReviews: 12,
    stock: 20,
  },
  {
    name: 'Pink Peony Bouquet',
    slug: 'pink-peony-bouquet',
    description: 'Elegant and soft pink peonies, a symbol of beauty and grace.',
    price: 399,
    category: 'bouquets',
    imageUrl: 'https://images.unsplash.com/photo-1589994160839-163cd867cfe8?w=600',
    isFeatured: true,
    rating: 4.9,
    numReviews: 30,
    stock: 10,
  },
  {
    name: 'Tulip Bouquet',
    slug: 'tulip-bouquet',
    description: 'Vibrant spring tulips handpicked and curated beautifully.',
    price: 220,
    category: 'bouquets',
    imageUrl: 'https://images.unsplash.com/photo-1561328399-f94d2ce78679?w=600',
    isFeatured: false,
    rating: 4.4,
    numReviews: 8,
    stock: 12,
  },
  {
    name: 'White Rose Bouquet',
    slug: 'white-rose-bouquet',
    description: 'Pure and pristine white roses, representing innocence and truth.',
    price: 350,
    category: 'bouquets',
    imageUrl: 'https://images.unsplash.com/photo-1530745342977-18046bc7a38b?w=600',
    isFeatured: false,
    rating: 4.7,
    numReviews: 15,
    stock: 8,
  },
  {
    name: 'White Lily',
    slug: 'white-lily',
    description: 'A single elegant white lily stem with long-lasting freshness.',
    price: 45,
    category: 'single-flowers',
    imageUrl: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=600',
    isFeatured: false,
    rating: 4.2,
    numReviews: 6,
    stock: 50,
  },
  {
    name: 'Purple Lavender',
    slug: 'purple-lavender',
    description: 'A bundle of aromatic purple lavender, perfect for calming vibes.',
    price: 79,
    category: 'single-flowers',
    imageUrl: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=600',
    isFeatured: false,
    rating: 4.6,
    numReviews: 18,
    stock: 40,
  },
  {
    name: 'Blue Iris Single',
    slug: 'blue-iris-single',
    description: 'Stunning and unique single stem blue iris flower.',
    price: 65,
    category: 'single-flowers',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88df5691166a?w=600',
    isFeatured: false,
    rating: 4.3,
    numReviews: 9,
    stock: 25,
  },
  {
    name: 'Red Gerbera Single',
    slug: 'red-gerbera-single',
    description: 'A bright, happy single red gerbera daisy.',
    price: 55,
    category: 'single-flowers',
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600',
    isFeatured: false,
    rating: 4.5,
    numReviews: 11,
    stock: 35,
  },
  {
    name: 'Pink Carnation Single',
    slug: 'pink-carnation-single',
    description: 'A delicate single pink carnation stem.',
    price: 49,
    category: 'single-flowers',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88df5691166a?w=600',
    isFeatured: false,
    rating: 4.1,
    numReviews: 5,
    stock: 30,
  },
  {
    name: 'Rose Gift Box',
    slug: 'rose-gift-box',
    description: 'A luxury gift box filled with fresh roses, perfect for romance.',
    price: 280,
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600',
    isFeatured: true,
    rating: 4.8,
    numReviews: 22,
    stock: 14,
  },
  {
    name: 'Flower Hamper',
    slug: 'flower-hamper',
    description: 'A delightful gift hamper combining fresh blooms and select goodies.',
    price: 320,
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1487530811015-780780fc54c2?w=600',
    isFeatured: true,
    rating: 4.6,
    numReviews: 14,
    stock: 10,
  },
  {
    name: 'Luxury Flower Box',
    slug: 'luxury-flower-box',
    description: 'A statement box arrangement of our premium seasonal selections.',
    price: 450,
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1487530811015-780780fc54c2?w=600',
    isFeatured: false,
    rating: 4.9,
    numReviews: 19,
    stock: 5,
  },
  {
    name: 'Anniversary Flower Hamper',
    slug: 'anniversary-flower-hamper',
    description: 'Specially themed luxurious anniversary hamper filled with love.',
    price: 599,
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1487530811015-780780fc54c2?w=600',
    isFeatured: false,
    rating: 5.0,
    numReviews: 25,
    stock: 6,
  },
  {
    name: 'Birthday Bouquet Box',
    slug: 'birthday-bouquet-box',
    description: 'Bright and festive celebration box to say Happy Birthday.',
    price: 380,
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600',
    isFeatured: false,
    rating: 4.7,
    numReviews: 17,
    stock: 8,
  },
  {
    name: 'Rose Water Spray',
    slug: 'rose-water-spray',
    description: 'Organic, refreshing rose water spray for a dewy look.',
    price: 35,
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600',
    isFeatured: false,
    rating: 4.3,
    numReviews: 31,
    stock: 100,
  },
  {
    name: 'Gift Ribbon & Card',
    slug: 'gift-ribbon-card',
    description: 'Custom premium gift wrapping ribbon and a personalized greeting card.',
    price: 25,
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600',
    isFeatured: false,
    rating: 4.9,
    numReviews: 50,
    stock: 200,
  },
  {
    name: 'Flower Food Sachet',
    slug: 'flower-food-sachet',
    description: 'Nutritional sachet to extend the life and vibrancy of your fresh cut flowers.',
    price: 15,
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600',
    isFeatured: false,
    rating: 4.6,
    numReviews: 42,
    stock: 500,
  },
];

async function seed() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/roseandivydb';
  console.log('Connecting to MongoDB:', mongoUri);
  await mongoose.connect(mongoUri);

  const Product = mongoose.model('Product', ProductSchema);

  console.log('Clearing existing products...');
  await Product.deleteMany({});

  console.log('Seeding 18 products...');
  await Product.insertMany(products);

  console.log('Database seeded successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
