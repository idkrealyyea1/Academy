# مجلد `src/` — الكود المصدري

---

## الملفات الرئيسية

### `App.tsx` — التوجيه الرئيسي

يحتوي على جميع المسارات مع حماية الصفحات الخاصة.

```tsx
// هيكل App.tsx
<ThemeProvider>
  <AuthProvider>
    <WouterRouter>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard">
          {() => <PrivateRoute><DashboardHome /></PrivateRoute>}
        </Route>
        // ... باقي المسارات
      </Switch>
    </WouterRouter>
  </AuthProvider>
</ThemeProvider>
```

---

### `index.css` — الثيم والتنسيق العام

يحتوي على:

**1. استيراد الخطوط (يجب أن يكون أول سطر):**
```css
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
```

**2. متغيرات الألوان للوضع الفاتح (`:root`):**
```css
:root {
  --background: 220 100% 97%;    /* خلفية فاتحة */
  --foreground: 222 47% 11%;     /* نص داكن */
  --primary: 217 91% 52%;        /* أزرق */
  --accent: 258 90% 58%;         /* بنفسجي */
  --sidebar: 243 50% 20%;        /* Sidebar داكن */
  /* ... */
}
```

**3. متغيرات الألوان للوضع الداكن (`.dark`):**
```css
.dark {
  --background: 228 43% 7%;      /* خلفية داكنة جداً */
  --card: 228 38% 11%;           /* بطاقات شبه شفافة */
  --primary: 217 91% 60%;        /* أزرق أفتح */
  /* ... */
}
```

**4. تأثير Glassmorphism:**
```css
.glass {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
}
```

**لتغيير الألوان:** عدّل قيم HSL في `:root` و `.dark` فقط.

---

### `main.tsx` — نقطة الدخول

```tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";  // الثيم يُحمَّل أولاً

createRoot(document.getElementById("root")!).render(<App />);
```

---

## بنية المجلدات الكاملة

```
src/
├── App.tsx              ← التوجيه + الـ Providers
├── main.tsx             ← نقطة دخول التطبيق
├── index.css            ← الثيم + Glassmorphism
├── contexts/
│   ├── AuthContext.tsx  ← إدارة جلسة الطالب
│   └── ThemeContext.tsx ← Dark/Light Mode
├── data/
│   ├── students.ts      ← بيانات الطلاب
│   ├── auth.ts          ← دالة التحقق من الدخول
│   ├── courses.ts       ← الكورسات
│   ├── lectures.ts      ← المحاضرات
│   ├── grades.ts        ← العلامات
│   ├── assignments.ts   ← الواجبات
│   ├── announcements.ts ← الإعلانات
│   ├── files.ts         ← ملفات الدراسة
│   └── telegram.ts      ← قنوات Telegram
├── components/
│   ├── PrivateRoute.tsx ← حماية الصفحات
│   ├── layout/
│   │   ├── DashboardLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   └── ui/             ← مكونات shadcn/ui
└── pages/
    ├── LandingPage.tsx
    ├── LoginPage.tsx
    ├── DashboardHome.tsx
    ├── LecturesPage.tsx
    ├── GradesPage.tsx
    ├── AssignmentsPage.tsx
    ├── AnnouncementsPage.tsx
    ├── FilesPage.tsx
    ├── TelegramPage.tsx
    ├── SettingsPage.tsx
    └── not-found.tsx
```
