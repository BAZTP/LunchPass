import React, { useState } from 'react';
import { Plus, Search, Filter, UserCheck, UserX, Edit2, ShieldAlert } from 'lucide-react';

interface Employee {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', code: 'EMP-001', firstName: 'John', lastName: 'Doe', email: 'john.doe@empresa.com', department: 'Tecnología', position: 'Desarrollador Senior', status: 'ACTIVE' },
    { id: '2', code: 'EMP-002', firstName: 'María', lastName: 'García', email: 'maria.garcia@empresa.com', department: 'Finanzas', position: 'Analista Contable', status: 'ACTIVE' },
    { id: '3', code: 'EMP-003', firstName: 'Carlos', lastName: 'López', email: 'carlos.lopez@empresa.com', department: 'Recursos Humanos', position: 'Coordinador Talent', status: 'ACTIVE' },
    { id: '4', code: 'EMP-004', firstName: 'Ana', lastName: 'Torres', email: 'ana.torres@empresa.com', department: 'Operaciones', position: 'Supervisora de Planta', status: 'SUSPENDED' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: 'Tecnología',
    position: '',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmp: Employee = {
      id: String(Date.now()),
      code: `EMP-00${employees.length + 1}`,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      department: form.department,
      position: form.position || 'Colaborador',
      status: 'ACTIVE',
    };
    setEmployees([...employees, newEmp]);
    setIsModalOpen(false);
    setForm({ firstName: '', lastName: '', email: '', department: 'Tecnología', position: '' });
  };

  const toggleStatus = (id: string) => {
    setEmployees(employees.map((e) => {
      if (e.id === id) {
        const nextStatus = e.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        return { ...e, status: nextStatus };
      }
      return e;
    }));
  };

  const filtered = employees.filter((e) =>
    `${e.firstName} ${e.lastName} ${e.email} ${e.code} ${e.department}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Empleados</h1>
          <p className="text-sm text-gray-500 mt-1">Administra el personal con acceso a reservas de almuerzo.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-2xl text-sm shadow-md shadow-blue-200 flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Registrar Empleado</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre, código, correo o departamento..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border-none focus:outline-none text-xs text-gray-800"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 font-bold uppercase">
                <th className="py-4 px-5">Código</th>
                <th className="py-4 px-5">Empleado</th>
                <th className="py-4 px-5">Correo</th>
                <th className="py-4 px-5">Departamento</th>
                <th className="py-4 px-5">Cargo</th>
                <th className="py-4 px-5">Estado</th>
                <th className="py-4 px-5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50/50">
                  <td className="py-4 px-5 font-mono font-bold text-blue-600">{emp.code}</td>
                  <td className="py-4 px-5 font-bold text-gray-900">{emp.firstName} {emp.lastName}</td>
                  <td className="py-4 px-5 text-gray-600">{emp.email}</td>
                  <td className="py-4 px-5 font-semibold text-gray-700">{emp.department}</td>
                  <td className="py-4 px-5 text-gray-500">{emp.position}</td>
                  <td className="py-4 px-5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      emp.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => toggleStatus(emp.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all ${
                        emp.status === 'ACTIVE'
                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {emp.status === 'ACTIVE' ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Registrar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Registrar Nuevo Empleado</h2>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Roberto"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Apellido</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sánchez"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="roberto.sanchez@empresa.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Departamento</label>
                <select
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                >
                  <option value="Tecnología">Tecnología</option>
                  <option value="Finanzas">Finanzas</option>
                  <option value="Recursos Humanos">Recursos Humanos</option>
                  <option value="Operaciones">Operaciones</option>
                  <option value="Ventas">Ventas</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Cargo</label>
                <input
                  type="text"
                  placeholder="Ej. Especialista de Soporte"
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
