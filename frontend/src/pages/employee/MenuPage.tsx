import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Menu, MenuItem } from '../../types';
import { Calendar, Utensils, Clock, CheckCircle, AlertCircle, Award, Leaf, Coffee, PieChart, User } from 'lucide-react';

export default function MenuPage() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reserving, setReserving] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Registered employees selector list
  const [employees] = useState([
    { id: 1, name: 'John Doe', department: 'Tecnología' },
    { id: 2, name: 'Gordon Ramsay', department: 'Operaciones' },
    { id: 3, name: 'María García', department: 'Finanzas' },
    { id: 4, name: 'Carlos López', department: 'Recursos Humanos' },
    { id: 5, name: 'Ana Torres', department: 'Ventas' },
  ]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(1);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const res = await api.get('/menus');
      setMenus(res.data || []);
    } catch (err) {
      console.error('Error al cargar menús:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentMenu = menus[selectedMenuIndex];

  const handleReserve = async () => {
    if (!selectedItem || !currentMenu) return;
    try {
      setReserving(true);
      setMessage(null);
      const emp = employees.find((e) => e.id === selectedEmployeeId);
      await api.post('/reservations', {
        menuItemId: selectedItem.id,
        employeeId: selectedEmployeeId,
        date: currentMenu.date,
      });
      setMessage({
        type: 'success',
        text: `¡Reserva confirmada exitosamente para ${emp ? emp.name : 'el empleado'} (${selectedItem.name})!`,
      });
      setTimeout(() => {
        navigate('/mis-reservas');
      }, 1500);
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'No se pudo realizar la reserva. Revisa si la reservación ya existe.',
      });
    } finally {
      setReserving(false);
    }
  };

  const getCategoryBadge = (category?: string) => {
    switch (category) {
      case 'STARTER':
        return <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center gap-1"><Utensils size={12} /> Entrada</span>;
      case 'MAIN_COURSE':
        return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center gap-1"><Award size={12} /> Plato Principal</span>;
      case 'VEGETARIAN':
        return <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center gap-1"><Leaf size={12} /> Vegetariano</span>;
      case 'SIDE':
        return <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center gap-1"><PieChart size={12} /> Guarnición</span>;
      case 'DESSERT':
        return <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center gap-1 font-sans">🍰 Postre</span>;
      case 'BEVERAGE':
        return <span className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center gap-1"><Coffee size={12} /> Bebida</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">Especial</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
              LunchPass Menú
            </span>
            <h1 className="text-3xl font-extrabold mt-2">Menú de Almuerzos</h1>
            <p className="text-blue-100 text-sm mt-1">
              Selecciona el empleado, el día y tu combinación favorita para reservar tu almuerzo.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20">
            <Clock size={18} className="text-blue-200" />
            <span className="text-xs font-medium">Horario de reserva: Habilitado las 24 horas</span>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {/* Employee Selector Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <User size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">¿A quién estás reservando?</h3>
            <p className="text-xs text-gray-500">Selecciona el empleado registrado destinatario de esta reserva.</p>
          </div>
        </div>
        <select
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
          className="px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50 text-xs font-bold text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-auto"
        >
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              👤 {emp.name} ({emp.department})
            </option>
          ))}
        </select>
      </div>

      {/* Date Navigation Tabs */}
      {menus.length > 0 && (
        <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar">
          {menus.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMenuIndex(idx);
                setSelectedItem(null);
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium text-sm whitespace-nowrap transition-all ${
                selectedMenuIndex === idx
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200 scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Calendar size={16} />
              <span>{m.date}</span>
            </button>
          ))}
        </div>
      )}

      {/* Current Selected Menu Content */}
      {currentMenu ? (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
          <div className="border-b border-gray-100 pb-4 flex flex-col md:flex-row justify-between md:items-center gap-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{currentMenu.description || `Menú del ${currentMenu.date}`}</h2>
              <p className="text-xs text-gray-500 mt-1">Disponibles {currentMenu.items?.length || 0} opciones para seleccionar</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 w-fit">
              Reservación Disponible
            </span>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentMenu.items?.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`cursor-pointer p-5 rounded-2xl border-2 transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-600/20'
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      {getCategoryBadge(item.category)}
                      {item.calories && item.calories > 0 && (
                        <span className="text-[11px] font-medium text-gray-400">
                          {item.calories} kcal
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{item.name}</h3>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">
                      Incluido en pase
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
                    }`}>
                      {isSelected && <CheckCircle size={14} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              {selectedItem ? (
                <span className="font-medium text-gray-900">
                  Plato seleccionado: <strong className="text-blue-600">{selectedItem.name}</strong>
                </span>
              ) : (
                <span>Selecciona una opción del menú para habilitar la confirmación.</span>
              )}
            </div>

            <button
              disabled={!selectedItem || reserving}
              onClick={handleReserve}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                selectedItem && !reserving
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              {reserving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Confirmando...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  <span>Confirmar Reserva de Almuerzo</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
          <Utensils size={48} className="mx-auto text-gray-300 mb-3" />
          <h3 className="font-bold text-gray-700 text-lg">No hay menús registrados</h3>
          <p className="text-sm text-gray-500 mt-1">Contacta al administrador del comedor para ver la programación.</p>
        </div>
      )}
    </div>
  );
}
