import { FetchAllProducts } from "Reducer/ProductReducer/ProductApi";
import { Link, useSearchParams, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

// Loader function
export const loader = async () => {
    const fetchedData = await FetchAllProducts("");
    console.log("Fetched Products:", fetchedData);
    return { products: fetchedData?.products || [] };
};

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const productLoader = useLoaderData();
    const categoryFilter = searchParams.get("category");

    const handleFilterChange = (key: string, value: string | null) => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            value === null ? newParams.delete(key) : newParams.set(key, value);
            return newParams;
        });
    };

    const renderProducts = (products: any[]) => {
        if (!Array.isArray(products) || products.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center mt-10 text-gray-500">
                    <svg className="w-12 h-12 mb-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 4v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6m16 0l-4-4m-4 4l-4-4"></path>
                    </svg>
                    <h2 className="text-lg">No products available</h2>
                </div>
            );
        }

        const displayedProducts = categoryFilter
            ? products.filter(product => product.category.trim() === categoryFilter)
            : products;

        return (
            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {displayedProducts.map(product => (
                    <div 
                        key={product._id} 
                        className="p-4 transition-all duration-300 border rounded-lg shadow-md hover:shadow-lg hover:scale-105"
                    >
                        <Link to={`/products/${product._id}`} 
                            state={{ search: `?${searchParams.toString()}`, type: categoryFilter }}>
                            <img 
                                alt={product.name} 
                                src={`http://localhost:5000${product.image}`} 
                                className="object-cover w-full h-40 rounded-md"
                            />
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-600">${product.price}</p>
                                <span className="inline-block px-3 py-1 mt-2 text-sm bg-gray-200 rounded-full">{product.category}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-6xl p-6 mx-auto">
            <h1 className="text-2xl font-bold text-center">Explore Our Products</h1>
            
            <div className="flex justify-center gap-4 mt-6">
                {["Hats", "Tops", "Shrugs"].map(category => (
                    <button 
                        key={category}
                        onClick={() => handleFilterChange("category", category)}
                        className={`px-5 py-2 rounded-md text-white transition-all duration-300 ${
                            categoryFilter === category 
                                ? "bg-blue-600 shadow-md" 
                                : "bg-gray-500 hover:bg-gray-700"
                        }`}
                    >
                        {category}
                    </button>
                ))}
                {categoryFilter && (
                    <button 
                        onClick={() => handleFilterChange("category", null)}
                        className="px-5 py-2 text-white transition-all duration-300 bg-red-500 rounded-md hover:bg-red-700"
                    >
                        Clear Filter
                    </button>
                )}
            </div>

            <Suspense fallback={
                <div className="flex items-center justify-center mt-6">
                    <svg className="w-10 h-10 text-gray-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <h2 className="ml-3 text-gray-500">Loading products...</h2>
                </div>
            }>
                <Await resolve={productLoader.products}>
                    {renderProducts}
                </Await>
            </Suspense>
        </div>
    );
};

export default Products;
