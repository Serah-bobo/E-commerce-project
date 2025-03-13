import {useDispatch, useSelector } from "react-redux"
import { clearCart,removeCart,updateCartQuantity } from "Reducer/CartReducer/CartSlice"
import { Link } from "react-router-dom"
import { RootState } from "Reducer/Store"
import { FaTrash } from "react-icons/fa"
//useSelector allows you to extract specific part of redux state,access redux store without passing props
//rootState is the type of store, state is whole redux store
//state.cart.items retrieves items array from cart slice
//cartProducts will hold list of items in shopping cart
//reduce reduces an array to single value
const Cart = () => {
    const cartProducts = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const totalPrice = cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="flex flex-col h-full mt-2 overflow-hidden bg-white shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
                <button
                    onClick={() => dispatch(clearCart())}
                    className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                >
                    Clear Cart
                </button>
            </div>

            <div className="flex-1 px-6 py-4 overflow-y-auto">
                {cartProducts.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {cartProducts.map((product) => (
                            <li key={product.id} className="flex py-4 space-x-4 border-b">
                                <img
                                    src={`http://localhost:5000${product.image}`}
                                    alt={product.name}
                                    className="w-24 h-24 border rounded-md"
                                />
                                <div className="flex-1">
                                    <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
                                    <p className="mt-1 text-sm text-gray-500">Price: ${product.price.toFixed(2)}</p>
                                    <button
                                        onClick={() => dispatch(removeCart(product.id))}
                                        className="flex items-center mt-2 text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash className="mr-1" /> Remove
                                    </button>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => dispatch(updateCartQuantity({ id: product.id, amount: -1 }))}
                                        className="px-2 py-1 text-white bg-gray-400 rounded hover:bg-gray-500"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 py-1 text-sm font-semibold border">{product.quantity}</span>
                                    <button
                                        onClick={() => dispatch(updateCartQuantity({ id: product.id, amount: 1 }))}
                                        className="px-2 py-1 text-white bg-gray-600 rounded hover:bg-gray-700"
                                    >
                                        +
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No products in your cart.</p>
                )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold">
                    <p>Subtotal</p>
                    <p>${totalPrice.toFixed(2)}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-4">
                    <Link
                        to="/checkout"
                        className="flex items-center justify-center w-full px-4 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
                <div className="flex justify-center mt-4 text-sm text-center text-gray-500">
                    <Link to="/products" className="text-indigo-600 hover:text-indigo-500">
                        Continue Shopping →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;