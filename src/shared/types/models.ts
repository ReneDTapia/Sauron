export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'resident' | 'manager';
  avatar?: string;
}

export interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

export interface Meta {
  totalCount: number;
}

// QR History Types
export interface QRCode {
  id: string;
  name: string;
  type: 'visitante' | 'entrega' | 'servicio' | 'emergencia';
  purpose: string;
  phone: string;
  vehicle?: string;
  status: 'activo' | 'usado' | 'expirado';
  createdAt: Date;
  expiresAt: Date;
  usedAt?: Date;
  accessRecords: AccessRecord[];
}

export interface AccessRecord {
  id: string;
  type: 'entrada' | 'salida';
  location: string;
  timestamp: Date;
}

export interface QRStatistics {
  qrGenerated: {
    total: number;
    changeFromPrevious: number;
  };
  activeVisitors: {
    total: number;
    changeFromPrevious: number;
  };
  todayAccess: {
    total: number;
    changeFromPrevious: number;
  };
  usageRate: {
    percentage: number;
    changeFromPrevious: number;
  };
}

export interface QRAnalytics {
  usageByType: {
    visitante: { count: number; percentage: number };
    entrega: { count: number; percentage: number };
    servicio: { count: number; percentage: number };
    emergencia: { count: number; percentage: number };
  };
  statusDistribution: {
    activos: { count: number; percentage: number };
    usados: { count: number; percentage: number };
    expirados: { count: number; percentage: number };
  };
}
