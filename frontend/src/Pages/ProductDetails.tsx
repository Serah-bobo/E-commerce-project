import { LoaderFunctionArgs } from "react-router-dom";
import { Link, useLocation, useLoaderData } from "react-router-dom";
import { GetProductById } from "Reducer/ProductReducer/ProductApi";

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

    if (!product) {
        return <p className="text-lg text-center text-gray-500">Loading product details...</p>;
    }

    const search = location.state?.search || "";
    const category = location.state?.category || "all";
    console.log("Image Path:", `http://localhost:5000${product.image}`);

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
            <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
                {/* Full-Width Product Image */}
                <div className="w-full h-[60vh]">
                    <img
                        alt={product.name}
                        src={`http://localhost:5000${product.image}`}
                        className="object-cover w-full h-40"
                    />
                </div>

                {/* Product Details */}
                <div className="p-6 text-center">
                    {/* Category */}
                    <span className="inline-block px-4 py-1 mb-3 text-sm font-medium text-blue-700 bg-blue-100 rounded-md">
                        {product.category}
                    </span>

                    {/* Product Name */}
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{product.name}</h2>

                    {/* Description */}
                    <p className="mt-4 text-lg text-gray-600 md:text-xl">{product.description}</p>

                    {/* Price */}
                    <p className="mt-6 text-2xl font-semibold text-blue-700">${product.price}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
