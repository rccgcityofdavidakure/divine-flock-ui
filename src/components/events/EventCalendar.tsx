import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock
} from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { cn } from '../../lib/utils';

export const EventCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl"><Plus size={18} /></button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b">
          <h2 className="text-lg font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
          <div className="flex gap-2">
            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-2 border rounded-lg"><ChevronLeft size={20} /></button>
            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-2 border rounded-lg"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b bg-slate-50/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-2 text-center text-xs font-bold text-slate-500">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 h-[500px]">
          {days.map((day, i) => (
            <div key={i} className={cn(
              "border-r border-b p-2",
              !isSameMonth(day, currentDate) && "bg-slate-50/30"
            )}>
              <span className={cn(
                "inline-flex w-7 h-7 text-xs items-center justify-center rounded-full",
                isToday(day) && "bg-indigo-600 text-white"
              )}>
                {format(day, 'd')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};