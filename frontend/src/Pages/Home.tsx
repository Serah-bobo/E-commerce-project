import bgImage from '../Images/bgImage.jpg'
import bikiniTop from '../Images/bikiniTop.jpg'
import ruffleHat from '../Images/ruffleHat.jpg'
import shrug from '../Images/shrug.jpg'
import { Link } from 'react-router-dom'
import { FaInstagram,FaPhoneAlt,FaEnvelope } from 'react-icons/fa'
const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-[600px] text-white">
        {/* Background Image with Soft Overlay */}
        <div className="absolute inset-0">
          <img
            src={bgImage}
            alt="Handmade Crochet Fashion"
            className="object-cover w-full h-full brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-gray-900/20 to-transparent"></div>
        </div>
  
        
       {/* Content */}
  <div  className="relative z-10 w-full max-w-lg p-6 text-center rounded-lg shadow-lg bg-white/50 backdrop-blur-md">
  <h1 className="text-4xl font-bold tracking-wide text-gray-800 md:text-5xl">
    Handmade Crochet Fashion
  </h1>
  <p className="mt-4 text-lg font-medium text-gray-700 md:text-xl">
    Unique, stylish, and crafted with love.
  </p>
  <Link
    to='/products'
    className="inline-block px-6 py-3 mt-6 text-lg font-semibold text-white transition-all duration-300 transform shadow-xl bg-gradient-to-r from-pink-500 to-red-400 rounded-xl hover:scale-105 hover:shadow-2xl"
  >
    Shop Now
  </Link>
  </div>
   </section>
   {/* Featured Items Section */}
   <section className='py-12'>
    <h2 className='text-3xl font-bold text-center'>Featured Products</h2>
    <div className='grid grid-cols-1 gap-6 px-6 mt-8 md:grid-cols-3'>
      {[
        {id:1, image:shrug,name:"Shrug", price:"300ksh"},
        {id:2, image:ruffleHat,name:"Ruffle Hat", price:"600ksh"},
        {id:3, image:bikiniTop,name:"Bikini Top", price:"500ksh"}
      ].map(product => (
        <div key={product.id} className="p-4 bg-white rounded-lg shadow-md">
          <img src={product.image} alt={product.name} className="object-cover w-full h-64 rounded-md" />
          <h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
          <p className="mt-2 text-lg font-medium text-gray-600">{product.price}</p>
          <a href={`/product/${product.id}`} className="inline-block px-4 py-2 mt-3 text-white bg-pink-500 rounded-md hover:bg-pink-600">
          View More
        </a>
        
        </div>
      ))}
    </div>
   </section>
   {/*about us*/}
   <section className='px-6 py-12 text-center bg-white'>
    <h2 className='text-3xl font-bold'>About Us</h2>
    <p className='mt-6 text-lg font-medium text-gray-700'>
    Handmade Crochet Fashion is a unique, stylish, and crafted with love. I strive to create a unique and innovative fashion line that combines the art of crocheting with the comfort and style of handmade garments.
    </p>
    <Link
    to='/about'
    className="inline-block px-6 py-3 mt-6 text-lg font-semibold text-white transition-all duration-300 transform bg-pink-500 shadow-xl text hover:scale-105 hover:shadow-2xl"
    >
      Read More
    </Link>
   </section>
   {/* Call to Action */}
  <section className="px-6 py-12 text-center bg-white">
  
  <h2 className="text-3xl font-bold">Want a Custom Design?</h2>
  <p className="mt-2 text-black">Contact us for a personalized crochet piece!</p>

  {/* Contact Links */}
<div className="flex flex-col items-center gap-4 mt-6">
  {/* Email */}
  <a 
    href="mailto:ndunguserahwambui@gmail.com" 
    className="flex items-center gap-3 text-lg font-semibold text-black transition hover:text-pink-600"
  >
    <FaEnvelope className="text-2xl" />
    ndunguserahwambui@gmail.com
  </a>

  {/* Phone Number */}
  <a 
    href="tel:+254740968703" 
    className="flex items-center gap-3 text-lg font-semibold text-black transition hover:text-pink-600"
  >
    <FaPhoneAlt className="text-2xl" />
    +254 740 968 703
  </a>

  {/* Instagram */}
  <a 
    href="https://www.instagram.com/serah__bobo" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center gap-3 text-lg font-semibold text-black transition hover:text-pink-600"
  >
    <FaInstagram className="text-2xl" />
    Follow us on Instagram
  </a>
</div>

</section>

    </div>
  );
}

export default Home
