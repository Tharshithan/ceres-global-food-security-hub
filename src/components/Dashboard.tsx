import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Cell 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, 
  Map as MapIcon, Zap, Loader2, RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_CROP_DATA, MOCK_MARKET_PRICES, MOCK_ALERTS } from '../constants';
import { generateActionableInsights } from '../services/geminiService';
import { Insight } from '../types';
import ReactMarkdown from 'react-markdown';

export default function Dashboard() {
  const [insights, setInsights] = React.useState<Insight[]>([]);
  const [loading, setLoading] = React.useState(true);
  const darkMode = document.documentElement.classList.contains('dark');

  React.useEffect(() => {
    async function loadInsights() {
      setLoading(true);
      const data = await generateActionableInsights(MOCK_CROP_DATA, MOCK_MARKET_PRICES, MOCK_ALERTS);
      setInsights(data);
      setLoading(false);
    }
    loadInsights();
  }, []);

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Global Agri-Intelligence Hub</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time monitoring and predictive insights for global food systems.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live System Status: Optimal
          </span>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {MOCK_MARKET_PRICES.map((market, idx) => (
          <motion.div
            key={market.commodity}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{market.commodity}</span>
              {market.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : market.trend === 'down' ? (
                <TrendingDown className="w-4 h-4 text-rose-500" />
              ) : (
                <TrendingUp className="w-4 h-4 text-gray-400 rotate-90" />
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">${market.price.toFixed(2)}</span>
              <span className={market.change > 0 ? "text-emerald-600 dark:text-emerald-400 text-sm font-medium" : "text-rose-600 dark:text-rose-400 text-sm font-medium"}>
                {market.change > 0 ? '+' : ''}{market.change}%
              </span>
            </div>
            <div className="mt-4 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[...Array(10)].map((_, i) => ({ v: Math.random() * 10 }))}>
                  <Area type="monotone" dataKey="v" stroke={market.change > 0 ? "#10b981" : "#f43f5e"} fill={market.change > 0 ? (darkMode ? "#064e3b" : "#ecfdf5") : (darkMode ? "#4c0519" : "#fff1f2")} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Crop Health Index */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Crop Health Index by Region</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-medium bg-gray-900 dark:bg-emerald-600 text-white rounded-lg">Health</button>
                <button className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">Yield</button>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_CROP_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1f2937" : "#f3f4f6"} />
                  <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      backgroundColor: darkMode ? '#111827' : '#ffffff',
                      color: darkMode ? '#ffffff' : '#000000'
                    }}
                    cursor={{ fill: darkMode ? '#1f2937' : '#f9fafb' }}
                  />
                  <Bar dataKey="healthIndex" radius={[6, 6, 0, 0]}>
                    {MOCK_CROP_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.status === 'critical' ? '#f43f5e' : entry.status === 'warning' ? '#f59e0b' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Logistics Alerts */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Supply Chain Logistics
            </h3>
            <div className="space-y-4">
              {MOCK_ALERTS.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <div className={`p-2 rounded-xl ${
                    alert.severity === 'high' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' : 
                    alert.severity === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 
                    'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  }`}>
                    {alert.severity === 'high' ? <AlertTriangle className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">{alert.location}</h4>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl h-full sticky top-24">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" /> Actionable Insights
              </h3>
              {loading && <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />}
            </div>

            <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-300px)] custom-scrollbar pr-2">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse bg-white/5 p-4 rounded-2xl space-y-2">
                      <div className="h-4 bg-white/10 rounded w-3/4" />
                      <div className="h-3 bg-white/10 rounded w-full" />
                      <div className="h-3 bg-white/10 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : (
                insights.map((insight, idx) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border ${
                        insight.impact === 'high' ? 'border-rose-500/50 text-rose-400 bg-rose-500/10' : 
                        'border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
                      }`}>
                        {insight.impact} Impact
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">{insight.category}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-2 group-hover:text-emerald-400 transition-colors">{insight.title}</h4>
                    <div className="text-sm text-gray-400 leading-relaxed prose prose-invert prose-sm">
                      <ReactMarkdown>{insight.content}</ReactMarkdown>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <button className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                        Execute Strategy <TrendingUp className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {!loading && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                  Generate New Analysis <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
