import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Overview } from './components/dashboard/Overview';
import { MemberManager } from './components/members/MemberManager';
import { AttendanceTracker } from './components/attendance/AttendanceTracker';
import { FinanceManager } from './components/finance/FinanceManager';
import { EventCalendar } from './components/events/EventCalendar';
import { CommunicationSystem } from './components/communication/Messaging';
import { SermonArchive } from './components/media/SermonArchive';
import { PrayerRequests } from './components/prayer/PrayerWall';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState<'Admin' | 'Pastor' | 'Leader' | 'Member'>('Admin');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Overview />;
      case 'members': return <MemberManager />;
      case 'attendance': return <AttendanceTracker />;
      case 'finance': return <FinanceManager />;
      case 'events': return <EventCalendar />;
      case 'communication': return <CommunicationSystem />;
      case 'sermons': return <SermonArchive />;
      case 'prayer': return <PrayerRequests />;
      default: return <Overview />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-indigo-200">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome to GraceHub</h1>
            <p className="text-slate-500 text-sm mt-1">Please sign in to your account</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <input type="email" placeholder="admin@gracehub.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <button 
              onClick={() => setIsAuthenticated(true)}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 mt-2"
            >
              Sign In
            </button>
            <div className="text-center">
              <button className="text-sm font-semibold text-indigo-600 hover:underline">Forgot password?</button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} />
      
      <main className="lg:ml-64 min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default App;