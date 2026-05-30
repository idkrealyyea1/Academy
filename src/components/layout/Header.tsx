import { useState } from 'react';
import { Menu, Sun, Moon, Bell, Search } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { announcements } from '@/data/announcements';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export default function Header({ onMenuClick, title }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [showNotifs, setShowNotifs] = useState(false);
  const unreadCount = announcements.filter(a => !a.isRead).length;

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border px-4 sm:px-6 h-16 flex items-center gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
        data-testid="button-menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="font-bold text-lg text-foreground hidden sm:block">{title}</h1>

      <div className="flex-1 max-w-xs hidden md:flex items-center bg-secondary rounded-xl px-3 gap-2">
        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <input
          type="search"
          placeholder="بحث..."
          data-testid="input-search"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-2"
        />
      </div>

      <div className="flex items-center gap-2 mr-auto">
        <button
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
          className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifs(v => !v)}
            data-testid="button-notifications"
            className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -left-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifs && (
            <div className="absolute left-0 top-full mt-2 w-72 bg-card border border-border rounded-2xl shadow-xl p-3 z-50">
              <p className="text-sm font-semibold text-foreground mb-2 px-1">الإشعارات</p>
              {announcements.filter(a => !a.isRead).map(a => (
                <div key={a.id} className="px-2 py-2 rounded-xl hover:bg-secondary transition-colors cursor-pointer">
                  <p className="text-xs font-medium text-foreground line-clamp-1">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.date}</p>
                </div>
              ))}
              {unreadCount === 0 && <p className="text-xs text-muted-foreground text-center py-3">لا توجد إشعارات جديدة</p>}
            </div>
          )}
        </div>

        {user && (
          <div className="flex items-center gap-2 pr-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full border-2 border-primary/30"
            />
            <span className="text-sm font-medium text-foreground hidden sm:block">{user.name}</span>
          </div>
        )}
      </div>
    </header>
  );
}
