import React from 'react';
import { Wheat, Globe, ShieldCheck, Menu, X, ChevronRight, Moon, Sun, LogOut, User } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../App';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({ activeTab, setActiveTab, darkMode, setDarkMode }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signIn, logout, loading } = useAuth();

  const navItems = [
    { id: 'home', label: 'Mission' },
    { id: 'dashboard', label: 'Intelligence Hub' },
    { id: 'logistics', label: 'Supply Chain' },
    { id: 'resources', label: 'Farmer Portal' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-emerald-600 p-1.5 rounded-lg">
              <Wheat className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">CERES</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-emerald-600",
                  activeTab === item.id ? "text-emerald-600" : "text-gray-500 dark:text-gray-400"
                )}
              >
                {item.label}
              </button>
            ))}
            
            <div className="flex items-center gap-4 pl-4 border-l border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors text-gray-500 dark:text-gray-400"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {!loading && (
                user ? (
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-emerald-500/20" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    )}
                    <button 
                      onClick={logout}
                      className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                      title="Sign Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={signIn}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-all"
                  >
                    Sign In
                  </button>
                )
              )}
              
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="bg-gray-900 dark:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-all flex items-center gap-2"
              >
                Access Hub <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-500 dark:text-gray-400"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6 dark:text-white" /> : <Menu className="w-6 h-6 dark:text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 px-4 py-6 space-y-4"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMenuOpen(false);
              }}
              className={cn(
                "block w-full text-left text-lg font-medium",
                activeTab === item.id ? "text-emerald-600" : "text-gray-500 dark:text-gray-400"
              )}
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </header>
  );
}
