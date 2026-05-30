import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, User, GraduationCap, Shield, Info } from 'lucide-react';

const avatarSeeds = ['Ahmed', 'Sara', 'Omar', 'Fatima', 'Ali', 'Nour', 'Youssef', 'Layla'];

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <DashboardLayout title="الإعدادات">
      <div className="max-w-2xl space-y-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-primary" /> الملف الشخصي
          </h3>
          <div className="flex items-center gap-4 mb-5">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-16 h-16 rounded-2xl border-2 border-primary/30"
            />
            <div>
              <p className="font-bold text-foreground text-lg">{user?.name}</p>
              <p className="text-muted-foreground text-sm">{user?.level}</p>
              <p className="text-xs text-muted-foreground mt-0.5">@{user?.username}</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'الاسم الكامل', value: user?.name },
              { label: 'اسم المستخدم', value: user?.username },
              { label: 'المستوى الدراسي', value: user?.level },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
            <Sun className="w-4 h-4 text-yellow-400" /> المظهر
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">وضع العرض</p>
              <p className="text-xs text-muted-foreground mt-0.5">{theme === 'dark' ? 'الوضع الداكن مفعّل' : 'الوضع الفاتح مفعّل'}</p>
            </div>
            <button
              onClick={toggleTheme}
              data-testid="button-settings-theme"
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-primary" />}
              {theme === 'dark' ? 'تفعيل الفاتح' : 'تفعيل الداكن'}
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
            <GraduationCap className="w-4 h-4 text-accent" /> عن المنصة
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>أكاديمية النور — منصة تعليمية متكاملة تعمل بنظام Front-End</p>
            <p>الإصدار: 1.0.0</p>
            <p>البيانات: مخزّنة محلياً (Google Sheets جاهز للتكامل)</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-green-400" /> كيفية ربط Google Sheets
          </h3>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>أنشئ ملف Google Sheets بالأوراق المطلوبة (الطلاب، العلامات، الإعلانات، الواجبات)</li>
            <li>افتح Google Apps Script وأنشئ Web App لجلب البيانات</li>
            <li>انسخ رابط الـ Web App وضعه في ملف <span className="font-mono text-primary">src/data/config.ts</span></li>
            <li>استبدل الدوال الثابتة باستدعاءات fetch إلى Apps Script</li>
            <li>انشر الموقع على GitHub Pages أو Netlify</li>
          </ol>
        </div>
      </div>
    </DashboardLayout>
  );
}
