# أكاديمية النور — منصة تعليمية متكاملة

منصة تعليمية احترافية تعمل بنظام **Front-End فقط** مع تصميم Glassmorphism عصري ودعم كامل للغة العربية.

---

## هيكل المشروع

```
edu-platform/
├── src/
│   ├── contexts/        ← إدارة الجلسة والثيم
│   ├── data/            ← البيانات التجريبية (مقابل Google Sheets)
│   ├── components/      ← المكونات المشتركة
│   │   ├── ui/          ← مكونات shadcn/ui الجاهزة
│   │   └── layout/      ← Sidebar + Header + DashboardLayout
│   ├── pages/           ← صفحات التطبيق الكاملة
│   ├── App.tsx          ← التوجيه الرئيسي
│   ├── main.tsx         ← نقطة الدخول
│   └── index.css        ← الثيم والألوان والـ Glassmorphism
├── public/
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## بيانات الدخول التجريبية

| اسم المستخدم | كلمة المرور |
|---|---|
| student1 | 123456 |
| student2 | 123456 |

---

## كيفية تشغيل المشروع محلياً

```bash
# تثبيت المتطلبات
pnpm install

# تشغيل المشروع للتطوير
pnpm run dev

# بناء النسخة الإنتاجية
pnpm run build
```

---

## نشر المشروع مجاناً

### على GitHub Pages

1. ارفع المشروع على GitHub
2. شغّل `pnpm run build` — ستظهر ملفات `dist/`
3. اذهب إلى Settings > Pages > Source: Deploy from branch `gh-pages`
4. أو استخدم مكتبة `gh-pages`:
   ```bash
   pnpm add -D gh-pages
   pnpm run build && gh-pages -d dist/public
   ```

### على Netlify

1. اربط مستودع GitHub بـ Netlify
2. Build command: `pnpm run build`
3. Publish directory: `dist/public`
4. انشر!

---

## الصفحات المتاحة

| المسار | الصفحة |
|---|---|
| `/` | الصفحة الرئيسية (Landing Page) |
| `/login` | تسجيل الدخول |
| `/dashboard` | لوحة الطالب الرئيسية |
| `/dashboard/lectures` | المحاضرات |
| `/dashboard/grades` | العلامات والنتائج |
| `/dashboard/assignments` | الواجبات والمهام |
| `/dashboard/announcements` | الإعلانات |
| `/dashboard/files` | الملفات الدراسية |
| `/dashboard/telegram` | قنوات Telegram |
| `/dashboard/settings` | الإعدادات |

---

## التقنيات المستخدمة

- **React 19** + **TypeScript** — واجهة المستخدم
- **Vite** — أداة البناء السريعة
- **Tailwind CSS v4** — تنسيق مرن
- **shadcn/ui** — مكونات جاهزة عالية الجودة
- **wouter** — التوجيه بين الصفحات
- **Recharts** — الرسوم البيانية (رادار GPA)
- **Framer Motion** — الانيميشن
- **lucide-react** — الأيقونات

---

## الخطوات القادمة لربط Google Sheets

اقرأ ملف `src/data/README.md` لمزيد من التفاصيل.
