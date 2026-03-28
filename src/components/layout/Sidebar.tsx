import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  PlaySquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Heart,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Pastor', 'Leader', 'Member'] },
    { id: 'members', label: 'Members', icon: Users, roles: ['Admin', 'Pastor', 'Leader'] },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, roles: ['Admin', 'Pastor', 'Leader'] },
    { id: 'finance', label: 'Finance', icon: DollarSign, roles: ['Admin', 'Pastor'] },
    { id: 'events', label: 'Events & Services', icon: Calendar, roles: ['Admin', 'Pastor', 'Leader', 'Member'] },
    { id: 'communication', label: 'Communication', icon: MessageSquare, roles: ['Admin', 'Pastor', 'Leader'] },
    { id: 'sermons', label: 'Sermon Archive', icon: PlaySquare, roles: ['Admin', 'Pastor', 'Leader', 'Member'] },
    { id: 'prayer', label: 'Prayer Wall', icon: Heart, roles: ['Admin', 'Pastor', 'Leader', 'Member'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-md shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="flex items-center gap-3 text-indigo-600">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <LayoutDashboard size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">GraceHub</span>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  activeTab === item.id 
                    ? "bg-indigo-50 text-indigo-600" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {activeTab === item.id && <ChevronRight size={16} className="ml-auto" />}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-lg bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                {userRole[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 truncate">Admin User</p>
                <p className="text-[10px] text-slate-500 truncate">{userRole}</p>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <Settings size={16} />
              </button>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};