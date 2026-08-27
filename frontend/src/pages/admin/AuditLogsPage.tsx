import React, { useState } from 'react';
import { ShieldCheck, Search, Clock, FileText, User } from 'lucide-react';

interface Log {
  id: string;
  action: string;
  entityName: string;
  performedBy: string;
  timestamp: string;
  details: string;
}

export default function AuditLogsPage() {
  const [logs] = useState<Log[]>([
    { id: '101', action: 'CREATE_RESERVATION', entityName: 'Reservation', performedBy: 'john.doe', timestamp: '2026-08-27 08:34:12', details: 'Reserva creada para plato Pollo a la Plancha' },
    { id: '102', action: 'VALIDATE_QR', entityName: 'QrCode', performedBy: 'chef.gordon', timestamp: '2026-08-27 12:15:04', details: 'Escaneo QR exitoso token=QR-12345' },
    { id: '103', action: 'DELIVER_MEAL', entityName: 'MealDelivery', performedBy: 'chef.gordon', timestamp: '2026-08-27 12:15:05', details: 'Entrega confirmada para reserva #1' },
    { id: '104', action: 'CREATE_MENU', entityName: 'Menu', performedBy: 'admin', timestamp: '2026-08-27 07:00:00', details: 'Creación de menú del día con 10 opciones' },
  ]);

  const [filter, setFilter] = useState('');

  const filteredLogs = logs.filter((l) =>
    `${l.action} ${l.entityName} ${l.performedBy} ${l.details}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ShieldCheck className="text-blue-600" size={24} />
          <span>Registro de Auditoría y Seguridad</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Historial inmutable de acciones realizadas en el sistema LunchPass.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Filtrar eventos de auditoría por usuario, acción o detalles..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 border-none focus:outline-none text-xs text-gray-800"
        />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 font-bold uppercase">
                <th className="py-4 px-5">Fecha / Hora</th>
                <th className="py-4 px-5">Acción</th>
                <th className="py-4 px-5">Entidad</th>
                <th className="py-4 px-5">Usuario</th>
                <th className="py-4 px-5">Detalles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50/50">
                  <td className="py-4 px-5 font-mono text-gray-500">{l.timestamp}</td>
                  <td className="py-4 px-5 font-bold text-blue-700">{l.action}</td>
                  <td className="py-4 px-5 font-semibold text-gray-700">{l.entityName}</td>
                  <td className="py-4 px-5 font-bold text-gray-900">{l.performedBy}</td>
                  <td className="py-4 px-5 text-gray-600 max-w-sm truncate">{l.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
