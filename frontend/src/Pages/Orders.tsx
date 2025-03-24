import { useFetchUserOrders,useDeleteOrder } from "Reducer/OrderReducer/OrderService";
import { useState } from "react";
import { FaTrash,FaDolly } from "react-icons/fa";
import { Link } from "react-router-dom";
  
  
const OrdersPage = () => {
    const { data: orders = [] } = useFetchUserOrders();
    const deleteOrderMutation = useDeleteOrder();
    const [deleting, setDeleting] = useState<string | null>(null);

    
    const handleDelete = (_id: string, status?: string) => {
        if (!status || status !== "Pending") {
          alert("You can only delete orders that are pending.");
          return;
        }
        setDeleting(_id);
        deleteOrderMutation.mutate(_id, {
          onSuccess: () => {
            setDeleting(null);
            alert("Order deleted successfully.");
          },
          onError: () => {
            setDeleting(null);
            alert("Failed to delete order.");
          },
        });
      };

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">My Orders</h1>
            {orders?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full">
                    <FaDolly className="w-16 h-16 text-gray-600" />
                </div>

                <p className="mt-2 font-semibold text-black ">Your have placed no orders yet!</p>
                <p className="px-4 mt-2 text-black ">All your orders will be saved here for you to access their state anytime</p>
                <Link
                    to="/products"
                    className="px-2 py-2 mt-4 text-white bg-orange-400 rounded-md hover:bg-orange-500"
                >
                    Continue Shopping
                </Link>
                
            </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="px-4 py-2">Order ID</th>
                                <th className="px-4 py-2">Items</th>
                                <th className="px-4 py-2">Total</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map(order => (
                                <tr key={order._id} className="border-b">
                                    <td className="px-4 py-2">{order._id}</td>
                                    <td className="px-4 py-2">{order.name} </td>
                                    <td className="px-4 py-2">${order.products.length}</td>
                                    <td className="px-4 py-2">{order.phone}</td>
                                    <td className="px-4 py-2">{order.address}</td>
                                     <td className="px-4 py-2">{order.status || "N/A"}</td>

                                    <td className="px-4 py-2">
                                        {order.status === "Pending" && (
                                            <button
                                                onClick={() => handleDelete(order._id!, order.status!)}
                                                disabled={deleting === order._id}
                                                className="px-10 py-2 mt-4 text-sm font-semibold text-center text-white bg-orange-400 rounded-md hover:bg-orange-500 min-w-[100px]"
                                            >
                                                {deleting === order._id ? "Deleting..." : <FaTrash />}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
