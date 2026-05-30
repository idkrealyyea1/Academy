import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { announcements } from '@/data/announcements';
import { Bell, AlertTriangle, Calendar, Info } from 'lucide-react';

type Filter = 'all' | 'urgent' | 'info' | 'event';

const typeConfig = {
  urgent: { label: 'عاجل', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', icon: AlertTriangle },
  info: { label: 'معلومات', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', icon: Info },
  event: { label: 'فعالية', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', icon: Calendar },
};

export default function AnnouncementsPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const filtered = filter === 'all' ? announcements : announcements.filter(a => a.type === filter);

  return (
    <DashboardLayout title="الإعلانات والتنبيهات">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {(['all', 'urgent', 'info', 'event'] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              data-testid={`filter-announcement-${f}`}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                filter === f
                  ? 'bg-primary text-white border-primary'
                  : 'bg-card text-muted-foreground border-border hover:bg-secondary'
              }`}
            >
              {f === 'all' ? 'الكل' : typeConfig[f].label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(a => {
            const conf = typeConfig[a.type];
            const Icon = conf.icon;
            return (
              <div
                key={a.id}
                data-testid={`card-announcement-${a.id}`}
                className={`bg-card border rounded-2xl p-5 ${!a.isRead ? 'border-primary/30' : 'border-border'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${conf.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon className={`w-5 h-5 ${conf.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-foreground">{a.title}</p>
                      {!a.isRead && (
                        <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full font-medium">جديد</span>
                      )}
                      <span className={`text-xs border px-2 py-0.5 rounded-full ${conf.color} ${conf.bg} ${conf.border}`}>
                        {conf.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{a.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">{a.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
