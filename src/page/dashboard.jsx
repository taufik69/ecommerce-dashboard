import {
  CircleDollarSign,
  ShoppingCartIcon,
  TagIcon,
  UserRound,
  LayoutGrid,
  Package,
  ListOrdered,
  Plus,
  Trash2,
  ArrowUpRight,
  RefreshCw,
  TrendingUp,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategory } from "@/api/api";
import { getProducts } from "@/api/api";
import { getOrders, deleteOrder } from "@/api/api";

// ─── Tiny helpers ────────────────────────────────────────────────────────────

const statusColor = (s = "") => {
  const map = {
    pending: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    completed: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    shipped: "text-sky-400 bg-sky-400/10 border-sky-400/30",
    cancelled: "text-rose-400 bg-rose-400/10 border-rose-400/30",
  };
  return (
    map[s.toLowerCase()] ?? "text-slate-400 bg-slate-400/10 border-slate-400/30"
  );
};

// ─── Sub-components ──────────────────────────────────────────────────────────

const KPICard = ({ title, value, icon: Icon, accent, delta }) => (
  <div
    className="relative overflow-hidden rounded-2xl border p-6 flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-1"
    style={{
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      borderColor: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(12px)",
    }}
  >
    {/* glow blob */}
    <div
      className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"
      style={{ background: accent }}
    />
    <div className="flex items-start justify-between">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}
      >
        <Icon size={20} style={{ color: accent }} />
      </div>
      {delta !== undefined && (
        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
          <TrendingUp size={12} /> +{delta}%
        </span>
      )}
    </div>
    <div>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
      <p className="text-sm text-slate-400 mt-1 font-medium">{title}</p>
    </div>
  </div>
);

const SectionCard = ({ title, action, onAction, children }) => (
  <div
    className="rounded-2xl border flex flex-col overflow-hidden"
    style={{
      background: "rgba(255,255,255,0.03)",
      borderColor: "rgba(255,255,255,0.08)",
    }}
  >
    <div
      className="flex items-center justify-between px-6 py-4 border-b"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <h2 className="text-sm font-semibold text-white uppercase tracking-widest">
        {title}
      </h2>
      {action && (
        <button
          onClick={onAction}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          {action} <ChevronRight size={12} />
        </button>
      )}
    </div>
    <div className="flex-1">{children}</div>
  </div>
);

