import React, { useState } from 'react';
import { 
  PlayCircle, 
  Download,
  Calendar,
  Clock
} from 'lucide-react';
import { cn } from '../../lib/utils';

const mockSermons = [
  { id: '1', title: 'The Power of Faith', speaker: 'Pastor Wilson', date: 'Oct 22', duration: '45m', thumbnail: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9a87fbc7-271e-4f2b-a2a3-5ba915e1d93b/sermon-thumbnail-1-a0828446-1774704326070.webp' },
  { id: '2', title: 'Purposeful Life', speaker: 'Pastor Jenkins', date: 'Oct 15', duration: '38m', thumbnail: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9a87fbc7-271e-4f2b-a2a3-5ba915e1d93b/sermon-thumbnail-2-957eaeae-1774704326157.webp' },
];

export const SermonArchive: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sermon Archive</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSermons.map(s => (
          <div key={s.id} className="bg-white rounded-2xl border overflow-hidden group">
            <div className="relative h-48">
              <img src={s.thumbnail} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle className="text-white" size={48} />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{s.title}</h3>
              <p className="text-sm text-slate-500">{s.speaker}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t text-xs text-slate-400">
                <span className="flex items-center gap-1"><Calendar size={12} /> {s.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {s.duration}</span>
                <Download size={14} className="cursor-pointer hover:text-indigo-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};