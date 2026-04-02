import React from 'react';
import { Wheat, Mail, Twitter, Github, Linkedin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <Wheat className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">CERES</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Empowering global food security through data-driven intelligence and collaborative logistics. A mission to feed the future.
            </p>
            <div className="flex gap-4">
              <Twitter className="w-5 h-5 text-gray-400 hover:text-emerald-600 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-emerald-600 cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-gray-400 hover:text-emerald-600 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">Intelligence Hub</li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">Supply Chain Map</li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">Farmer Portal</li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">Market Forecasting</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">Impact Reports</li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">API Documentation</li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">Case Studies</li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">Climate Data</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Join the Mission</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Get the latest updates on global food security initiatives.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white"
              />
              <button className="bg-gray-900 dark:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">© 2026 Ceres Global Food Security Hub. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-400 dark:text-gray-500">
            <span className="hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
