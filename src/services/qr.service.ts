import type { QRCode, QRStatistics, QRAnalytics } from 'src/shared/types/models';

// Interface Segregation Principle - Separamos las responsabilidades
export interface IQRStatisticsService {
  getStatistics(): Promise<QRStatistics>;
  getAnalytics(): Promise<QRAnalytics>;
}

export interface IQRDataService {
  getQRCodes(): Promise<QRCode[]>;
  getQRCodeById(id: string): Promise<QRCode | null>;
  searchQRCodes(query: string): Promise<QRCode[]>;
  getUniquePurposes(): Promise<string[]>;
  getUniqueTypes(): Promise<string[]>;
}

// Single Responsibility Principle - Servicio solo para estadísticas
export class QRStatisticsService implements IQRStatisticsService {
  getStatistics(): Promise<QRStatistics> {
    // Simulación de datos - en producción vendría de una API
    return Promise.resolve({
      qrGenerated: {
        total: 7,
        changeFromPrevious: 3,
      },
      activeVisitors: {
        total: 2,
        changeFromPrevious: 1,
      },
      todayAccess: {
        total: 4,
        changeFromPrevious: 2,
      },
      usageRate: {
        percentage: 71,
        changeFromPrevious: 5,
      },
    });
  }

  getAnalytics(): Promise<QRAnalytics> {
    return Promise.resolve({
      usageByType: {
        visitante: { count: 3, percentage: 42.9 },
        entrega: { count: 2, percentage: 28.6 },
        servicio: { count: 1, percentage: 14.3 },
        emergencia: { count: 1, percentage: 14.3 },
      },
      statusDistribution: {
        activos: { count: 2, percentage: 28.6 },
        usados: { count: 3, percentage: 42.9 },
        expirados: { count: 2, percentage: 28.6 },
      },
    });
  }
}

// Single Responsibility Principle - Servicio solo para datos de QR
export class QRDataService implements IQRDataService {
  private mockData: QRCode[] = [
    {
      id: 'QR-170312345679',
      name: 'María García López',
      type: 'visitante',
      purpose: 'Visita familiar',
      phone: '+52 55 1234 5678',
      status: 'usado',
      createdAt: new Date('2024-12-15T03:45:00'),
      expiresAt: new Date('2024-12-15T16:00:00'),
      usedAt: new Date('2024-12-15T04:15:00'),
      accessRecords: [
        {
          id: '1',
          type: 'entrada',
          location: 'Entrada principal',
          timestamp: new Date('2024-12-15T04:15:00'),
        },
        {
          id: '2',
          type: 'salida',
          location: 'Entrada principal',
          timestamp: new Date('2024-12-15T08:30:00'),
        },
      ],
    },
    {
      id: 'QR-170312345798',
      name: 'Juan Pérez - DHL',
      type: 'entrega',
      purpose: 'Entrega de paquete',
      phone: '+52 55 9876 5432',
      vehicle: 'ABC-123-XYZ',
      status: 'usado',
      createdAt: new Date('2024-12-14T01:30:00'),
      expiresAt: new Date('2024-12-14T12:00:00'),
      usedAt: new Date('2024-12-14T03:20:00'),
      accessRecords: [
        {
          id: '3',
          type: 'entrada',
          location: 'Entrada principal',
          timestamp: new Date('2024-12-14T03:20:00'),
        },
      ],
    },
    {
      id: 'QR-170312345801',
      name: 'Carlos Mendoza',
      type: 'visitante',
      purpose: 'Reunión de negocios',
      phone: '+52 55 2468 1357',
      status: 'activo',
      createdAt: new Date('2024-12-15T09:00:00'),
      expiresAt: new Date('2024-12-15T18:00:00'),
      accessRecords: [],
    },
    {
      id: 'QR-170312345802',
      name: 'Ana Rodriguez - Técnico HVAC',
      type: 'servicio',
      purpose: 'Servicio ',
      phone: '+52 55 3579 2468',
      vehicle: 'XYZ-789-ABC',
      status: 'expirado',
      createdAt: new Date('2024-12-13T08:00:00'),
      expiresAt: new Date('2024-12-13T17:00:00'),
      accessRecords: [],
    },
    {
      id: 'QR-170312345803',
      name: 'Dr. Patricia Salinas',
      type: 'servicio',
      purpose: 'Servicio',
      phone: '+52 55 1111 2222',
      status: 'usado',
      createdAt: new Date('2024-12-14T14:30:00'),
      expiresAt: new Date('2024-12-14T20:30:00'),
      usedAt: new Date('2024-12-14T14:35:00'),
      accessRecords: [
        {
          id: '4',
          type: 'entrada',
          location: 'Entrada principal',
          timestamp: new Date('2024-12-14T14:35:00'),
        },
        {
          id: '5',
          type: 'salida',
          location: 'Entrada principal',
          timestamp: new Date('2024-12-14T16:45:00'),
        },
      ],
    },
    {
      id: 'QR-170312345804',
      name: 'Roberto Silva - Amazon',
      type: 'entrega',
      purpose: 'Entrega de paquetes',
      phone: '+52 55 4444 5555',
      vehicle: 'DEF-456-GHI',
      status: 'activo',
      createdAt: new Date('2024-12-15T10:30:00'),
      expiresAt: new Date('2024-12-15T14:30:00'),
      accessRecords: [
        {
          id: '6',
          type: 'entrada',
          location: 'Entrada principal',
          timestamp: new Date('2024-12-15T10:35:00'),
        },
      ],
    },
    {
      id: 'QR-170312345805',
      name: 'Luis Martinez',
      type: 'visitante',
      purpose: 'Visita social',
      phone: '+52 55 6666 7777',
      status: 'expirado',
      createdAt: new Date('2024-12-12T16:00:00'),
      expiresAt: new Date('2024-12-12T22:00:00'),
      accessRecords: [],
    },
  ];

  async getQRCodes(): Promise<QRCode[]> {
    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...this.mockData];
  }

  async getQRCodeById(id: string): Promise<QRCode | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.mockData.find((qr) => qr.id === id) || null;
  }

  async searchQRCodes(query: string): Promise<QRCode[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const lowercaseQuery = query.toLowerCase();
    return this.mockData.filter(
      (qr) =>
        qr.name.toLowerCase().includes(lowercaseQuery) ||
        qr.purpose.toLowerCase().includes(lowercaseQuery) ||
        qr.id.toLowerCase().includes(lowercaseQuery),
    );
  }

  async getUniquePurposes(): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const purposes = this.mockData.map((qr) => qr.purpose);
    return [...new Set(purposes)];
  }

  async getUniqueTypes(): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const types = this.mockData.map((qr) => qr.type);
    const uniqueTypes = [...new Set(types)];
    return uniqueTypes.map((type) => type.charAt(0).toUpperCase() + type.slice(1));
  }
}

// Dependency Inversion Principle - Factory para crear servicios
export class QRServiceFactory {
  static createStatisticsService(): IQRStatisticsService {
    return new QRStatisticsService();
  }

  static createDataService(): IQRDataService {
    return new QRDataService();
  }
}
