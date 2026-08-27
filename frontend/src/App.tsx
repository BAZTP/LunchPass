import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { RequireAuth } from './components/RequireAuth';

import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/employee/HomePage';
import MenuPage from './pages/employee/MenuPage';
import ReservarPage from './pages/employee/ReservarPage';
import MisReservasPage from './pages/employee/MisReservasPage';

import ValidarQrPage from './pages/cafeteria/ValidarQrPage';
import CafeteriaDashboard from './pages/cafeteria/CafeteriaDashboard';

import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeesPage from './pages/admin/EmployeesPage';
import DepartmentsPage from './pages/admin/DepartmentsPage';
import MenusPage from './pages/admin/MenusPage';
import ReservationsPage from './pages/admin/ReservationsPage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';
import AuditLogsPage from './pages/admin/AuditLogsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Employee Routes */}
            <Route element={<RequireAuth allowedRoles={['EMPLOYEE', 'ADMIN', 'CAFETERIA', 'SUPERVISOR']} />}>
              <Route path="/inicio" element={<HomePage />} />
              <Route path="/employee" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/employee/menu" element={<MenuPage />} />
              <Route path="/reservar" element={<ReservarPage />} />
              <Route path="/employee/reservar" element={<ReservarPage />} />
              <Route path="/mis-reservas" element={<MisReservasPage />} />
              <Route path="/employee/reservas" element={<MisReservasPage />} />
              <Route path="/employee/reservas/:id" element={<MisReservasPage />} />
            </Route>

            {/* Cafeteria Routes */}
            <Route element={<RequireAuth allowedRoles={['CAFETERIA', 'ADMIN']} />}>
              <Route path="/cafeteria" element={<CafeteriaDashboard />} />
              <Route path="/validar-qr" element={<ValidarQrPage />} />
              <Route path="/cafeteria/scan" element={<ValidarQrPage />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<RequireAuth allowedRoles={['ADMIN', 'SUPERVISOR']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/empleados" element={<EmployeesPage />} />
              <Route path="/admin/employees" element={<EmployeesPage />} />
              <Route path="/admin/departamentos" element={<DepartmentsPage />} />
              <Route path="/admin/menu" element={<MenusPage />} />
              <Route path="/admin/menus" element={<MenusPage />} />
              <Route path="/admin/reservas" element={<ReservationsPage />} />
              <Route path="/admin/reportes" element={<ReportsPage />} />
              <Route path="/admin/reports" element={<ReportsPage />} />
              <Route path="/admin/configuracion" element={<SettingsPage />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              <Route path="/admin/auditoria" element={<AuditLogsPage />} />
            </Route>

            <Route path="/" element={<Navigate to="/inicio" replace />} />
            <Route path="*" element={<div className="text-center mt-20 text-xl font-bold text-gray-700">404 - Página no encontrada</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
