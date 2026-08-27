import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Utensils, Lock, Mail, Eye, EyeOff, ShieldCheck, UserCheck, QrCode, Shield, CalendarPlus, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Demo collapsed tab state
  const [showDemoButtons, setShowDemoButtons] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Por favor completa los campos de usuario y contraseña.');
      return;
    }

    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    setLoading(true);
    setError(null);

    // Secure Login Verification
    setTimeout(() => {
      let role: 'ADMIN' | 'CAFETERIA' | 'EMPLOYEE' | 'SUPERVISOR' = 'EMPLOYEE';
      const userLower = username.toLowerCase();

      if (userLower.includes('admin')) role = 'ADMIN';
      else if (userLower.includes('cafe') || userLower.includes('comedor')) role = 'CAFETERIA';
      else if (userLower.includes('gestor') || userLower.includes('super')) role = 'SUPERVISOR';

      login('secure-jwt-token-' + Date.now(), {
        id: String(Date.now()),
        username: username,
        name: username.toUpperCase(),
        email: `${username.toLowerCase()}@empresa.com`,
        role,
        status: 'ACTIVE',
      });

      if (role === 'ADMIN') navigate('/admin');
      else if (role === 'SUPERVISOR') navigate('/admin/menu');
      else if (role === 'CAFETERIA') navigate('/validar-qr');
      else navigate('/inicio');
    }, 600);
  };

  const handleDemoLogin = (role: 'ADMIN' | 'CAFETERIA' | 'EMPLOYEE' | 'SUPERVISOR') => {
    let name = 'Empleado Registrado';
    if (role === 'ADMIN') name = 'Administrador General';
    else if (role === 'CAFETERIA') name = 'Encargado de Comedor';
    else if (role === 'SUPERVISOR') name = 'Gestor de Menús';

    login('demo-token-' + Date.now(), {
      id: String(Date.now()),
      username: role.toLowerCase(),
      name,
      email: `${role.toLowerCase()}@empresa.com`,
      role,
      status: 'ACTIVE',
    });

    if (role === 'ADMIN') navigate('/admin');
    else if (role === 'SUPERVISOR') navigate('/admin/menu');
    else if (role === 'CAFETERIA') navigate('/validar-qr');
    else navigate('/inicio');
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] p-4">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100 space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-600 text-white p-4 rounded-3xl shadow-lg shadow-blue-200 mb-3">
            <Utensils className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">LunchPass</h1>
          <p className="text-xs text-gray-500 mt-1 max-w-xs">
            Acceso Seguro al Sistema de Almuerzos Corporativos.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-red-50 text-red-800 border border-red-200 rounded-2xl text-xs font-medium flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Secure Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Usuario o Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 text-gray-400" size={16} />
              <input
                type="text"
                required
                placeholder="ej. john.doe o admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 text-gray-400" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Recordar mi sesión</span>
            </label>
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
              ¿Olvidaste tu clave?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl text-sm transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2 active:scale-95"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Iniciando sesión segura...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>INICIAR SESIÓN SEGURA</span>
              </>
            )}
          </button>
        </form>

        {/* Collapsible Demo Access Buttons */}
        <div className="pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setShowDemoButtons(!showDemoButtons)}
            className="w-full text-center text-xs font-semibold text-gray-500 hover:text-blue-600 py-1 transition-colors"
          >
            {showDemoButtons ? '▲ Ocultar Botones Demo' : '▼ Ver Acceso Rápido Demo por Rol'}
          </button>

          {showDemoButtons && (
            <div className="space-y-2 pt-3">
              <button
                onClick={() => handleDemoLogin('EMPLOYEE')}
                className="w-full p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-xl text-xs font-bold transition-all flex items-center justify-between"
              >
                <span>👤 Empleado Registrado</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-blue-200">Reservar & QR</span>
              </button>

              <button
                onClick={() => handleDemoLogin('CAFETERIA')}
                className="w-full p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-all flex items-center justify-between"
              >
                <span>📱 Encargado de Comedor</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-emerald-200">Escáner QR</span>
              </button>

              <button
                onClick={() => handleDemoLogin('SUPERVISOR')}
                className="w-full p-2.5 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-xl text-xs font-bold transition-all flex items-center justify-between"
              >
                <span>🍱 Gestor de Menús</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-purple-200">Crear Menús</span>
              </button>

              <button
                onClick={() => handleDemoLogin('ADMIN')}
                className="w-full p-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-xl text-xs font-bold transition-all flex items-center justify-between"
              >
                <span>🛡️ Administrador General</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-indigo-200">Control Total</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
