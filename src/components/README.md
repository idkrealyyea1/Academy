# مجلد المكونات — `src/components/`

يحتوي على المكونات المشتركة بين صفحات التطبيق.

---

## الهيكل

```
components/
├── PrivateRoute.tsx      ← حماية الصفحات (Redirect للـ Login)
├── layout/               ← مكونات الهيكل الأساسي
│   ├── DashboardLayout.tsx
│   ├── Sidebar.tsx
│   └── Header.tsx
└── ui/                   ← مكونات shadcn/ui (لا تعدّل عليها)
```

---

## `PrivateRoute.tsx`

يحمي الصفحات من الوصول بدون تسجيل دخول:

```tsx
import PrivateRoute from '@/components/PrivateRoute';

// في App.tsx
<Route path="/dashboard">
  {() => <PrivateRoute><DashboardHome /></PrivateRoute>}
</Route>
```

إذا لم يكن المستخدم مسجل دخول، يتم توجيهه تلقائياً إلى `/login`.

---

## `layout/DashboardLayout.tsx`

الهيكل الرئيسي لصفحات الداشبورد. يتضمن Sidebar و Header.

```tsx
import DashboardLayout from '@/components/layout/DashboardLayout';

function MyPage() {
  return (
    <DashboardLayout title="اسم الصفحة">
      {/* محتوى الصفحة */}
    </DashboardLayout>
  );
}
```

**Props:**
| Prop | النوع | الوصف |
|---|---|---|
| `title` | `string` | عنوان الصفحة في الـ Header |
| `children` | `ReactNode` | محتوى الصفحة |

---

## `layout/Sidebar.tsx`

الـ Sidebar الجانبي يحتوي على:
- شعار الأكاديمية
- معلومات الطالب
- قائمة التنقل (7 عناصر)
- زر تسجيل الخروج

**سلوك الموبايل:**
- على شاشات صغيرة يختفي الـ Sidebar
- زر الـ Hamburger في الـ Header يفتحه
- النقر خارج الـ Sidebar يغلقه

لإضافة عنصر جديد للقائمة في `Sidebar.tsx`:
```tsx
const navItems = [
  // ... العناصر الموجودة
  { href: '/dashboard/new-page', icon: YourIcon, label: 'صفحة جديدة' },
];
```

---

## `layout/Header.tsx`

الشريط العلوي يحتوي على:
- زر فتح Sidebar (موبايل)
- عنوان الصفحة
- مربع بحث
- زر تبديل الثيم
- جرس الإشعارات (مع عداد)
- صورة الطالب واسمه

---

## `ui/` — مكونات shadcn/ui

مكونات جاهزة من مكتبة shadcn/ui. **لا تعدّل عليها مباشرة**.

للاستخدام:
```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
```

قائمة المكونات المتاحة:
- Button, Card, Input, Select, Dialog
- Table, Tabs, Progress, Badge
- Accordion, Sheet, Tooltip
- وغيرها الكثير...
