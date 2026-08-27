import React from 'react';
import { StatCard } from '../../components/StatCard';
import { Users, CalendarDays, CheckCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const data = [
    { name: 'Lun', reservas: 120 },
    { name: 'Mar', reservas: 150 },
    { name: 'Mié', reservas: 140 },
    { name: 'Jue', reservas: 160 },
    { name: 'Vie', reservas: 110 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Administrador</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Empleados" value="342" icon={Users} trend="+12 este mes" trendUp />
        <StatCard title="Reservas (Semana)" value="680" icon={CalendarDays} trend="+5%" trendUp />
        <StatCard title="Tasa de Entrega" value="94%" icon={CheckCircle} />
        <StatCard title="Menú más popular" value="Pollo Asado" icon={TrendingUp} />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96">
        <h2 className="text-lg font-bold mb-4">Reservas por Día (Semana Actual)</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="reservas" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
