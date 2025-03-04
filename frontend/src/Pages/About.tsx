import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bgCrochet from '../Images/bgCrochet.jpeg'
const About = () => {
  return (
    <div className="relative w-full min-h-screen bg-center bg-cover" 
    style={{ backgroundImage: `url(${bgCrochet})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50">
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold tracking-wide md:text-6xl"
        >
          Welcome to Our Crochet Haven
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-3xl mt-6 text-lg md:text-xl"
        >
          Every stitch tells a story, and every piece I create is made with love, warmth, and passion.
          My handmade crochet collection blends tradition with modern artistry, bringing comfort and beauty to every thread.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8"
        >
          <Link 
            to="/products" 
            className="px-6 py-3 text-lg font-semibold transition-all duration-300 transform bg-pink-500 rounded-lg shadow-lg hover:bg-pink-600 hover:scale-105"
          >
            Explore My Collection
          </Link>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
