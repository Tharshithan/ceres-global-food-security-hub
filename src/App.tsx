import React, { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Logistics from './components/Logistics';
import Resources from './components/Resources';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';

// Auth Context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Hero onStart={() => setActiveTab('dashboard')} />;
      case 'dashboard':
        return <Dashboard />;
      case 'logistics':
        return <Logistics />;
      case 'resources':
        return <Resources />;
      default:
        return <Hero onStart={() => setActiveTab('dashboard')} />;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logout }}>
      <div className="min-h-screen bg-white dark:bg-gray-950 font-sans selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-300">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}
