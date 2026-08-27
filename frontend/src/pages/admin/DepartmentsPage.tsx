import React, { useState } from 'react';
import { Plus, Building2, Trash2, Edit } from 'lucide-react';

interface Dept {
  id: string;
  name: string;
  code: string;
  employeeCount: number;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Dept[]>([
    { id: '1', name: 'Tecnología e Informática', code: 'TEC', employeeCount: 14 },
    { id: '2', name: 'Finanzas y Contabilidad', code: 'FIN', employeeCount: 8 },
    { id: '3', name: 'Recursos Humanos', code: 'RRHH', employeeCount: 6 },
    { id: '4', name: 'Operaciones y Logística', code: 'OPE', employeeCount: 18 },
    { id: '5', name: 'Ventas y Comercial', code: 'VEN', employeeCount: 10 },
  ]);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setDepartments([
      ...departments,
      { id: String(Date.now()), name, code: code || name.substring(0, 3).toUpperCase(), employeeCount: 0 }
    ]);
    setName('');
    setCode('');
    setIsOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Departamentos</h1>
          <p className="text-sm text-gray-500 mt-1">Organización corporativa de empleados y presupuestos de almuerzo.</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-2xl text-sm shadow-md shadow-blue-200 flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Nuevo Departamento</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((d) => (
          <div key={d.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Building2 size={22} />
              </div>
              <span className="font-mono text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg">
                {d.code}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">{d.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{d.employeeCount} empleados registrados</p>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Crear Departamento</h2>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Marketing"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Código Abreviado</label>
                <input
                  type="text"
                  placeholder="Ej. MKT"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
