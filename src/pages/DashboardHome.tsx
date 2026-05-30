import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { courses } from '@/data/courses';
import { announcements } from '@/data/announcements';
import { assignments } from '@/data/assignments';
import { grades } from '@/data/grades';
import { BookOpen, BarChart2, ClipboardList, Bell, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'wouter';

export default function DashboardHome() {
  const { user } = useAuth();
  const studentGrades = grades.filter(g => g.studentId === (user?.id ?? 's1'));
  const studentAssignments = assignments;
  const pendingCount = studentAssignments.filter(a => a.status === 'pending').length;
  const unreadAnnouncements = announcements.filter(a => !a.isRead).length;
  const avg = studentGrades.length ? Math.round(studentGrades.reduce((s, g) => s + g.total, 0) / studentGrades.length) : 0;

  const stats = [
    { label: 'الكورسات', value: courses.length, icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'متوسط الدرجات', value: `${avg}%`, icon: BarChart2, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'واجبات معلقة', value: pendingCount, icon: ClipboardList, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'إشعارات جديدة', value: unreadAnnouncements, icon: Bell, color: 'text-accent', bg: 'bg-accent/10' },
  ];

  return (
    <DashboardLayout title="الرئيسية">
      <div className="space-y-6">
        <div className="rounded-2xl bg-gradient-to-l from-primary/20 to-accent/20 border border-white/10 p-6">
          <p className="text-muted-foreground text-sm">مرحباً بعودتك</p>
          <h2 className="text-2xl font-bold text-foreground mt-1">{user?.name ?? 'الطالب'}</h2>
          <p className="text-muted-foreground text-sm mt-1">{user?.level}</p>
          <div className="mt-4 flex gap-3">
            <Link href="/dashboard/lectures">
              <button className="text-sm bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors font-medium">
                ابدأ المذاكرة
              </button>
            </Link>
            <Link href="/dashboard/grades">
              <button className="text-sm bg-secondary text-foreground px-4 py-2 rounded-xl hover:bg-secondary/80 transition-colors font-medium">
                عرض الدرجات
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-4">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> تقدم الكورسات
              </h3>
              <Link href="/dashboard/lectures">
                <span className="text-xs text-primary hover:underline cursor-pointer">عرض الكل</span>
              </Link>
            </div>
            <div className="space-y-4">
              {courses.map(c => (
                <div key={c.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">{c.title}</span>
                    <span className="text-muted-foreground">{c.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-700"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{c.instructor}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Bell className="w-4 h-4 text-accent" /> آخر الإعلانات
                </h3>
                <Link href="/dashboard/announcements">
                  <span className="text-xs text-primary hover:underline cursor-pointer">عرض الكل</span>
                </Link>
              </div>
              <div className="space-y-3">
                {announcements.slice(0, 3).map(a => (
                  <div key={a.id} className="flex items-start gap-3">
                    <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${a.type === 'urgent' ? 'bg-red-400' : a.type === 'event' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{a.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-400" /> واجبات قادمة
                </h3>
                <Link href="/dashboard/assignments">
                  <span className="text-xs text-primary hover:underline cursor-pointer">عرض الكل</span>
                </Link>
              </div>
              <div className="space-y-2">
                {assignments.filter(a => a.status === 'pending').slice(0, 3).map(a => (
                  <div key={a.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary transition-colors">
                    <CheckCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground font-medium truncate">{a.title}</p>
                      <p className="text-xs text-muted-foreground">تسليم: {a.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
