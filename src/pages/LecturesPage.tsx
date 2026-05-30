import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { courses } from '@/data/courses';
import { lectures } from '@/data/lectures';
import { PlayCircle, FileText, Clock, Calendar, ChevronDown, ExternalLink } from 'lucide-react';

export default function LecturesPage() {
  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  return (
    <DashboardLayout title="المحاضرات">
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">اختر مادة لعرض محاضراتها</p>

        {courses.map(course => {
          const courseLectures = lectures.filter(l => l.courseId === course.id);
          const isOpen = activeCourse === course.id;

          return (
            <div key={course.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setActiveCourse(isOpen ? null : course.id)}
                data-testid={`button-course-${course.id}`}
                className="w-full flex items-center gap-4 p-5 hover:bg-secondary/30 transition-colors text-right"
              >
                <div className={`w-12 h-12 rounded-xl ${course.thumbnail} flex items-center justify-center flex-shrink-0`}>
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{course.title}</p>
                  <p className="text-sm text-muted-foreground">{course.instructor} • {courseLectures.length} محاضرة</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="hidden sm:block text-left">
                    <p className="text-xs text-muted-foreground">التقدم</p>
                    <p className="text-sm font-semibold text-foreground">{course.progress}%</p>
                  </div>
                  <div className="w-16 h-1.5 bg-secondary rounded-full hidden sm:block">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-border divide-y divide-border">
                  {courseLectures.length === 0 ? (
                    <p className="p-5 text-sm text-muted-foreground text-center">لا توجد محاضرات بعد</p>
                  ) : (
                    courseLectures.map((lec, idx) => (
                      <div key={lec.id} className="flex items-start gap-4 p-4 hover:bg-secondary/20 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm">{lec.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{lec.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3.5 h-3.5" /> {lec.duration}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5" /> {lec.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <a
                            href={lec.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`button-watch-${lec.id}`}
                            className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
                          >
                            <PlayCircle className="w-3.5 h-3.5" /> مشاهدة
                          </a>
                          <a
                            href={lec.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`button-pdf-${lec.id}`}
                            className="flex items-center gap-1.5 text-xs bg-secondary text-muted-foreground hover:bg-secondary/80 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5" /> PDF
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
