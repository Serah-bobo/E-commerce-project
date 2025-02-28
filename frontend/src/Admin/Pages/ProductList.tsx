import { FetchAllProducts } from "Reducer/ProductReducer/ProductApi";
import { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [sort, setSort] = useState<string>("latest");
  const [filter, setFilter] = useState<string>("all");

  const id = "all"; // Can be "all" or specific category IDs

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await FetchAllProducts(id, page, limit, sort, filter);
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [id, page, limit, sort, filter]);

  return (
    <div className="p-6">
      <h2 className="mb-6 text-3xl font-bold">Admin Dashboard</h2>

      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-1/3 p-2 border rounded-md"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 p-4 bg-gray-200 rounded-md animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="p-4 border rounded-md shadow-md">
                <img 
  src={`http://localhost:5000${product.image}`} 
  alt={product.name} 
  className="object-cover w-full h-40 rounded-md" 
/>

                <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="mt-2 text-lg font-bold">${product.price}</p>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center">No products found.</p>
          )}
        </div>
      )}
   


      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="p-2 text-white bg-gray-500 rounded-md">
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)} className="p-2 text-white bg-gray-500 rounded-md">
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
