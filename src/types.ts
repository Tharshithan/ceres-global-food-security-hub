export interface CropData {
  region: string;
  healthIndex: number; // 0-100
  yieldForecast: number; // tons/hectare
  lastUpdated: string;
  status: 'optimal' | 'warning' | 'critical';
}

export interface MarketPrice {
  commodity: string;
  price: number;
  change: number; // percentage
  trend: 'up' | 'down' | 'stable';
}

export interface LogisticsAlert {
  id: string;
  type: 'delay' | 'surplus' | 'shortage';
  location: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  timestamp: string;
}

export interface Insight {
  id: string;
  title: string;
  content: string;
  category: 'climate' | 'market' | 'logistics';
  impact: 'high' | 'medium' | 'low';
}

export interface FarmerProfile {
  id: string;
  name: string;
  farmName: string;
  location: string;
  crops: string[];
  contactEmail: string;
  contactPhone: string;
  farmSize: number;
  createdAt: string;
}
