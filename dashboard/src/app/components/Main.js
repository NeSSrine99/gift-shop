"use client";

import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#a855f7", "#3b82f6", "#10b981", "#f97316"];

export default function DashboardHome() {
  const salesData = [
    { name: "Mon", sales: 400 },
    { name: "Tue", sales: 300 },
    { name: "Wed", sales: 500 },
    { name: "Thu", sales: 200 },
    { name: "Fri", sales: 600 },
    { name: "Sat", sales: 100 },
    { name: "Sun", sales: 350 },
  ];

  const pieData = [
    { name: "Sales", value: 2390 },
    { name: "Orders", value: 128 },
    { name: "Products", value: 42 },
    { name: "Clients", value: 31 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Sales"
          value="$2,390"
          icon={<DollarSign className="text-green-600" />}
        />
        <StatCard
          title="Orders"
          value="128"
          icon={<ShoppingCart className="text-blue-600" />}
        />
        <StatCard
          title="Products"
          value="42"
          icon={<Package className="text-purple-600" />}
        />
        <StatCard
          title="Clients"
          value="31"
          icon={<Users className="text-orange-600" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Sales Bar Chart */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-medium mb-4">Weekly Sales</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-medium mb-4">Stats Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={4}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-medium mb-2">Latest Notifications</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>🛍️ New order placed</li>
          <li>🎁 Low stock: Mini Gift Box</li>
          <li>💬 New message received</li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center gap-4">
      <div className="bg-gray-100 p-2 rounded">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
