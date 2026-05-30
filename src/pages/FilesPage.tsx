import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { studyFiles } from '@/data/files';
import { courses } from '@/data/courses';
import { FileText, Download, File } from 'lucide-react';

const typeIcon: Record<string, string> = { pdf: 'text-red-400', doc: 'text-blue-400', pptx: 'text-orange-400' };

export default function FilesPage() {
  const [activeCourse, setActiveCourse] = useState<string>('all');

  const filtered = activeCourse === 'all' ? studyFiles : studyFiles.filter(f => f.courseId === activeCourse);
  const courseMap = Object.fromEntries(courses.map(c => [c.id, c.title]));

  return (
    <DashboardLayout title="الملفات والمواد الدراسية">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCourse('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${activeCourse === 'all' ? 'bg-primary text-white border-primary' : 'bg-card text-muted-foreground border-border hover:bg-secondary'}`}
          >
            الكل ({studyFiles.length})
          </button>
          {courses.map(c => {
            const count = studyFiles.filter(f => f.courseId === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCourse(c.id)}
                data-testid={`filter-course-${c.id}`}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${activeCourse === c.id ? 'bg-primary text-white border-primary' : 'bg-card text-muted-foreground border-border hover:bg-secondary'}`}
              >
                {c.title} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(f => (
            <div key={f.id} data-testid={`card-file-${f.id}`} className="bg-card border border-border rounded-2xl p-4 flex items-start gap-3 hover:border-primary/40 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <FileText className={`w-5 h-5 ${typeIcon[f.type] ?? 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm line-clamp-2">{f.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{courseMap[f.courseId]}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full uppercase font-mono text-muted-foreground">{f.type}</span>
                  <span className="text-xs text-muted-foreground">{f.size}</span>
                  <span className="text-xs text-muted-foreground">{f.date}</span>
                </div>
              </div>
              <a
                href={f.url}
                download
                data-testid={`button-download-${f.id}`}
                className="p-2 rounded-xl bg-secondary hover:bg-primary hover:text-white text-muted-foreground transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <File className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">لا توجد ملفات لهذه المادة</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
