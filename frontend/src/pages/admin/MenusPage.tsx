import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Menu, MenuItem } from '../../types';
import { Plus, Calendar, Copy, Trash2, Edit3, Utensils, CheckCircle, X, AlertCircle } from 'lucide-react';

interface CreateItemForm {
  name: string;
  category: string;
  description: string;
  calories: number;
}

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isDuplicateOpen, setIsDuplicateOpen] = useState<boolean>(false);
  const [selectedMenuForDup, setSelectedMenuForDup] = useState<Menu | null>(null);
  const [targetDate, setTargetDate] = useState<string>('');

  // Form State
  const [menuDate, setMenuDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [menuDescription, setMenuDescription] = useState<string>('Menú Ejecutivo');
  const [items, setItems] = useState<CreateItemForm[]>([
    { name: 'Sopa de Pollo con Verduras', category: 'STARTER', description: 'Sopa casera', calories: 180 },
    { name: 'Pollo Dorado con Arroz y Ensalada', category: 'MAIN_COURSE', description: 'Plato principal con guarnición', calories: 550 },
  ]);

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  const handleAddItem = () => {
    setItems([
      ...items,
      { name: '', category: 'MAIN_COURSE', description: '', calories: 350 }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof CreateItemForm, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setMessage(null);
      await api.post('/menus', {
        date: menuDate,
        description: menuDescription,
        items: items.filter(i => i.name.trim() !== '')
      });
      setMessage({ type: 'success', text: '¡Menú creado exitosamente!' });
      setIsCreateOpen(false);
      fetchMenus();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Error al crear menú.' });
    }
  };

  const handleDuplicate = async () => {
    if (!selectedMenuForDup || !targetDate) return;
    try {
      setMessage(null);
      await api.post(`/menus/${selectedMenuForDup.id}/duplicate?targetDate=${targetDate}`);
      setMessage({ type: 'success', text: `¡Menú duplicado correctamente para la fecha ${targetDate}!` });
      setIsDuplicateOpen(false);
      setSelectedMenuForDup(null);
      fetchMenus();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Error al duplicar menú.' });
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm('¿Estás seguro de eliminar este menú?')) return;
    try {
      await api.delete(`/menus/${id}`);
      setMessage({ type: 'success', text: 'Menú eliminado correctamente.' });
      fetchMenus();
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Error al eliminar menú.' });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Menús Diarios</h1>
          <p className="text-sm text-gray-500 mt-1">Crea, edita y duplica los menús de almuerzo para la empresa.</p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-2xl text-sm transition-all shadow-md shadow-blue-200 flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Crear Nuevo Menú</span>
        </button>
      </div>

      {/* Messages */}
      {message && (
        <div className={`p-4 rounded-2xl flex items-center justify-between ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          <div className="flex items-center gap-3">
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>
      )}

      {/* Menu Cards */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : menus.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
          <Utensils size={48} className="mx-auto text-gray-300 mb-3" />
          <h3 className="font-bold text-gray-700 text-lg">No hay menús configurados</h3>
          <p className="text-sm text-gray-500 mt-1">Haz clic en "Crear Nuevo Menú" para programar almuerzos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menus.map((m) => (
            <div key={m.id} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="text-blue-600" size={20} />
                  <span className="font-bold text-gray-900 text-base">{m.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedMenuForDup(m);
                      setIsDuplicateOpen(true);
                    }}
                    title="Duplicar menú"
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    title="Eliminar menú"
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 text-sm">{m.description || 'Menú programado'}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{m.items?.length || 0} platos disponibles</p>
              </div>

              {/* Items List */}
              <div className="space-y-2 pt-2">
                {m.items?.map((item) => (
                  <div key={item.id} className="bg-gray-50 p-3 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-gray-900">{item.name}</span>
                      {item.description && <p className="text-gray-500 mt-0.5">{item.description}</p>}
                    </div>
                    <span className="font-semibold text-blue-600 bg-blue-100/50 px-2.5 py-1 rounded-lg">
                      {item.category || 'OPCIÓN'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Crear Menú */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-900">Crear Nuevo Menú</h2>
              <button onClick={() => setIsCreateOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateMenu} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Fecha del Menú</label>
                  <input
                    type="date"
                    required
                    value={menuDate}
                    onChange={(e) => setMenuDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Descripción / Título</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Menú Ejecutivo de Miércoles"
                    value={menuDescription}
                    onChange={(e) => setMenuDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Items Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-gray-700">Platos y Opciones del Menú</label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} /> Añadir Plato
                  </button>
                </div>

                {items.map((it, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-2xl space-y-3 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-600">Plato #{idx + 1}</span>
                      {items.length > 1 && (
                        <button type="button" onClick={() => handleRemoveItem(idx)} className="text-red-500 hover:text-red-700 text-xs">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Nombre del plato (ej. Pollo al Horno)"
                        required
                        value={it.name}
                        onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-xs bg-white"
                      />
                      <select
                        value={it.category}
                        onChange={(e) => handleItemChange(idx, 'category', e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-xs bg-white"
                      >
                        <option value="STARTER">Entrada</option>
                        <option value="MAIN_COURSE">Plato Principal</option>
                        <option value="VEGETARIAN">Vegetariano</option>
                        <option value="SIDE">Guarnición</option>
                        <option value="DESSERT">Postre</option>
                        <option value="BEVERAGE">Bebida</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      placeholder="Descripción detallada (ingredientes, acompañamientos)"
                      value={it.description}
                      onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs bg-white"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-md shadow-blue-200"
                >
                  Guardar Menú
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Duplicar Menú */}
      {isDuplicateOpen && selectedMenuForDup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-900">Duplicar Menú</h2>
              <button onClick={() => setIsDuplicateOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>

            <p className="text-xs text-gray-500">
              Copiarás las {selectedMenuForDup.items?.length || 0} opciones del menú del <strong className="text-gray-800">{selectedMenuForDup.date}</strong> a una nueva fecha.
            </p>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Fecha Destino</label>
              <input
                type="date"
                required
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsDuplicateOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleDuplicate}
                disabled={!targetDate}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                Confirmar Duplicación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
