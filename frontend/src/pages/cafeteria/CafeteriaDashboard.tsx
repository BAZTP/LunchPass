import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { StatCard } from '../../components/StatCard';
import { Users, CheckCircle, Clock, XCircle, QrCode, RefreshCw, Award } from 'lucide-react';

export default function CafeteriaDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalExpected: 15,
    delivered: 8,
    pending: 7,
    cancelled: 0,
    deliveryPercentage: 53.3,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/reservations');
      const list = res.data || [];
      const total = list.length;
      const del = list.filter((r: any) => r.status === 'DELIVERED' || r.status === 'USED').length;
      const canc = list.filter((r: any) => r.status === 'CANCELLED').length;
      const pend = Math.max(0, total - del - canc);
      const pct = total > 0 ? Math.round((del / total) * 100) : 0;

      setStats({
        totalExpected: total,
        delivered: del,
        pending: pend,
        cancelled: canc,
        deliveryPercentage: pct,
      });
    } catch (err) {
      console.error('Error al cargar estadísticas de cafetería:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Cafetería & Comedor</h1>
          <p className="text-sm text-gray-500 mt-1">Supervisión en tiempo real de entregas de almuerzo y validación QR.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            title="Actualizar datos"
            className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-2xl border border-gray-200 transition-all"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => navigate('/cafeteria/scan')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3 rounded-2xl text-sm transition-all shadow-md shadow-blue-200 flex items-center gap-2"
          >
            <QrCode size={20} />
            <span>ABRIR ESCÁNER QR</span>
          </button>
        </div>
      </div>

      {/* Counters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Reservas Esperadas (Hoy)" value={String(stats.totalExpected)} icon={Users} />
        <StatCard title="Almuerzos Entregados" value={String(stats.delivered)} icon={CheckCircle} />
        <StatCard title="Pendientes por Retirar" value={String(stats.pending)} icon={Clock} />
        <StatCard title="Reservas Canceladas" value={String(stats.cancelled)} icon={XCircle} />
      </div>

      {/* Real-time Progress Bar */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Award size={20} className="text-blue-600" />
              <span>Avance de Servicio de Almuerzo</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Porcentaje de reservas entregadas a empleados el día de hoy.</p>
          </div>
          <span className="text-2xl font-black text-blue-600">{stats.deliveryPercentage}%</span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-5 overflow-hidden p-0.5 border border-gray-200/60">
          <div
            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-4 rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${stats.deliveryPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
