import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, BookOpen, BarChart2, ClipboardList,
  FileText, Send, Settings, LogOut, GraduationCap, X
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'الرئيسية' },
  { href: '/dashboard/lectures', icon: BookOpen, label: 'المحاضرات' },
  { href: '/dashboard/grades', icon: BarChart2, label: 'العلامات' },
  { href: '/dashboard/assignments', icon: ClipboardList, label: 'الواجبات' },
  { href: '/dashboard/files', icon: FileText, label: 'الملفات' },
  { href: '/dashboard/telegram', icon: Send, label: 'Telegram' },
  { href: '/dashboard/settings', icon: Settings, label: 'الإعدادات' },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed top-0 right-0 h-full w-64 z-30
          bg-sidebar border-l border-sidebar-border
          flex flex-col transition-transform duration-300
          lg:translate-x-0 lg:static lg:z-auto
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">أكاديمية النور</p>
              <p className="text-xs text-sidebar-foreground/50">لوحة الطالب</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-sidebar-foreground/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {user && (
          <div className="px-4 py-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-primary/40"
              />
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">{user.name}</p>
                <p className="text-sidebar-foreground/50 text-xs truncate">{user.level}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = location === href;
            return (
              <Link key={href} href={href} onClick={onClose}>
                <div
                  data-testid={`nav-${label}`}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
                    transition-all duration-200 group
                    ${isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-sidebar-foreground/50 group-hover:text-white'}`} />
                  <span className="text-sm font-medium">{label}</span>
                  {isActive && (
                    <div className="mr-auto w-1.5 h-1.5 rounded-full bg-white/80" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={logout}
            data-testid="button-logout"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}
