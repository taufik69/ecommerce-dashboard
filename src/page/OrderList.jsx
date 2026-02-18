import { deleteOrder, getOrders } from "@/api/api";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderList = () => {
  const { data, isPending, isError } = getOrders();
  const orderDeleteMutation = deleteOrder();

  const orders = data?.data?.data || [];

  const handleDelete = (invID) => {
    orderDeleteMutation.mutate(invID, {
      onSuccess: () => {
        toast.success("Order deleted");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Delete failed");
      },
    });
  };

  if (isPending)
    return <div className="p-6 text-center">Loading orders...</div>;
  if (isError)
    return (
      <div className="p-6 text-center text-red-500">Error loading orders</div>
    );

  return (
    <div className="w-full min-h-screen p-6">
      <div className="w-full rounded-2xl shadow-xl p-6 bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Orders
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage order list (view / delete).
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  #
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Customer
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Phone
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Address
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Note
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Payment
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Items
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                  >
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">{order.customer?.fullName}</td>
                    <td className="px-4 py-4">{order.customer?.phone}</td>
                    <td className="px-4 py-4">{order.customer?.address}</td>
                    <td className="px-4 py-4">{order.note || "—"}</td>
                    <td className="px-4 py-4">{order.paymentMethod}</td>
                    <td className="px-4 py-4">
                      {order.items?.map((item, i) => (
                        <div
                          key={i}
                          className="mb-1 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <span className="font-medium">{item.productId}</span>{" "}
                          - {item.qty} pcs, {item.color}, {item.size}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(order.invoiceId)}
                        className="px-3 py-2 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
      </div>
    </div>
  );
};

export default OrderList;
