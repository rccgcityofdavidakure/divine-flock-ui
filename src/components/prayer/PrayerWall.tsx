import React, { useState } from 'react';
import { Heart, MessageCircle, ShieldCheck, User, Clock, Trash2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

interface PrayerRequest {
  id: string;
  author: string;
  content: string;
  date: string;
  isAnonymous: boolean;
  status: 'pending' | 'approved' | 'answered';
}

const mockRequests: PrayerRequest[] = [
  { id: '1', author: 'Sarah Jenkins', content: 'Praying for my mother who is undergoing surgery tomorrow morning. We believe in divine healing.', date: '2 hours ago', isAnonymous: false, status: 'approved' },
  { id: '2', author: 'Anonymous', content: 'Strength for a difficult financial season and wisdom for career decisions.', date: '5 hours ago', isAnonymous: true, status: 'approved' },
  { id: '3', author: 'Michael Chen', content: 'Thanksgiving for a safe travel and a successful mission trip.', date: '1 day ago', isAnonymous: false, status: 'answered' },
];

export const PrayerRequests: React.FC = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [newRequest, setNewRequest] = useState('');
  const [isAnon, setIsAnon] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequest.trim()) return;
    
    toast.success('Prayer request submitted for moderation.');
    setNewRequest('');
    setIsAnon(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prayer Wall</h1>
          <p className="text-slate-500">Share your requests and stand in faith together.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-8">
            <h3 className="font-bold text-slate-900 mb-4">Submit a Request</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea 
                value={newRequest}
                onChange={(e) => setNewRequest(e.target.value)}
                placeholder="What are you praying for?"
                rows={5}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm transition-all"
              />
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="anon" 
                  checked={isAnon}
                  onChange={(e) => setIsAnon(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="anon" className="text-xs font-medium text-slate-600">Submit anonymously</label>
              </div>
              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
              >
                <Heart size={18} />
                Submit Request
              </button>
            </form>
            
            <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
              <div className="flex items-center gap-2 text-indigo-700 mb-2">
                <ShieldCheck size={18} />
                <span className="text-sm font-bold">Moderation Note</span>
              </div>
              <p className="text-xs text-indigo-600 leading-relaxed">
                All requests are reviewed by our pastoral team before being published to the wall.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence>
            {requests.map((req, idx) => (
              <motion.div 
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                      req.isAnonymous ? "bg-slate-100 text-slate-500" : "bg-indigo-100 text-indigo-700"
                    )}>
                      {req.isAnonymous ? '?' : req.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{req.isAnonymous ? 'Anonymous' : req.author}</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                        <Clock size={10} />
                        {req.date}
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                    req.status === 'answered' ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                  )}>
                    {req.status === 'answered' ? 'Praise Report' : 'Interceding'}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed italic">"{req.content}"</p>
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                    <Heart size={14} fill="currentColor" />
                    I am praying
                  </button>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all">
                      <MessageCircle size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};