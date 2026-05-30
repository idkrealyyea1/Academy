import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { assignments as initialAssignments } from '@/data/assignments';
import { courses } from '@/data/courses';
import { ClipboardList, Clock, CheckCircle, Star, Download, Send } from 'lucide-react';

type Status = 'all' | 'pending' | 'submitted' | 'graded';

const statusLabel: Record<string, string> = { pending: 'معلق', submitted: 'مُسلَّم', graded: 'تمّ التصحيح' };
const statusColor: Record<string, string> = {
  pending: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
  submitted: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  graded: 'bg-green-400/10 text-green-400 border-green-400/20',
};

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<Status>('all');
  const [submitted, setSubmitted] = useState<Set<string>>(new Set());

  const assignmentData = initialAssignments.map(a => ({
    ...a,
    status: submitted.has(a.id) ? 'submitted' as const : a.status,
  }));

  const filtered = filter === 'all' ? assignmentData : assignmentData.filter(a => a.status === filter);
  const courseMap = Object.fromEntries(courses.map(c => [c.id, c.title]));

  const counts = {
    all: assignmentData.length,
    pending: assignmentData.filter(a => a.status === 'pending').length,
    submitted: assignmentData.filter(a => a.status === 'submitted').length,
    graded: assignmentData.filter(a => a.status === 'graded').length,
  };

  return (
    <DashboardLayout title="الواجبات والمهام">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {(['all', 'pending', 'submitted', 'graded'] as Status[]).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              data-testid={`filter-${s}`}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                filter === s
                  ? 'bg-primary text-white border-primary'
                  : 'bg-card text-muted-foreground border-border hover:bg-secondary'
              }`}
            >
              {s === 'all' ? 'الكل' : statusLabel[s]} ({counts[s]})
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(a => {
            const course = courseMap[a.courseId] ?? '';
            return (
              <div key={a.id} className="bg-card border border-border rounded-2xl p-5" data-testid={`card-assignment-${a.id}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ClipboardList className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">{a.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{a.description}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-lg">{course}</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" /> تسليم: {a.dueDate}
                        </span>
                        {a.status === 'graded' && a.grade !== undefined && (
                          <span className="flex items-center gap-1 text-xs text-green-400">
                            <Star className="w-3.5 h-3.5" /> الدرجة: {a.grade}/20
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${statusColor[a.status]}`}>
                      {statusLabel[a.status]}
                    </span>
                    <div className="flex gap-2">
                      <a href={a.fileUrl} className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground transition-colors" title="تحميل الواجب">
                        <Download className="w-4 h-4" />
                      </a>
                      {a.status === 'pending' && (
                        <button
                          onClick={() => setSubmitted(prev => new Set([...prev, a.id]))}
                          data-testid={`button-submit-${a.id}`}
                          className="flex items-center gap-1.5 text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                          <Send className="w-3.5 h-3.5" /> تسليم
                        </button>
                      )}
                      {a.status === 'submitted' && (
                        <span className="flex items-center gap-1 text-xs text-blue-400">
                          <CheckCircle className="w-3.5 h-3.5" /> تمّ التسليم
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">لا توجد واجبات في هذه الفئة</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
