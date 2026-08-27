import React, { useState } from 'react';
import { Download, Calendar, BarChart2, PieChart, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export default function ReportsPage() {
  const [period, setPeriod] = useState<'TODAY' | 'WEEK' | 'MONTH' | 'YEAR'>('TODAY');

  const deptData = [
    { name: 'Tecnología e Informática', reserved: 45, delivered: 42, noShow: 3, pct: '93.3%' },
    { name: 'Finanzas y Contabilidad', reserved: 28, delivered: 26, noShow: 2, pct: '92.8%' },
    { name: 'Recursos Humanos', reserved: 18, delivered: 18, noShow: 0, pct: '100.0%' },
    { name: 'Operaciones y Logística', reserved: 52, delivered: 48, noShow: 4, pct: '92.3%' },
    { name: 'Ventas y Comercial', reserved: 30, delivered: 27, noShow: 3, pct: '90.0%' },
  ];

  const handleExportCSV = () => {
    let csv = 'Departamento,Reservados,Entregados,NoShow,Cumplimiento\n';
    deptData.forEach((row) => {
      csv += `"${row.name}",${row.reserved},${row.delivered},${row.noShow},${row.pct}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reporte_almuerzos_lunchpass_${period.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes y Consumo Corporativo</h1>
          <p className="text-sm text-gray-500 mt-1">Estadísticas detalladas de reservación, tasa de no-show y consumo por departamento.</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-2xl text-sm shadow-md shadow-emerald-200 flex items-center gap-2"
        >
          <Download size={18} />
          <span>Exportar a CSV</span>
        </button>
      </div>

      {/* Period Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'TODAY', label: 'Hoy' },
          { key: 'WEEK', label: 'Esta Semana' },
          { key: 'MONTH', label: 'Este Mes' },
          { key: 'YEAR', label: 'Año 2026' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setPeriod(t.key as any)}
            className={`px-4 py-2 rounded-2xl font-semibold text-xs transition-all ${
              period === t.key
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs text-gray-400 font-bold uppercase">Total Almuerzos Reservados</span>
          <p className="text-3xl font-black text-gray-900">173</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs text-gray-400 font-bold uppercase">Almuerzos Entregados</span>
          <p className="text-3xl font-black text-emerald-600">161</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs text-gray-400 font-bold uppercase">Tasa de Cumplimiento</span>
          <p className="text-3xl font-black text-blue-600">93.1%</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs text-gray-400 font-bold uppercase">Incidencia No-Show</span>
          <p className="text-3xl font-black text-amber-600">6.9% (12)</p>
        </div>
      </div>

      {/* Department Consumption Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FileText size={20} className="text-blue-600" />
          <span>Consumo de Almuerzos por Departamento</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 font-bold uppercase">
                <th className="py-3.5 px-4">Departamento</th>
                <th className="py-3.5 px-4">Reservados</th>
                <th className="py-3.5 px-4">Entregados</th>
                <th className="py-3.5 px-4">No-Show</th>
                <th className="py-3.5 px-4 text-right">Cumplimiento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deptData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{row.name}</td>
                  <td className="py-3.5 px-4 font-semibold text-gray-700">{row.reserved}</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600">{row.delivered}</td>
                  <td className="py-3.5 px-4 font-semibold text-amber-600">{row.noShow}</td>
                  <td className="py-3.5 px-4 text-right font-black text-blue-600">{row.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
