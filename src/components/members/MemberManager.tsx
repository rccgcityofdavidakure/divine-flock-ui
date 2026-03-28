import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus,
  Mail, 
  Phone,
  MoreVertical,
  X,
  ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

const mockMembers = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890', department: 'Choir', status: 'Active', avatar: 'JD' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '234-567-8901', department: 'Youth', status: 'Active', avatar: 'JS' },
  { id: '3', firstName: 'Robert', lastName: 'Johnson', email: 'robert@example.com', phone: '345-678-9012', department: 'Media', status: 'Inactive', avatar: 'RJ' },
];

export const MemberManager: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'members' | 'volunteers'>('members');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Member registered successfully!');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{view === 'members' ? 'Member Management' : 'Volunteer Management'}</h1>
          <p className="text-slate-500">{view === 'members' ? 'View and manage your congregation members.' : 'Assign tasks and track volunteer schedules.'}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setView(view === 'members' ? 'volunteers' : 'members')}
            className="px-4 py-2.5 bg-white border rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            {view === 'members' ? 'Manage Volunteers' : 'Manage Members'}
          </button>
          <button 
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-sm"
          >
            <UserPlus size={18} />
            <span>{view === 'members' ? 'Register New Member' : 'New Task'}</span>
          </button>
        </div>
      </div>

      {view === 'members' ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, email, phone..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Member</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Department</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{member.firstName} {member.lastName}</p>
                          <p className="text-xs text-slate-500">ID: #{member.id.padStart(4, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Mail size={12} /> {member.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Phone size={12} /> {member.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {member.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex px-2.5 py-1 rounded-full text-xs font-medium",
                        member.status === 'Active' ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                      )}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { task: 'Ushering (Sunday Morning)', volunteer: 'Michael Chen', time: '8:00 AM', status: 'Assigned' },
            { task: 'Media Setup', volunteer: 'Sarah Wilson', time: '7:30 AM', status: 'Pending' },
            { task: 'Youth Mentoring', volunteer: 'Pastor Wilson', time: '5:00 PM', status: 'Completed' },
          ].map((v, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <ClipboardList size={20} />
                </div>
                <span className={cn(
                  "text-[10px] font-bold px-2 py-1 rounded-full",
                  v.status === 'Completed' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                )}>{v.status}</span>
              </div>
              <h3 className="font-bold text-slate-900">{v.task}</h3>
              <p className="text-sm text-slate-500 mt-1">{v.volunteer} • {v.time}</p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 text-xs font-bold py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">Edit</button>
                <button className="flex-1 text-xs font-bold py-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">Message</button>
              </div>
            </div>
          ))}
          <button className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 group hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
            <Plus size={24} className="text-slate-400 group-hover:text-indigo-600 mb-2" />
            <span className="font-bold text-slate-400 group-hover:text-indigo-600">Create Task</span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowAddForm(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden p-8"
            >
              <h2 className="text-xl font-bold mb-6">Register New Member</h2>
              <form onSubmit={handleAddMember} className="grid grid-cols-2 gap-4">
                <input placeholder="First Name" className="p-3 bg-slate-50 border rounded-xl" required />
                <input placeholder="Last Name" className="p-3 bg-slate-50 border rounded-xl" required />
                <input placeholder="Email" type="email" className="p-3 bg-slate-50 border rounded-xl" required />
                <input placeholder="Phone" className="p-3 bg-slate-50 border rounded-xl" required />
                <select className="p-3 bg-slate-50 border rounded-xl col-span-2">
                  <option>Choir</option>
                  <option>Youth</option>
                  <option>Media</option>
                </select>
                <div className="col-span-2 flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2 border rounded-xl">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl">Register</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Plus = ({ size, className }: { size: number, className?: string }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>;