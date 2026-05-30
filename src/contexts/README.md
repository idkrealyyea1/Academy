# مجلد السياقات — `src/contexts/`

يحتوي هذا المجلد على React Context Providers التي تدير الحالة العامة للتطبيق.

---

## الملفات

### `AuthContext.tsx` — إدارة المصادقة

يوفر هذا الـ Context:

```typescript
interface AuthContextType {
  user: Student | null;        // بيانات الطالب الحالي
  login: (student) => void;    // دالة تسجيل الدخول
  logout: () => void;          // دالة تسجيل الخروج
  isAuthenticated: boolean;    // هل المستخدم مسجّل دخول؟
}
```

**كيفية الاستخدام:**
```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, logout, isAuthenticated } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>مرحباً {user?.name}</p>
      ) : (
        <p>يرجى تسجيل الدخول</p>
      )}
    </div>
  );
}
```

**التخزين:**
- بيانات الطالب تُحفظ في `localStorage` تحت مفتاح `auth_user`
- عند إغلاق المتصفح وإعادة فتحه، يظل الطالب مسجل دخول
- تسجيل الخروج يحذف البيانات من `localStorage`

---

### `ThemeContext.tsx` — إدارة الثيم

يوفر هذا الـ Context:

```typescript
interface ThemeContextType {
  theme: 'dark' | 'light';   // الثيم الحالي
  toggleTheme: () => void;    // تبديل الثيم
}
```

**كيفية الاستخدام:**
```tsx
import { useTheme } from '@/contexts/ThemeContext';

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? 'تفعيل الفاتح' : 'تفعيل الداكن'}
    </button>
  );
}
```

**التخزين:**
- الثيم يُحفظ في `localStorage` تحت مفتاح `theme`
- الثيم الافتراضي: داكن (dark)
- يتم تطبيق الثيم عبر إضافة/حذف class `dark` من `document.documentElement`

---

## ترتيب الـ Providers في `App.tsx`

```tsx
<ThemeProvider>           // الأخارج أولاً
  <AuthProvider>          // ثم Auth
    <YourComponents />
  </AuthProvider>
</ThemeProvider>
```

هذا الترتيب مهم لأن ThemeProvider لا يحتاج AuthProvider، لكن العكس ممكن.
