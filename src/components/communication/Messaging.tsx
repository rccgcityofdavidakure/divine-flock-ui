import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Plus
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

export const CommunicationSystem: React.FC = () => {
  const [view, setView] = useState<'messages' | 'announcements'>('messages');

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
        <button onClick={() => setView('messages')} className={cn("px-4 py-2 rounded-lg text-sm font-bold", view === 'messages' && "bg-white shadow-sm text-indigo-600")}>Messages</button>
        <button onClick={() => setView('announcements')} className={cn("px-4 py-2 rounded-lg text-sm font-bold", view === 'announcements' && "bg-white shadow-sm text-indigo-600")}>Announcements</button>
      </div>

      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="font-bold mb-4">{view === 'messages' ? 'New Message' : 'Church News'}</h3>
        {view === 'messages' ? (
          <div className="space-y-4">
            <input placeholder="Subject" className="w-full p-3 bg-slate-50 border rounded-xl" />
            <textarea placeholder="Write message..." rows={5} className="w-full p-3 bg-slate-50 border rounded-xl resize-none" />
            <button onClick={() => toast.success('Sent!')} className="bg-indigo-600 text-white px-8 py-2 rounded-xl flex items-center gap-2">
              <Send size={18} /> Send
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map(i => (
              <div key={i} className="p-4 border rounded-xl">
                <h4 className="font-bold">Sunday Service Update</h4>
                <p className="text-sm text-slate-500 mt-2">Join us for a special session this Sunday...</p>
              </div>
            ))}
            <button className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-slate-400">
              <Plus size={24} /> <span>Add News</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};