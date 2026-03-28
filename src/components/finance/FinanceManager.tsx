import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  Download
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { formatCurrency, cn } from '../../lib/utils';
import { toast } from 'sonner';

const incomeTrend = [
  { week: 'W1', amount: 12000 },
  { week: 'W2', amount: 15000 },
  { week: 'W3', amount: 9000 },
  { week: 'W4', amount: 18000 },
];

export const FinanceManager: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Finance</h1>
        <button onClick={() => toast.success('Transaction Recorded')} className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2">
          <Plus size={18} /> Record Giving
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-sm text-slate-500">Total Income</p>
          <h3 className="text-2xl font-bold">{formatCurrency(29300)}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-sm text-slate-500">Total Expenses</p>
          <h3 className="text-2xl font-bold text-rose-600">{formatCurrency(14200)}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-sm text-slate-500">Net Balance</p>
          <h3 className="text-2xl font-bold text-indigo-600">{formatCurrency(15100)}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border shadow-sm h-[350px]">
        <h3 className="font-bold mb-6">Weekly Income</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={incomeTrend}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};