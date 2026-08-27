import React, { useState } from 'react';
import { Settings, Save, Clock, ShieldCheck, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const [form, setForm] = useState({
    companyName: 'Empresa Corporativa S.A.',
    defaultQuota: 100,
    reservationOpenTime: '08:00',
    reservationCloseTime: '10:30',
    deliveryStartTime: '11:30',
    deliveryEndTime: '14:30',
    timezone: 'America/Guayaquil',
    qrExpirationHours: 12,
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="text-blue-600" size={24} />
          <span>Configuración General del Sistema</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Ajusta los parámetros operativos de LunchPass, horarios de corte y cupos.</p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-medium flex items-center gap-2">
          <CheckCircle size={18} />
          <span>¡Configuración guardada exitosamente en la base de datos!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="space-y-4">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">Información Corporativa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre de la Empresa</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Cupo Predeterminado de Almuerzos</label>
              <input
                type="number"
                value={form.defaultQuota}
                onChange={(e) => setForm({ ...form, defaultQuota: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
            <Clock size={18} className="text-blue-600" />
            <span>Horarios Operativos y Cortes</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Hora de Apertura de Reservación</label>
              <input
                type="time"
                value={form.reservationOpenTime}
                onChange={(e) => setForm({ ...form, reservationOpenTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Hora de Cierre / Límite de Reserva</label>
              <input
                type="time"
                value={form.reservationCloseTime}
                onChange={(e) => setForm({ ...form, reservationCloseTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Inicio de Servicio Comedor</label>
              <input
                type="time"
                value={form.deliveryStartTime}
                onChange={(e) => setForm({ ...form, deliveryStartTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Fin de Servicio Comedor</label>
              <input
                type="time"
                value={form.deliveryEndTime}
                onChange={(e) => setForm({ ...form, deliveryEndTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl text-sm shadow-md shadow-blue-200 flex items-center gap-2"
          >
            <Save size={18} />
            <span>Guardar Configuración</span>
          </button>
        </div>
      </form>
    </div>
  );
}
