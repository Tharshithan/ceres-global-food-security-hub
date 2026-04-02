import { CropData, MarketPrice, LogisticsAlert } from './types';

export const MOCK_CROP_DATA: CropData[] = [
  { region: 'Sub-Saharan Africa', healthIndex: 68, yieldForecast: 2.4, lastUpdated: '2026-04-01', status: 'warning' },
  { region: 'Southeast Asia', healthIndex: 82, yieldForecast: 4.1, lastUpdated: '2026-04-01', status: 'optimal' },
  { region: 'Latin America', healthIndex: 45, yieldForecast: 1.8, lastUpdated: '2026-04-01', status: 'critical' },
  { region: 'South Asia', healthIndex: 74, yieldForecast: 3.2, lastUpdated: '2026-04-01', status: 'optimal' },
  { region: 'Middle East', healthIndex: 31, yieldForecast: 0.9, lastUpdated: '2026-04-01', status: 'critical' },
];

export const MOCK_MARKET_PRICES: MarketPrice[] = [
  { commodity: 'Wheat', price: 342.50, change: 2.4, trend: 'up' },
  { commodity: 'Rice', price: 415.20, change: -1.2, trend: 'down' },
  { commodity: 'Maize', price: 289.80, change: 0.5, trend: 'stable' },
  { commodity: 'Soybeans', price: 512.40, change: 4.1, trend: 'up' },
];

export const MOCK_ALERTS: LogisticsAlert[] = [
  {
    id: '1',
    type: 'delay',
    location: 'Port of Mombasa',
    severity: 'medium',
    description: 'Congestion at terminal B affecting grain offloading.',
    timestamp: '2026-04-02T08:30:00Z',
  },
  {
    id: '2',
    type: 'surplus',
    location: 'Punjab Region',
    severity: 'low',
    description: 'Bumper harvest in wheat; storage capacity at 95%.',
    timestamp: '2026-04-02T09:15:00Z',
  },
  {
    id: '3',
    type: 'shortage',
    location: 'Northeastern Brazil',
    severity: 'high',
    description: 'Severe drought impacting staple crop availability.',
    timestamp: '2026-04-02T10:00:00Z',
  },
];