const Skeleton = ({ className }) => (
  <div
    className={`rounded animate-pulse ${className}`}
    style={{ background: "rgba(255,255,255,0.06)" }}
  />
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const Page = () => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const { data: catData, isLoading: catLoading } = getCategory();
  const { data: prodData, isLoading: prodLoading } = getProducts();
  const { data: orderData, isLoading: orderLoading } = getOrders();
  const deleteMutation = deleteOrder();

  const categories = catData?.data?.data ?? [];
  const products = prodData?.data?.data ?? [];
  const orders = orderData?.data?.data ?? [];

  const revenue = orders
    .filter((o) => (o.status ?? "").toLowerCase() === "completed")
    .reduce((sum, o) => sum + (parseFloat(o.totalAmount) || 0), 0);

  const kpiData = [
    {
      title: "Total Products",
      value: prodLoading ? "—" : products.length,
      icon: TagIcon,
      accent: "#a78bfa",
      delta: 12,
    },
    {
      title: "Total Orders",
      value: orderLoading ? "—" : orders.length,
      icon: ShoppingCartIcon,
      accent: "#38bdf8",
      delta: 8,
    },
    {
      title: "Categories",
      value: catLoading ? "—" : categories.length,
      icon: LayoutGrid,
      accent: "#fb923c",
    },
    {
      title: "Revenue",
      value: orderLoading ? "—" : `$${revenue.toLocaleString()}`,
      icon: CircleDollarSign,
      accent: "#34d399",
      delta: 23,
    },
  ];

  const handleDeleteOrder = async (invID) => {
    if (!window.confirm("Delete this order?")) return;
    setDeletingId(invID);
    await deleteMutation.mutateAsync(invID).finally(() => setDeletingId(null));
  };

  return (
    <div
      className="min-h-screen w-full text-white"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.15) 0%, transparent 60%), #09090b",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Google Fonts import via style */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 9999px; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .fade-up-1 { animation-delay: 0.05s; opacity:0; }
        .fade-up-2 { animation-delay: 0.12s; opacity:0; }
        .fade-up-3 { animation-delay: 0.20s; opacity:0; }
        .fade-up-4 { animation-delay: 0.28s; opacity:0; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ── Header ── */}
        <header className="mb-10 fade-up fade-up-1 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-medium">
              Overview
            </p>
            <h1
              className="text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-white border rounded-xl px-4 py-2.5 transition-all hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <RefreshCw size={13} /> Refresh
            </button>
            <button
              onClick={() => navigate("/add-product")}
              className="flex items-center gap-2 text-xs font-semibold text-black rounded-xl px-4 py-2.5 transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg,#a78bfa,#818cf8)" }}
            >
              <Plus size={13} /> New Product
            </button>
          </div>
        </header>

        {/* ── KPI Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8 fade-up fade-up-2">
          {kpiData.map((k) => (
            <KPICard key={k.title} {...k} />
          ))}
        </div>

        {/* ── Middle Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 fade-up fade-up-3">
          {/* Recent Orders — spans 2 cols */}
          <div className="lg:col-span-2">
            <SectionCard
              title="Recent Orders"
              action="View all"
              onAction={() => navigate("/order-list")}
            >
              {orderLoading ? (
                <div className="p-6 flex flex-col gap-3">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500 gap-2">
                  <AlertCircle size={28} />
                  <p className="text-sm">No orders yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr
                        className="text-left"
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {["Invoice", "Customer", "Status", "Amount", ""].map(
                          (h) => (
                            <th
                              key={h}
                              className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-widest"
                            >
                              {h}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 6).map((order, i) => (
                        <tr
                          key={order._id ?? i}
                          className="group hover:bg-white/[0.02] transition-colors"
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          <td className="px-6 py-3.5 text-slate-400 font-mono text-xs">
                            #{order.invoiceID ?? order._id?.slice(-6)}
                          </td>
                          <td className="px-6 py-3.5 font-medium text-white">
                            {order.customerName ?? order.user?.name ?? "—"}
                          </td>
                          <td className="px-6 py-3.5">
                            <span
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColor(order.status)}`}
                            >
                              {order.status ?? "Unknown"}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-white font-semibold">
                            $
                            {parseFloat(
                              order.totalAmount ?? 0,
                            ).toLocaleString()}
                          </td>
                          <td className="px-6 py-3.5">
                            <button
                              onClick={() =>
                                handleDeleteOrder(order.invoiceID ?? order._id)
                              }
                              disabled={
                                deletingId === (order.invoiceID ?? order._id)
                              }
                              className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-rose-400 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </SectionCard>
          </div>

          {/* Recent Products */}
          <SectionCard
            title="Products"
            action="Manage"
            onAction={() => navigate("/products")}
          >
            {prodLoading ? (
              <div className="p-6 flex flex-col gap-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500 gap-2">
                <Package size={28} />
                <p className="text-sm">No products yet</p>
              </div>
            ) : (
              <div
                className="flex flex-col divide-y"
                style={{ divideColor: "rgba(255,255,255,0.04)" }}
              >
                {products.slice(0, 5).map((prod, i) => (
                  <div
                    key={prod._id ?? i}
                    className="flex items-center gap-3 px-6 py-3.5 hover:bg-white/[0.02] transition-colors group"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      {prod.images?.[0] ? (
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={14} className="text-slate-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {prod.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        ${parseFloat(prod.price ?? 0).toLocaleString()}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-slate-700 group-hover:text-slate-400 transition-colors flex-shrink-0"
                    />
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        {/* ── Bottom Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 fade-up fade-up-4">
          {/* Categories */}
          <SectionCard
            title="Categories"
            action="Manage"
            onAction={() => navigate("/add-category")}
          >
            {catLoading ? (
              <div className="p-6 flex flex-col gap-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500 gap-2">
                <LayoutGrid size={24} />
                <p className="text-sm">No categories</p>
              </div>
            ) : (
              <div className="p-4 flex flex-wrap gap-2">
                {categories.map((cat, i) => (
                  <span
                    key={cat._id ?? i}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border text-slate-300 hover:text-white transition-colors cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(255,255,255,0.1)",
                    }}
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
          </SectionCard>

          {/* Quick Actions */}
          <div
            className="lg:col-span-2 rounded-2xl border p-6 flex flex-col justify-between gap-6"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">
                Quick Actions
              </p>
              <h3
                className="text-xl font-bold"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Jump right in
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  label: "Add Product",
                  icon: Plus,
                  route: "/add-product",
                  accent: "#a78bfa",
                },
                {
                  label: "Add Category",
                  icon: LayoutGrid,
                  route: "/add-category",
                  accent: "#fb923c",
                },
                {
                  label: "View Orders",
                  icon: ListOrdered,
                  route: "/order-list",
                  accent: "#38bdf8",
                },
              ].map(({ label, icon: Icon, route, accent }) => (
                <button
                  key={label}
                  onClick={() => navigate(route)}
                  className="flex items-center gap-3 rounded-xl p-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98] group border"
                  style={{
                    background: `${accent}0d`,
                    borderColor: `${accent}22`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${accent}22` }}
                  >
                    <Icon size={16} style={{ color: accent }} />
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: accent }}
                  >
                    {label}
                  </span>
                  <ChevronRight
                    size={14}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: accent }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
