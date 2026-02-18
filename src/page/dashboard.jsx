import { CircleDollarSign, ShoppingCartIcon, TagIcon, UserRound } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const navigate = useNavigate();
  // Dummy data for now
  const kpiData = [
    {
      title: "Total Products",
      value: 120,
      icon: <TagIcon className="w-6 h-6 text-white" />,
    },
    {
      title: "Total Orders",
      value: 350,
      icon: <ShoppingCartIcon className="w-6 h-6 text-white" />,
    },
    {
      title: "Total Users",
      value: 900,
      icon: <UserRound className="w-6 h-6 text-white" />,
    },
    {
      title: "Revenue",
      value: "$12,450",
      icon: <CircleDollarSign className="w-6 h-6 text-white" />,
    },
  ];

  const recentOrders = [
    {
      id: 101,
      customer: "Alice",
      status: "Pending",
      amount: "$120",
      date: "2026-02-17",
    },
    {
      id: 102,
      customer: "Bob",
      status: "Completed",
      amount: "$340",
      date: "2026-02-16",
    },
    {
      id: 103,
      customer: "Charlie",
      status: "Shipped",
      amount: "$90",
      date: "2026-02-16",
    },
  ];

  const recentProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      image: "https://via.placeholder.com/80",
    },
    { id: 2, name: "Smart Watch", image: "https://via.placeholder.com/80" },
    { id: 3, name: "Gaming Mouse", image: "https://via.placeholder.com/80" },
  ];

  return (
    <div className="w-full min-h-screen p-6 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpiData.map((kpi) => (
          <div
            key={kpi.title}
            className="bg-black dark:bg-gray-800 text-white rounded-lg p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-sm">{kpi.title}</p>
              <p className="text-2xl font-bold mt-1">{kpi.value}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-full">{kpi.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders & Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.customer}</td>
                    <td className="px-4 py-2">{order.status}</td>
                    <td className="px-4 py-2">{order.amount}</td>
                    <td className="px-4 py-2">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
          <div className="flex flex-col gap-4">
            {recentProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center gap-4 bg-gray-100 dark:bg-gray-700 p-3 rounded"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <p className="font-medium">{prod.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {["Add Product", "Add Category", "View Orders"].map(
          (action) => (
            <button
              key={action}
              onClick={()=> action === "Add Product"? navigate("/add-product") : action === "Add Category"? navigate("/add-category") : navigate("/order-list")}
              className="bg-black dark:bg-gray-800 text-white dark:text-white rounded-lg py-4 px-2 font-semibold hover:bg-gray-800 dark:hover:bg-gray-700 transition"
            >
              {action}
            </button>
          ),
        )}
      </div>
    </div>
  );
};;

export default Page;
