import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-full p-4 text-white bg-black">
      <h2 className="mb-6 text-xl font-bold">Admin Panel</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/admin/products" className="block p-2 rounded hover:bg-blue-700">
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
