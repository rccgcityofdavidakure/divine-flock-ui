import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Search, 
  FileDown
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

const mockAttendance = [
  { id: '1', name: 'John Doe', status: 'Present' },
  { id: '2', name: 'Jane Smith', status: 'Absent' },
  { id: '3', name: 'Robert Johnson', status: 'Present' },
];

export const AttendanceTracker: React.FC = () => {
  const [attendance, setAttendance] = useState(mockAttendance);

  const toggleStatus = (id: string) => {
    setAttendance(prev => prev.map(member => {
      if (member.id === id) {
        return { ...member, status: member.status === 'Present' ? 'Absent' : 'Present' };
      }
      return member;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Attendance Tracking</h1>
          <p className="text-slate-500">Record and monitor service attendance.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl text-sm font-semibold">
            <FileDown size={18} />
            <span>Export</span>
          </button>
          <button onClick={() => toast.success('Saved!')} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold">
            Save
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {attendance.map((member) => (
            <div 
              key={member.id} 
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => toggleStatus(member.id)}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                  member.status === 'Present' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                )}>
                  {member.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{member.name}</p>
                </div>
              </div>
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                member.status === 'Present' ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"
              )}>
                {member.status === 'Present' && <CheckCircle2 size={14} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};