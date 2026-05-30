import { useState } from 'react';
import { useLocation } from 'wouter';
import { Eye, EyeOff, GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { performLogin } from '@/data/auth';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setError('يرجى إدخال اسم المستخدم وكلمة المرور'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 900));
    const student = performLogin(username, password);
    if (student) {
      login(student);
      setLocation('/dashboard');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-primary items-center justify-center shadow-xl shadow-primary/30 mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">أكاديمية النور</h1>
          <p className="text-muted-foreground mt-1 text-sm">سجّل دخولك للوصول إلى منصتك التعليمية</p>
        </div>

        <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">اسم المستخدم</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                data-testid="input-username"
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  data-testid="input-password"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 pl-12 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  data-testid="button-toggle-password"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                data-testid="checkbox-remember"
                className="w-4 h-4 rounded border-border accent-primary"
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">تذكّرني</label>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3" data-testid="text-error">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              data-testid="button-submit"
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
            >
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> جارٍ التحقق...</> : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-secondary/60 rounded-xl border border-border">
            <p className="text-xs text-muted-foreground font-semibold mb-1">بيانات تجريبية:</p>
            <p className="text-xs text-foreground">اسم المستخدم: <span className="text-primary font-mono">student1</span> &nbsp;|&nbsp; كلمة المرور: <span className="text-primary font-mono">123456</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
