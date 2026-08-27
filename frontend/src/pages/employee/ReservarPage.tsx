import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Menu, MenuItem } from '../../types';
import { Calendar, Utensils, CheckCircle, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function ReservarPage() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reserving, setReserving] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const res = await api.get('/menus');
      const list: Menu[] = res.data || [];
      setMenus(list);
      if (list.length > 0) {
        setSelectedMenu(list[0]);
        if (list[0].items && list[0].items.length > 0) {
          setSelectedItem(list[0].items[0]);
        }
      }
    } catch (err) {
      console.error('Error al cargar menús:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuChange = (menuId: string | number) => {
    const found = menus.find((m) => String(m.id) === String(menuId));
    if (found) {
      setSelectedMenu(found);
      if (found.items && found.items.length > 0) {
        setSelectedItem(found.items[0]);
      } else {
        setSelectedItem(null);
      }
    }
  };

  const handleConfirmReservation = async () => {
    if (!selectedMenu || !selectedItem) return;
    try {
      setReserving(true);
      setMessage(null);
      await api.post('/reservations', {
        menuItemId: selectedItem.id,
        date: selectedMenu.date,
      });
      setMessage({ type: 'success', text: `¡Reserva confirmada con éxito para la fecha ${selectedMenu.date}!` });
      setTimeout(() => {
        navigate('/employee/mis-reservas');
      }, 1500);
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Error al procesar la reserva. Verifica si ya tienes una reserva activa.',
      });
    } finally {
      setReserving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
      >
        <ArrowLeft size={16} />
        <span>Volver atrás</span>
      </button>

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservar Almuerzo Corporativo</h1>
          <p className="text-sm text-gray-500 mt-1">Selecciona la fecha y la opción de tu preferencia para generar tu ticket QR.</p>
        </div>

        {message && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        {/* Date Selector */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">1. Selecciona la Fecha</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {menus.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleMenuChange(m.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedMenu?.id === m.id
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-600/20 font-bold'
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={16} className="text-blue-600" />
                  <span className="text-sm">{m.date}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{m.description || 'Menú programado'}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Item Selector */}
        {selectedMenu && (
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">2. Elige tu Opción de Menú</label>
            {selectedMenu.items && selectedMenu.items.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {selectedMenu.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedItem?.id === item.id
                        ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">{item.name}</span>
                        <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">
                          {item.category || 'MENÚ'}
                        </span>
                      </div>
                      {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedItem?.id === item.id ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
                    }`}>
                      {selectedItem?.id === item.id && <CheckCircle size={14} />}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 bg-gray-50 p-4 rounded-xl">No hay platos configurados para esta fecha.</p>
            )}
          </div>
        )}

        {/* Summary & Confirm */}
        {selectedItem && (
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200/80 space-y-3">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <ShieldCheck size={18} className="text-blue-600" />
              <span>Resumen de la Reserva</span>
            </h3>
            <div className="text-xs text-gray-600 space-y-1.5">
              <div className="flex justify-between">
                <span>Fecha seleccionada:</span>
                <strong className="text-gray-900">{selectedMenu?.date}</strong>
              </div>
              <div className="flex justify-between">
                <span>Plato / Menú:</span>
                <strong className="text-gray-900">{selectedItem.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Estado de entrega:</span>
                <span className="text-emerald-700 font-bold">Generación de QR Único</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-3.5 bg-gray-100 text-gray-700 rounded-2xl font-semibold text-sm hover:bg-gray-200 transition-all"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={!selectedItem || reserving}
            onClick={handleConfirmReservation}
            className={`flex-1 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
              selectedItem && !reserving
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
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
                <span>Confirmar Reserva</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
