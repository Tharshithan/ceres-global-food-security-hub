import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, Droplets, Landmark, 
  BookOpen, Phone, ShieldCheck,
  ArrowRight, ChevronRight, Search,
  UserPlus, User, MapPin, Scale, 
  Mail, PhoneCall, Trash2, Plus, X,
  Lock
} from 'lucide-react';
import { cn } from '../lib/utils';
import { FarmerProfile } from '../types';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, where, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { useAuth } from '../App';

export default function Resources() {
  const { user, signIn } = useAuth();
  const [profiles, setProfiles] = useState<FarmerProfile[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    farmName: '',
    location: '',
    crops: '',
    contactEmail: '',
    contactPhone: '',
    farmSize: ''
  });

  // Real-time listener for profiles
  useEffect(() => {
    if (!user) {
      setProfiles([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'farmerProfiles'), 
      where('uid', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const profileData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FarmerProfile[];
      setProfiles(profileData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const newProfile = {
        uid: user.uid,
        name: formData.name,
        farmName: formData.farmName,
        location: formData.location,
        crops: formData.crops.split(',').map(c => c.trim()),
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        farmSize: parseFloat(formData.farmSize),
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'farmerProfiles'), newProfile);
      
      setFormData({
        name: '',
        farmName: '',
        location: '',
        crops: '',
        contactEmail: '',
        contactPhone: '',
        farmSize: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  const deleteProfile = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'farmerProfiles', id));
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Farmer Empowerment Portal</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Direct access to essential resources for smallholder resilience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[
          {
            icon: Sprout,
            title: "Climate-Resilient Seeds",
            desc: "Access drought-resistant and high-yield seed varieties optimized for your specific micro-climate.",
            color: "emerald"
          },
          {
            icon: Landmark,
            title: "Micro-Financing",
            desc: "Fair-interest loans and crop insurance tailored for smallholder farmers with flexible repayment.",
            color: "blue"
          },
          {
            icon: Droplets,
            title: "Smart Irrigation",
            desc: "Low-cost sensor kits and water management strategies to optimize resource usage during dry spells.",
            color: "cyan"
          },
          {
            icon: BookOpen,
            title: "Knowledge Base",
            desc: "Localized farming techniques, pest management guides, and regenerative agriculture courses.",
            color: "amber"
          },
          {
            icon: Phone,
            title: "Expert Advisory",
            desc: "24/7 access to agronomists and climate experts via SMS, voice, or video consultation.",
            color: "rose"
          },
          {
            icon: ShieldCheck,
            title: "Market Access",
            desc: "Direct-to-consumer and institutional buyer connections to ensure fair pricing for your harvest.",
            color: "indigo"
          }
        ].map((resource, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group cursor-pointer"
          >
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
              resource.color === 'emerald' && "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
              resource.color === 'blue' && "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
              resource.color === 'cyan' && "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
              resource.color === 'amber' && "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
              resource.color === 'rose' && "bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
              resource.color === 'indigo' && "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
            )}>
              <resource.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{resource.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{resource.desc}</p>
            <div className={cn(
              "flex items-center gap-2 text-sm font-bold",
              resource.color === 'emerald' && "text-emerald-600 dark:text-emerald-400",
              resource.color === 'blue' && "text-blue-600 dark:text-blue-400",
              resource.color === 'cyan' && "text-cyan-600 dark:text-cyan-400",
              resource.color === 'amber' && "text-amber-600 dark:text-amber-400",
              resource.color === 'rose' && "text-rose-600 dark:text-rose-400",
              resource.color === 'indigo' && "text-indigo-600 dark:text-indigo-400",
            )}>
              Learn More <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Farmer Profiles Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Farmer Profiles</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your digital identity and farm records.</p>
          </div>
          {user && (
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20"
            >
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm ? 'Cancel' : 'Register Farm'}
            </button>
          )}
        </div>

        <AnimatePresence>
          {showForm && user && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                <form onSubmit={handleAddProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      type="text" 
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white" 
                      placeholder="Jane Smith" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Farm Name</label>
                    <input 
                      required
                      value={formData.farmName}
                      onChange={(e) => setFormData({...formData, farmName: e.target.value})}
                      type="text" 
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white" 
                      placeholder="Green Valley Acres" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</label>
                    <input 
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      type="text" 
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white" 
                      placeholder="Nairobi, Kenya" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Farm Size (Hectares)</label>
                    <input 
                      required
                      value={formData.farmSize}
                      onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
                      type="number" 
                      step="0.1"
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white" 
                      placeholder="5.0" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Crops (comma separated)</label>
                    <input 
                      required
                      value={formData.crops}
                      onChange={(e) => setFormData({...formData, crops: e.target.value})}
                      type="text" 
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white" 
                      placeholder="Wheat, Maize, Beans" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Email</label>
                    <input 
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                      type="email" 
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white" 
                      placeholder="jane@example.com" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20">
                      Create Profile
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!user ? (
            <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-gray-800">
              <Lock className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium mb-6">Sign in to manage your digital farm records.</p>
              <button 
                onClick={signIn}
                className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20"
              >
                Sign In with Google
              </button>
            </div>
          ) : profiles.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-gray-800">
              <User className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">No profiles registered yet. Start by adding your farm.</p>
            </div>
          ) : (
            profiles.map((profile) => (
              <motion.div
                key={profile.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <button 
                    onClick={() => deleteProfile(profile.id)}
                    className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{profile.name}</h4>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-4">{profile.farmName}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4" /> {profile.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Scale className="w-4 h-4" /> {profile.farmSize} Hectares
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Mail className="w-4 h-4" /> {profile.contactEmail}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profile.crops.map((crop, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                      {crop}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Interactive Form Section */}
      <div className="bg-gray-900 dark:bg-emerald-950/20 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative border border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 blur-3xl -z-0" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">Apply for the 2026 Resilience Grant</h2>
            <p className="text-gray-400 text-lg mb-8">
              We are providing $50M in direct grants to smallholder cooperatives implementing regenerative practices.
            </p>
            <ul className="space-y-4 mb-10">
              {['No collateral required', 'Technical support included', 'Rapid 48-hour approval'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-5 h-5" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Region</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none">
                    <option className="bg-gray-900">Sub-Saharan Africa</option>
                    <option className="bg-gray-900">Southeast Asia</option>
                    <option className="bg-gray-900">Latin America</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Farm Size (Hectares)</label>
                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="2.5" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Primary Crop</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="Maize, Wheat, etc." />
              </div>
              <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-900/20">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
