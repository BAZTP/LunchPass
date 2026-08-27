# 🍱 LunchPass — Sistema Corporativo de Reservación, Gestión y Validación QR de Almuerzos

![LunchPass Banner](https://img.shields.io/badge/LunchPass-v1.0.0-blue?style=for-the-badge&logo=spring)
![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.0-green?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-cyan?style=for-the-badge&logo=tailwindcss)

**LunchPass** es una solución web integral diseñada para la gestión eficiente de comedores corporativos. Permite a los empleados reservar su almuerzo diario, a los administradores planificar y duplicar menús variados, y al personal de cocina validar las entregas físicas en tiempo real mediante un escáner de códigos QR dinámico con protección contra duplicados.

---

## 🚀 Características Principales

- 🍱 **Menú Gastronómico Variado**: Pestañas por fecha con categorías de platos (*Entrada, Plato Principal, Vegetariano, Guarnición, Postre, Bebida*), indicación de calorías e ingredientes.
- 🎟️ **Tickets QR Únicos Encriptados**: Generación instantánea de pases de almuerzo con código único `LP-2026-XXXXXX` e impresión de QR.
- 📱 **Escáner QR para Comedor (Móvil)**: Integración con la cámara del celular (`html5-qrcode`) o ingreso manual con validación atómica y prevención de doble entrega.
- 📋 **Gestión & Duplicación de Menús**: Panel para crear menús por fecha y herramienta de **Duplicar Menú** para clonar la carta semanal a fechas futuras en 1 clic.
- 🛡️ **Control Estricto por Roles**:
  - **Empleado**: Reservar almuerzo en 1 clic, elegir destinatario registrado y ver historial de pases.
  - **Comedor**: Escanear QR en caja y confirmar entregas físicas.
  - **Gestor de Menús**: Planificar y programar cartas de comida.
  - **Administrador**: Gestión de personal, áreas, configuración de horarios y exportación de reportes a CSV.
- 🌐 **Despliegue Multi-Dispositivo**: Configuración para probar simultáneamente desde computadoras y celulares conectados a la red Wi-Fi local.

---

## 🔑 Credenciales de Prueba (Demo Access)

| Rol | Usuario | Contraseña | Funcionalidad Principal |
| :--- | :--- | :--- | :--- |
| 👤 **Empleado Registrado** | `john.doe` / `empleado` | `password` / `empleado123` | Reservar almuerzo de hoy o semana, elegir destinatario y ver QR. |
| 📱 **Personal de Comedor** | `chef.gordon` / `cafeteria` | `password` / `cafeteria123` | Escanear QR con cámara del celular y confirmar entrega física. |
| 🍱 **Gestor de Menús** | `gestor` / `supervisor` | `supervisor123` | Crear menús por fecha, añadir categorías y duplicar cartas. |
| 🛡️ **Administrador General** | `admin` | `admin123` / `adminpass` | Gestión de personal, áreas, auditoría y exportación a CSV. |

---

## 💻 Instalación y Ejecución Local

### **Requisitos Previos**
- JDK 17 o superior
- Node.js 18.x o superior
- Git

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/BAZTP/LunchPass.git
cd LunchPass
```

### **2. Iniciar el Backend (Spring Boot)**
```bash
cd backend
.\maven\apache-maven-3.9.5\bin\mvn.cmd spring-boot:run
# Servidor iniciado en http://localhost:8080
```

### **3. Iniciar el Frontend (React + Vite)**
```bash
cd frontend
npm install
npm run dev -- --host
# Aplicación iniciada en http://localhost:5173 / http://<TU_IP_LOCAL>:5173
```

---

## 📲 Despliegue en Red Local (Acceso Móvil)

Para acceder desde tu teléfono celular dentro de la misma red Wi-Fi:
1. Asegúrate de ejecutar `npx vite --host` en la carpeta `frontend`.
2. Ingresa en el navegador de tu celular a:
   `http://<TU_IP_LOCAL>:5173` (Ejemplo: `http://192.168.100.3:5173`)

---

## 📄 Licencia

Este proyecto está distribuido bajo la licencia MIT.
Desarrollado para el control y optimización de comedores corporativos.
