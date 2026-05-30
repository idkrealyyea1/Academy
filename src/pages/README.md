# مجلد الصفحات — `src/pages/`

يحتوي على جميع صفحات التطبيق.

---

## قائمة الصفحات

| الملف | المسار | الوصف |
|---|---|---|
| `LandingPage.tsx` | `/` | الصفحة الرئيسية والتسويقية |
| `LoginPage.tsx` | `/login` | صفحة تسجيل الدخول |
| `DashboardHome.tsx` | `/dashboard` | لوحة الطالب الرئيسية |
| `LecturesPage.tsx` | `/dashboard/lectures` | المحاضرات مرتبة حسب المادة |
| `GradesPage.tsx` | `/dashboard/grades` | العلامات مع رسم بياني |
| `AssignmentsPage.tsx` | `/dashboard/assignments` | الواجبات مع إمكانية التسليم |
| `AnnouncementsPage.tsx` | `/dashboard/announcements` | الإعلانات حسب النوع |
| `FilesPage.tsx` | `/dashboard/files` | ملفات الدراسة |
| `TelegramPage.tsx` | `/dashboard/telegram` | قنوات ومجموعات Telegram |
| `SettingsPage.tsx` | `/dashboard/settings` | الإعدادات والملف الشخصي |
| `not-found.tsx` | `*` | صفحة 404 |

---

## `LandingPage.tsx`

الصفحة الرئيسية تتضمن:
- **Navbar** — شريط التنقل العلوي الثابت
- **Hero Section** — العنوان الرئيسي مع خلفية متحركة
- **Stats Bar** — إحصائيات الأكاديمية
- **Features Section** — 6 مميزات مع أيقونات
- **Courses Section** — 4 كروت للكورسات
- **Instructors Section** — 3 أساتذة
- **Testimonials** — آراء الطلاب
- **FAQ** — أسئلة شائعة قابلة للطي
- **Contact Section** — معلومات التواصل
- **Footer** — تذييل الصفحة

---

## `LoginPage.tsx`

ميزات صفحة الدخول:
- تحقق من اسم المستخدم وكلمة المرور
- إظهار/إخفاء كلمة المرور
- تذكّرني (Remember Me)
- Loading animation أثناء التحقق (900ms محاكاة)
- رسائل خطأ واضحة بالعربية
- عرض بيانات تجريبية للتجربة

---

## `DashboardHome.tsx`

لوحة التحكم الرئيسية تعرض:
- رسالة ترحيب باسم الطالب
- 4 بطاقات إحصائية: الكورسات، الدرجات، الواجبات، الإشعارات
- شريط تقدم لكل كورس
- آخر 3 إعلانات
- آخر 3 واجبات معلقة

---

## `GradesPage.tsx`

يستخدم مكتبة **Recharts** لعرض:
- **RadarChart** — مخطط رادار لمقارنة الدرجات بين المواد
- جدول تفصيلي بكل الدرجات
- بطاقات: متوسط الدرجات، GPA، المواد الناجحة

---

## `AssignmentsPage.tsx`

ميزات الواجبات:
- فلترة حسب الحالة: الكل / معلق / مُسلَّم / تمّ التصحيح
- زر "تسليم" يغير حالة الواجب في الـ State المحلي
- عرض الدرجة للواجبات المصحّحة

---

## `FilesPage.tsx`

فلترة الملفات حسب المادة الدراسية مع:
- عرض نوع الملف (PDF, PPTX, DOC)
- حجم الملف وتاريخ الرفع
- زر تحميل يظهر عند التحويم

---

## إضافة صفحة جديدة

### 1. أنشئ ملف الصفحة

```tsx
// src/pages/NewPage.tsx
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function NewPage() {
  return (
    <DashboardLayout title="اسم الصفحة الجديدة">
      <div>
        {/* محتوى الصفحة */}
      </div>
    </DashboardLayout>
  );
}
```

### 2. سجّل المسار في `App.tsx`

```tsx
import NewPage from '@/pages/NewPage';

// في Router:
<Route path="/dashboard/new-page">
  {() => <PrivateRoute><NewPage /></PrivateRoute>}
</Route>
```

### 3. أضف رابطاً في `Sidebar.tsx`

```tsx
const navItems = [
  // ...
  { href: '/dashboard/new-page', icon: YourIcon, label: 'الصفحة الجديدة' },
];
```
