import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { grades, getGPA } from '@/data/grades';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Award, CheckCircle } from 'lucide-react';

const letterColor: Record<string, string> = {
  'A+': 'text-green-400', 'A': 'text-green-400', 'A-': 'text-green-400',
  'B+': 'text-blue-400', 'B': 'text-blue-400', 'B-': 'text-blue-400',
  'C+': 'text-yellow-400', 'C': 'text-yellow-400',
  'D': 'text-orange-400', 'F': 'text-red-400',
};

export default function GradesPage() {
  const { user } = useAuth();
  const studentGrades = grades.filter(g => g.studentId === (user?.id ?? 's1'));
  const avg = studentGrades.length ? (studentGrades.reduce((s, g) => s + g.total, 0) / studentGrades.length).toFixed(1) : '0';
  const gpaVal = studentGrades.length ? (studentGrades.reduce((s, g) => s + getGPA(g.letter), 0) / studentGrades.length).toFixed(2) : '0';
  const passCount = studentGrades.filter(g => g.status === 'pass').length;

  const radarData = studentGrades.map(g => ({
    subject: g.subject.length > 10 ? g.subject.slice(0, 10) + '...' : g.subject,
    value: g.total,
  }));

  return (
    <DashboardLayout title="العلامات والنتائج">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'متوسط الدرجات', value: `${avg}%`, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'المعدل التراكمي (GPA)', value: gpaVal, icon: Award, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
            { label: 'المواد الناجحة', value: `${passCount}/${studentGrades.length}`, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mx-auto mb-2`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold text-foreground mb-4">مخطط الأداء</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, color: 'hsl(var(--foreground))' }}
                    formatter={(v: number) => [`${v}%`, 'الدرجة']}
                  />
                  <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 overflow-x-auto">
            <h3 className="font-semibold text-foreground mb-4">تفاصيل الدرجات</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-xs border-b border-border">
                  <th className="text-right pb-3 font-medium">المادة</th>
                  <th className="text-center pb-3 font-medium">نصفي</th>
                  <th className="text-center pb-3 font-medium">نهائي</th>
                  <th className="text-center pb-3 font-medium">واجبات</th>
                  <th className="text-center pb-3 font-medium">المجموع</th>
                  <th className="text-center pb-3 font-medium">التقدير</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {studentGrades.map(g => (
                  <tr key={g.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-3 font-medium text-foreground">{g.subject}</td>
                    <td className="py-3 text-center text-muted-foreground">{g.midterm}</td>
                    <td className="py-3 text-center text-muted-foreground">{g.finalExam}</td>
                    <td className="py-3 text-center text-muted-foreground">{g.assignments}</td>
                    <td className="py-3 text-center font-bold text-foreground">{g.total}</td>
                    <td className="py-3 text-center">
                      <span className={`font-bold text-sm ${letterColor[g.letter] ?? 'text-foreground'}`}>{g.letter}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
