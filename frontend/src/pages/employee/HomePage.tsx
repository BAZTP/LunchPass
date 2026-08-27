import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Menu, MenuItem, Reservation } from '../../types';
import { QrDisplay } from '../../components/QrDisplay';
import { Modal } from '../../components/Modal';
import { Calendar, QrCode, Utensils, CheckCircle, ArrowRight, Clock, Award, ShieldCheck, Ticket, Users, Camera, Plus, Copy, FileText, Download, Building2 } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showQr, setShowQr] = useState<boolean>(false);
  const [todayReservation, setTodayReservation] = useState<Reservation | null>(null);
  const [todayMenu, setTodayMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reserving, setReserving] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const role = user?.role || 'EMPLOYEE';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const menuRes = await api.get('/menus/today').catch(() => null);
      if (menuRes && menuRes.data) {
        setTodayMenu(menuRes.data);
      } else {
        const allMenusRes = await api.get('/menus');
        if (allMenusRes.data && allMenusRes.data.length > 0) {
          setTodayMenu(allMenusRes.data[0]);
        }
      }

      const resRes = await api.get('/reservations');
      const list: Reservation[] = resRes.data || [];
      const todayStr = new Date().toISOString().split('T')[0];
      const foundToday = list.find((r) => r.date === todayStr || r.status === 'CONFIRMED');
      if (foundToday) {
        setTodayReservation(foundToday);
      }
    } catch (err) {
      console.error('Error al cargar datos del dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickReserveToday = async () => {
    if (!todayMenu || !todayMenu.items || todayMenu.items.length === 0) {
      navigate('/menu');
      return;
    }
    const itemToReserve = selectedItem || todayMenu.items[0];
    try {
      setReserving(true);
      setMessage(null);
      const res = await api.post('/reservations', {
        menuItemId: itemToReserve.id,
        date: todayMenu.date,
      });
      setTodayReservation(res.data);
      setMessage(`¡Reserva confirmada exitosamente para ${itemToReserve.name}!`);
      setShowQr(true);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error al reservar. Inténtalo nuevamente desde la sección Menú.');
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

  // 1. EMPLEADO VISTA DE PANEL
  if (role === 'EMPLOYEE') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
              Portal de Empleado • LunchPass
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-2">¡Hola, {user?.name || 'Empleado'}!</h1>
            <p className="text-blue-100 text-sm mt-1 max-w-xl">
              Gestiona tu pase corporativo de almuerzos, explora el menú semanal y consulta tu ticket QR.
            </p>
          </div>
          <button
            onClick={() => navigate('/menu')}
            className="bg-white text-blue-700 hover:bg-blue-50 px-5 py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Utensils size={18} />
            <span>Ver Menú Completo</span>
          </button>
        </div>

        {/* Dynamic Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Panel Principal de Reservas */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Calendar size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Reserva de Almuerzos</h2>
                  <p className="text-xs text-gray-500">Selección directa y asignación de pases diarios.</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                🟢 SERVICIO ACTIVO
              </span>
            </div>

            {todayReservation ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 rounded-2xl border border-blue-100/60 space-y-2">
                  <div className="flex justify-between items-center text-xs text-blue-700 font-semibold">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Ticket size={16} className="text-blue-600" />
                      <span>TICKET DE ALMUERZO CONFIRMADO</span>
                    </span>
                    <span className="font-mono bg-white px-2 py-0.5 rounded-md border border-blue-200 font-bold">
                      {todayReservation.code || 'LP-2026-A8F291'}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-lg pt-1">
                    {todayReservation.menuItem?.name || 'Menú Especial del Día'}
                  </h3>
                  {todayReservation.menuItem?.description && (
                    <p className="text-xs text-gray-600">{todayReservation.menuItem.description}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setShowQr(true)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-5 rounded-2xl text-sm transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2"
                  >
                    <QrCode size={20} />
                    <span>Ver Código QR</span>
                  </button>
                  <button
                    onClick={() => navigate('/mis-reservas')}
                    className="px-5 py-3.5 rounded-2xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <span>Mis Reservas</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : todayMenu ? (
              <div className="space-y-4">
                <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                    <Clock size={18} />
                    <span>Menú disponible para hoy: {todayMenu.description || 'Almuerzo Ejecutivo'}</span>
                  </div>
                  
                  {todayMenu.items && todayMenu.items.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <label className="text-[11px] font-bold text-gray-600 uppercase">Selecciona el plato que deseas reservar:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {todayMenu.items.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={`p-3 rounded-xl border cursor-pointer text-xs font-medium transition-all ${
                              (selectedItem?.id === item.id || (!selectedItem && todayMenu.items[0].id === item.id))
                                ? 'border-blue-600 bg-white text-blue-900 shadow-sm font-bold ring-2 ring-blue-600/20'
                                : 'border-amber-200/80 bg-white/80 text-gray-700 hover:border-blue-400'
                            }`}
                          >
                            <span className="block truncate">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {message && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-medium flex items-center gap-2">
                    <CheckCircle size={16} />
                    <span>{message}</span>
                  </div>
                )}

                <button
                  disabled={reserving}
                  onClick={handleQuickReserveToday}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2"
                >
                  {reserving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Reservando...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      <span>Confirmar Reserva de Almuerzo</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center p-6 text-gray-500 space-y-2">
                <Clock size={36} className="mx-auto text-gray-300" />
                <p className="text-sm font-medium">No se encontraron menús activos para el día de hoy.</p>
                <button onClick={() => navigate('/menu')} className="text-blue-600 text-xs font-bold hover:underline">
                  Ver la programación semanal →
                </button>
              </div>
            )}
          </div>

          {/* Cards Laterales de Acción */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-600" />
                <span>Estado de Cuenta</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-100 text-gray-600">
                  <span>Usuario:</span>
                  <span className="font-bold text-gray-900">{user?.name || 'Empleado'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 text-gray-600">
                  <span>Pases diarios:</span>
                  <span className="font-bold text-emerald-600">1 Almuerzo / Día</span>
                </div>
                <div className="flex justify-between py-1 text-gray-600">
                  <span>Seguridad QR:</span>
                  <span className="font-bold text-blue-600">Token Único Encriptado</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 border border-indigo-100 space-y-3">
              <h3 className="font-bold text-indigo-950 text-sm">Historial Personal de Pases</h3>
              <p className="text-xs text-indigo-700">
                Consulta tus tickets anteriores, estados de entrega en comedor y cancelaciones.
              </p>
              <button
                onClick={() => navigate('/mis-reservas')}
                className="w-full bg-white text-indigo-700 hover:bg-indigo-100 font-bold py-2.5 px-4 rounded-xl text-xs transition-all border border-indigo-200 text-center block"
              >
                Ir a Mis Reservas →
              </button>
            </div>
          </div>
        </div>

        {/* Modal QR Popup */}
        <Modal isOpen={showQr} onClose={() => setShowQr(false)} title="Código QR Personal de Reserva">
          {todayReservation && (
            <QrDisplay
              code={todayReservation.code || 'LP-2026-X8F92A'}
              date={todayReservation.date}
              status={todayReservation.status === 'DELIVERED' || todayReservation.status === 'USED' ? 'USED' : 'CONFIRMED'}
              menuSummary={todayReservation.menuItem?.name || 'Menú Especial del Día'}
            />
          )}
        </Modal>
      </div>
    );
  }

  // 2. COMEDOR / CAFETERÍA VISTA DE PANEL
  if (role === 'CAFETERIA') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
              Control de Comedor • LunchPass
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-2">Panel de Validación & Servicio</h1>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              Verifica los códigos QR presentados por los empleados y registra las entregas físicas en el comedor.
            </p>
          </div>
          <button
            onClick={() => navigate('/validar-qr')}
            className="bg-white text-emerald-800 hover:bg-emerald-50 px-6 py-3.5 rounded-2xl font-black text-sm shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Camera size={20} />
            <span>ABRIR ESCÁNER CÁMARA</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-400 font-bold uppercase">Entregados Hoy</span>
            <p className="text-3xl font-black text-emerald-600 mt-1">12</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-400 font-bold uppercase">Pendientes por Retirar</span>
            <p className="text-3xl font-black text-blue-600 mt-1">8</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-400 font-bold uppercase">Tasa de Entrega</span>
            <p className="text-3xl font-black text-purple-600 mt-1">60.0%</p>
          </div>
        </div>
      </div>
    );
  }

  // 3. GESTOR DE MENÚS VISTA DE PANEL
  if (role === 'SUPERVISOR') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
              Gestión Gastronómica • LunchPass
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-2">Planificación de Menús</h1>
            <p className="text-purple-100 text-sm mt-1 max-w-xl">
              Crea los menús diarios, añade categorías de platos y duplica opciones para la semana.
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/menu')}
            className="bg-white text-purple-900 hover:bg-purple-50 px-6 py-3.5 rounded-2xl font-black text-sm shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} />
            <span>GESTIONAR MENÚS</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 space-y-4">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Utensils size={18} className="text-purple-600" />
            <span>Estado del Menú del Día</span>
          </h2>
          <p className="text-xs text-gray-500">
            El menú actual cuenta con <strong>{todayMenu?.items?.length || 0} platos registrados</strong> para reservación.
          </p>
        </div>
      </div>
    );
  }

  // 4. ADMINISTRADOR GENERAL VISTA DE PANEL
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-800 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            Administración General • LunchPass
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-2">Panel Ejecutivo Corporativo</h1>
          <p className="text-indigo-100 text-sm mt-1 max-w-xl">
            Control total sobre empleados, departamentos, reservaciones, reportes CSV y auditoría.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/admin/empleados')}
            className="bg-white text-indigo-900 hover:bg-indigo-50 px-4 py-3 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Users size={16} />
            <span>Personal</span>
          </button>
          <button
            onClick={() => navigate('/admin/reportes')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <FileText size={16} />
            <span>Reportes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-bold uppercase">Empleados Activos</span>
          <p className="text-3xl font-black text-gray-900 mt-1">54</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-bold uppercase">Departamentos</span>
          <p className="text-3xl font-black text-blue-600 mt-1">5</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-bold uppercase">Cumplimiento %</span>
          <p className="text-3xl font-black text-emerald-600 mt-1">94.2%</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-bold uppercase">Auditoría Registrada</span>
          <p className="text-3xl font-black text-purple-600 mt-1">104</p>
        </div>
      </div>
    </div>
  );
}
