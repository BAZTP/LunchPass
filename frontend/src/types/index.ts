export type Role = 'ADMIN' | 'CAFETERIA' | 'EMPLOYEE' | 'SUPERVISOR';

export interface User {
  id: string | number;
  username: string;
  name: string;
  email: string;
  role: Role;
  departmentId?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Department {
  id: string | number;
  name: string;
}

export interface MenuItem {
  id: string | number;
  name: string;
  category?: 'STARTER' | 'MAIN_COURSE' | 'VEGETARIAN' | 'SIDE' | 'DESSERT' | 'BEVERAGE' | 'SPECIAL' | string;
  description?: string;
  calories?: number;
  price?: number;
}

export interface Menu {
  id: string | number;
  date: string; // YYYY-MM-DD
  description?: string;
  items: MenuItem[];
  quota?: number;
}

export interface Reservation {
  id: string | number;
  userId?: string | number;
  menuId?: string | number;
  code: string; // e.g. LP-2026-XXXXXX
  date: string;
  status: 'PENDING' | 'CONFIRMED' | 'USED' | 'CANCELLED' | 'EXPIRED' | 'DELIVERED';
  items?: MenuItem[];
  menuItem?: MenuItem;
}

export interface QrCode {
  token: string;
  reservationId: string | number;
}

export interface ValidationResult {
  valid: boolean;
  message: string;
  status: 'VALID' | 'USED' | 'INVALID' | 'EXPIRED' | 'WRONG_DATE';
  reservation?: Reservation;
}

export interface MealDelivery {
  id: string | number;
  reservationId: string | number;
  deliveredAt: string;
  deliveredBy: string;
}

export interface Report {
  period: string;
  metrics: Record<string, any>;
}

export interface SystemSettings {
  companyName: string;
  defaultQuota: number;
  reservationSchedule: { start: string; end: string };
  deliverySchedule: { start: string; end: string };
}

export interface AuditLog {
  id: string | number;
  userId: string | number;
  action: string;
  details: string;
  timestamp: string;
}
