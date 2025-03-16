import { LoaderFunctionArgs } from "react-router-dom";
import { Link, useLocation, useLoaderData } from "react-router-dom";
import { GetProductById } from "Reducer/ProductReducer/ProductApi";
import { addToCart } from "Reducer/CartReducer/CartSlice";
import { useDispatch } from "react-redux";
export async function loader({ params }: LoaderFunctionArgs) {
    if (!params.id) {
        throw new Error("Product ID is required");
    }

    try {
        const product = await GetProductById(params.id);
        console.log("Fetched Product:", product);
        return product;
    } catch (error) {
        console.error("Error in loader:", error);
        throw new Response("Product not found", { status: 404 });
    }
}

const ProductDetails = () => {
    const location = useLocation();
    const data = useLoaderData();
    const product = data?.product;
    const dispatch=useDispatch()

    if (!product) {
        return <p className="text-lg text-center text-gray-500">Loading product details...</p>;
    }

    const search = location.state?.search || "";
    const category = location.state?.category || "all";

    //handle cart
    const handleAddToCart = (product:any) => {
        dispatch(
          addToCart({
            id: product._id, 
            name: product.name,
            price: product.price,
            image: product.image
          })
        );
      };
    
    

    return (
        <div className="relative min-h-screen p-6 bg-gradient-to-br from-blue-50 to-gray-100">
            {/* Back Button */}
            <Link
                to={`..${search}`}
                relative="path"
                className="absolute px-3 py-2 text-sm font-medium text-black transition top-6 left-2 "
            >
                &larr; Back to {category} Products
            </Link>

            {/* Product Container */}
            <div className="max-w-lg mx-auto overflow-hidden bg-cover rounded-lg shadow-lg">
                {/* Full-Width Product Image */}
                <div className="w-full p-2 transition-all duration-200 bg-cover rounded-md hover:scale-105">
                    <img
                        alt={product.name}
                        src={`http://localhost:5000${product.image}`}
                        className="w-full p-2 transition-all duration-200 bg-cover rounded-md hover:scale-105"
                    />
                </div>

                {/* Product Details */}
                <div className="p-6 text-center">
                   

                    {/* Product Name */}
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{product.name}</h2>

                    {/* Description */}
                    <p className="mt-4 text-2xl font-semibold text-black md:text-3l">{product.description}</p>

                    {/* Price */}
                    <p className="mt-4 text-2xl font-semibold text-black md:text-3xl">${product.price}</p>
                     
                    <button
                            onClick={() => handleAddToCart(product)}
                             className="px-10 py-2 mt-4 text-sm font-semibold text-center text-white bg-orange-400 rounded-md hover:bg-orange-500 min-w-[100px]"
                            >
                        
                              <span>Add to cart</span>  
                            </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
