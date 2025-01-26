import search from './icons8-search-50.png'
import user from './icons8-test-account-32.png'
import cart from './icons8-cart-50.png'
import p_img1 from './p_img1.png'
import p_img2_1 from './p_img2_1.png'
import p_img2_2 from './p_img2_2.png'
import p_img2_3 from './p_img2_3.png'
import p_img2_4 from './p_img2_4.png'
import p_img3 from './p_img3.png'
import p_img4 from './p_img4.png'
import p_img5 from './p_img5.png'
import p_img6 from './p_img6.png'
import p_img7 from './p_img7.png'
import p_img8 from './p_img8.png'
import p_img9 from './p_img9.png'
import p_img10 from './p_img10.png'
import p_img11 from './p_img11.png'
import p_img12 from './p_img12.png'



import logo from './logo.png'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'

export const assets = {
      search,
      user,
      cart,
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon
}

const products = [
  {
    _id: "1234567890",
    title: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    category: "Car",
    owner: "admin",
    pricePerDay: 100,
    location: "Peerumade",
    contact: 1234567890,
    image: [p_img1],
    date: 1716634345448
  },
  {
    _id: "2345678901",
    title: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    category: "Car",
    owner: "admin",
    pricePerDay: 200,
    location: "Peerumade",
    contact: 1234567890,
    image: [p_img2_1, p_img2_2, p_img2_3, p_img2_4],
    date: 1716621345448
  },
  {
    _id: "3456789012",
    title: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    category: "Kids",
    owner: "Electronics",
    pricePerDay: 220,
    location: "Peerumade",
    contact: 1234567890,
    image: [p_img3],
    date: 1716234545448
  },
  {
    _id: "4567890123",
    title: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    category: "Men",
    owner: "admin",
    pricePerDay: 110,
    location: "Peerumade",
    contact: 1234567890,
    image: [p_img4],
    date: 1716621345448
  },
  {
    _id: "5678901234",
    title: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    category: "Women",
    owner: "admin",
    pricePerDay: 130,
    location: "Peerumade",
    contact: 1234567890,
    image: [p_img5],
    date: 1716622345448
  },
  {
    _id: "6789012345",
    title: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    category: "Kids",
    owner: "admin",
    pricePerDay: 140,
    location: "Peerumade",
    contact: 1234567890,
    image: [p_img6],
    date: 1716623423448
  },
  {
    _id: "7890123456",
    title: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    category: "Men",
    owner: "admin",
    pricePerDay: 190,
    location: "Peerumade",
    contact: 1234567890,
    image: [p_img7],
    date: 1716621542448
  },
  {
    _id: "8901234567",
    title: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    category: "Men",
    owner: "admin",
    pricePerDay: 140,
    location: "Peerumade",
    contact: 1234567890,
    image: [p_img8],
    date: 1716622345448
  },
  {
    _id: "9012345678",
    title: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    category: "Kids",
    owner: "admin",
    pricePerDay: 100,
    location: "Peerumade",
    contact: 1234567890,
    image: [p_img9],
    date: 1716621235448
  },
  {
    _id: "0123456789",
    title: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    category: "Men",
    owner: "admin",
    pricePerDay: 110,
    location: "Peerumade",
    contact: 1234567890,
    image: [p_img10],
    date: 1716622235448
  },
  {
    _id: "0987654321",
    title: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    category: "Men",
    owner: "admin",
    pricePerDay: 120,
    location: "Peerumade",
    contact: 1234567890,
    image: [p_img11],
    date: 1716623345448
  },
  {
    _id: "9876543210",
    title: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    category: "Men",
    owner: "admin",
    pricePerDay: 150,
    location: "Peerumade",
    contact: 1234567890,
    image: [p_img12],
    date: 1716624445448
  }
];

export default products;
