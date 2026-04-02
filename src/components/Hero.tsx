import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe2, BarChart3, Users2, ShieldCheck } from 'lucide-react';

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-wider uppercase mb-6 border border-emerald-100 dark:border-emerald-800">
              <Globe2 className="w-3 h-3" /> Solving Global Food Security
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.1]">
              Intelligence for a <span className="text-emerald-600">Resilient</span> Food System.
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Ceres bridges the gap between satellite crop intelligence, market forecasting, and logistics to ensure no community is left behind in the face of climate change.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 flex items-center justify-center gap-2"
              >
                Explore the Hub <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-2xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                Read Whitepaper
              </button>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: BarChart3,
              title: "Predictive Analytics",
              desc: "AI-driven yield forecasting using multi-spectral satellite imagery and historical climate data."
            },
            {
              icon: Users2,
              title: "Smallholder Empowerment",
              desc: "Direct access to micro-financing, climate-resilient seeds, and fair market pricing for local farmers."
            },
            {
              icon: ShieldCheck,
              title: "Supply Chain Resilience",
              desc: "Real-time logistics coordination to reduce post-harvest loss and optimize surplus redistribution."
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
