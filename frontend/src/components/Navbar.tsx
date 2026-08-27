import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Utensils, LogOut, Calendar, QrCode, Home, Shield, Users, FileText, Settings, Building2 } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-md shadow-blue-200">
              <Utensils className="h-5 w-5" />
            </div>
            <Link to="/inicio" className="flex flex-col">
              <span className="text-lg font-black text-gray-900 leading-none">LunchPass</span>
              <span className="text-[10px] text-gray-400 font-semibold tracking-wide">Control de Almuerzos</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {user && (
              <>
                <div className="hidden md:flex items-center gap-1">
                  {/* Common Employee Links */}
                  <Link
                    to="/inicio"
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive('/inicio') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Home size={16} />
                    <span>Inicio</span>
                  </Link>

                  <Link
                    to="/menu"
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive('/menu') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Utensils size={16} />
                    <span>Menú</span>
                  </Link>

                  <Link
                    to="/mis-reservas"
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive('/mis-reservas') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Calendar size={16} />
                    <span>Mis Reservas</span>
                  </Link>

                  {/* Cafeteria Links */}
                  {(user.role === 'CAFETERIA' || user.role === 'ADMIN') && (
                    <>
                      <Link
                        to="/validar-qr"
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isActive('/validar-qr') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <QrCode size={16} />
                        <span>Escáner QR</span>
                      </Link>

                      <Link
                        to="/cafeteria"
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isActive('/cafeteria') && !isActive('/validar-qr') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Utensils size={16} />
                        <span>Comedor</span>
                      </Link>
                    </>
                  )}

                  {/* Admin Links */}
                  {user.role === 'ADMIN' && (
                    <>
                      <Link
                        to="/admin"
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isActive('/admin') && !isActive('/admin/empleados') && !isActive('/admin/menu') && !isActive('/admin/reportes')
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Shield size={16} />
                        <span>Admin</span>
                      </Link>

                      <Link
                        to="/admin/empleados"
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isActive('/admin/empleados') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Users size={16} />
                        <span>Personal</span>
                      </Link>

                      <Link
                        to="/admin/menu"
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isActive('/admin/menu') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Utensils size={16} />
                        <span>Menús Admin</span>
                      </Link>

                      <Link
                        to="/admin/reportes"
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isActive('/admin/reportes') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <FileText size={16} />
                        <span>Reportes</span>
                      </Link>
                    </>
                  )}
                </div>

                {/* Profile Badge & Logout */}
                <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-xs font-bold text-gray-900">{user.name || user.username}</span>
                    <span className="text-[10px] text-gray-500 font-semibold uppercase">{user.role}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Cerrar sesión"
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
