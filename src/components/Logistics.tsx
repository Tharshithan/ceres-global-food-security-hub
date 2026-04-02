import React from 'react';
import { motion } from 'motion/react';
import { 
  Truck, Ship, Plane, MapPin, 
  ArrowRight, CheckCircle2, Clock, 
  AlertCircle, Search, Filter
} from 'lucide-react';
import { MOCK_ALERTS } from '../constants';

export default function Logistics() {
  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Supply Chain Coordination</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Global logistics tracking and surplus redistribution network.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Map Placeholder */}
        <div className="lg:col-span-3">
          <div className="relative bg-gray-100 dark:bg-gray-900 rounded-[2.5rem] h-[600px] overflow-hidden border border-gray-200 dark:border-gray-800 shadow-inner group">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/1920/1080?blur=2')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000" />
            
            {/* Simulated Map Markers */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1/4 left-1/3 p-2 bg-rose-500 rounded-full shadow-lg shadow-rose-500/50 cursor-pointer"
            >
              <div className="w-3 h-3 bg-white rounded-full animate-ping" />
            </motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-1/2 left-2/3 p-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50 cursor-pointer"
            >
              <div className="w-3 h-3 bg-white rounded-full" />
            </motion.div>
            
            {/* Map Overlay UI */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-white/20 dark:border-gray-800 pointer-events-auto w-64">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search route..." className="bg-transparent text-sm w-full focus:outline-none dark:text-white" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Active Routes</span>
                    <span className="text-emerald-600 dark:text-emerald-400">1,242</span>
                  </div>
                  <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-3/4" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pointer-events-auto">
                <button className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" /></button>
                <button className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" /></button>
              </div>
            </div>

            {/* Bottom Legend */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-4 pointer-events-auto overflow-x-auto pb-2 no-scrollbar">
              {[
                { label: 'Grain Shipments', count: 452, icon: Ship },
                { label: 'Emergency Aid', count: 128, icon: Plane },
                { label: 'Local Distribution', count: 892, icon: Truck },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/90 dark:bg-gray-900/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-white/20 dark:border-gray-800 flex items-center gap-4 min-w-[200px]">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                    <item.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{item.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logistics Feed */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Recent Activity
            </h3>
            <div className="space-y-6">
              {MOCK_ALERTS.map((alert, idx) => (
                <div key={alert.id} className="relative pl-6 pb-6 border-l border-gray-100 dark:border-gray-800 last:pb-0">
                  <div className={`absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full ${
                    alert.severity === 'high' ? 'bg-rose-500' : 'bg-emerald-500'
                  }`} />
                  <div className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-1">{new Date(alert.timestamp).toLocaleTimeString()}</div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{alert.location}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{alert.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-600 p-6 rounded-3xl shadow-lg shadow-emerald-200 text-white">
            <h3 className="font-bold mb-4">Request Redistribution</h3>
            <p className="text-emerald-100 text-sm mb-6">Connect surplus harvests with regions in need through our verified logistics partners.</p>
            <button className="w-full py-3 bg-white text-emerald-600 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
              Open Logistics Portal <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
