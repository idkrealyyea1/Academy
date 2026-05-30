import { useState } from 'react';
import { Link } from 'wouter';
import {
  GraduationCap, BookOpen, BarChart2, MessageCircle, Smartphone,
  Send, ChevronDown, ChevronUp, Mail, Phone, Star, Users, Play,
  CheckCircle, ArrowLeft, Zap, Shield, Globe
} from 'lucide-react';
import { courses } from '@/data/courses';

const features = [
  { icon: BookOpen, title: 'محاضرات تفاعلية', desc: 'فيديوهات عالية الجودة على Telegram مع ملفات PDF وملاحظات شاملة', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { icon: BarChart2, title: 'متابعة الأداء', desc: 'تتبع علاماتك ومعدلاتك وتقدمك الأكاديمي في الوقت الفعلي', color: 'text-green-400', bg: 'bg-green-400/10' },
  { icon: Send, title: 'تكامل Telegram', desc: 'وصول فوري لقنوات المواد ومجموعات النقاش عبر Telegram', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { icon: Smartphone, title: 'متجاوب تماماً', desc: 'تجربة سلسة على جميع الأجهزة — موبايل، تابلت، كمبيوتر', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { icon: Zap, title: 'سريع وخفيف', desc: 'تصميم مُحسَّن للسرعة يعمل بأفضل أداء حتى على الاتصالات البطيئة', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { icon: Shield, title: 'آمن ومشفر', desc: 'بياناتك محمية وآمنة مع تشفير كامل وإدارة صلاحيات متقدمة', color: 'text-red-400', bg: 'bg-red-400/10' },
];

const stats = [
  { value: '1,200+', label: 'طالب مسجّل' },
  { value: '4', label: 'مواد دراسية' },
  { value: '96+', label: 'محاضرة' },
  { value: '98%', label: 'نسبة الرضا' },
];

const instructors = [
  { name: 'أ. محمود السيد', subject: 'الرياضيات المتقدمة', students: 340, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mahmoud' },
  { name: 'د. إبراهيم حسن', subject: 'الفيزياء الحديثة', students: 280, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim' },
  { name: 'أ. فاطمة علي', subject: 'الكيمياء العضوية', students: 310, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima' },
];

const testimonials = [
  { name: 'أحمد كريم', level: 'الصف الثالث الثانوي', text: 'أكاديمية النور غيّرت أسلوب دراستي تماماً. متابعة الدرجات وسهولة الوصول للمحاضرات جعلت الدراسة أكثر متعة وتنظيماً.', rating: 5 },
  { name: 'نور الهدى', level: 'الصف الثاني الثانوي', text: 'التصميم الجميل والسهل في الاستخدام يجعلك تحب الدراسة. قنوات Telegram منظّمة بشكل رائع لكل مادة.', rating: 5 },
  { name: 'عمر عبدالله', level: 'الصف الثالث الثانوي', text: 'المنصة ممتازة جداً! كل شيء في مكان واحد — المحاضرات، الواجبات، العلامات، الإعلانات. موصى به لجميع الطلاب.', rating: 5 },
];

const faqs = [
  { q: 'كيف أحصل على بيانات الدخول؟', a: 'يتم تزويدك ببيانات الدخول من قِبل إدارة الأكاديمية عند تسجيلك. تواصل معنا عبر واتساب أو تيليجرام.' },
  { q: 'هل المنصة مجانية؟', a: 'الوصول للمنصة مجاني للطلاب المسجلين في الأكاديمية. رسوم الكورسات تُحدَّد حسب كل مادة.' },
  { q: 'هل يمكنني الوصول من الجوال؟', a: 'نعم، المنصة مصممة لتعمل بشكل مثالي على جميع الأجهزة — موبايل، تابلت، وكمبيوتر.' },
  { q: 'كيف يمكنني الوصول للمحاضرات؟', a: 'بعد تسجيل الدخول، ادخل قسم المحاضرات وستجد جميع فيديوهات مادتك مرتبة ومنظّمة. الفيديوهات مرفوعة على Telegram.' },
  { q: 'ماذا أفعل إذا نسيت كلمة المرور؟', a: 'تواصل مع الدعم الفني عبر واتساب أو تيليجرام وسيتم إعادة تعيين كلمة مرورك خلال ساعات.' },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-foreground text-lg">أكاديمية النور</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">المميزات</a>
          <a href="#courses" className="hover:text-foreground transition-colors">الكورسات</a>
          <a href="#instructors" className="hover:text-foreground transition-colors">الأساتذة</a>
          <a href="#faq" className="hover:text-foreground transition-colors">الأسئلة الشائعة</a>
        </div>
        <Link href="/login">
          <button className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors shadow-lg shadow-primary/20">
            تسجيل الدخول
          </button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            منصة تعليمية من الجيل الجديد
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight">
            تعلّم بذكاء مع{' '}
            <span className="bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
              أكاديمية النور
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            منصة تعليمية متكاملة تجمع المحاضرات والعلامات والواجبات والإعلانات في مكان واحد. تصميم عصري، أداء سريع، وتجربة تعليمية لا مثيل لها.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/login">
              <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-xl shadow-primary/30 text-lg">
                ابدأ الآن <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <a href="#courses">
              <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground font-bold px-8 py-4 rounded-2xl transition-all duration-200 text-lg border border-border">
                <Play className="w-5 h-5 text-primary" /> استعرض الكورسات
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-12 border-y border-border bg-card/50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl md:text-4xl font-black text-primary">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">لماذا أكاديمية النور؟</h2>
            <p className="text-muted-foreground mt-3 text-lg">كل ما تحتاجه في تجربتك التعليمية، مجتمعاً في مكان واحد</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all duration-200 hover:-translate-y-1">
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="px-6 py-20 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">الكورسات المتاحة</h2>
            <p className="text-muted-foreground mt-3 text-lg">محاضرات متخصصة من أفضل الأساتذة</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses.map(c => (
              <div key={c.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-200 hover:-translate-y-1">
                <div className={`h-28 ${c.thumbnail} flex items-center justify-center`}>
                  <BookOpen className="w-10 h-10 text-white/80" />
                </div>
                <div className="p-4">
                  <p className="font-bold text-foreground text-sm">{c.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{c.instructor}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-lg">
                      <BookOpen className="w-3 h-3" /> {c.lecturesCount} محاضرة
                    </span>
                    <span className="flex items-center gap-1 text-xs text-yellow-400">
                      <Star className="w-3 h-3" /> 4.9
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section id="instructors" className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">نخبة من الأساتذة</h2>
            <p className="text-muted-foreground mt-3 text-lg">خبراء متخصصون يرافقونك في كل خطوة</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {instructors.map(({ name, subject, students, avatar }) => (
              <div key={name} className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-200 hover:-translate-y-1">
                <img src={avatar} alt={name} className="w-20 h-20 rounded-2xl mx-auto mb-4 border-2 border-primary/20" />
                <p className="font-bold text-foreground">{name}</p>
                <p className="text-sm text-muted-foreground mt-1">{subject}</p>
                <div className="flex items-center justify-center gap-1 mt-3 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{students} طالب</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">ماذا يقول طلابنا</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map(({ name, level, text, rating }) => (
              <div key={name} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">"{text}"</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground text-sm">{name}</p>
                  <p className="text-xs text-muted-foreground">{level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">الأسئلة الشائعة</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-right hover:bg-secondary/30 transition-colors"
                >
                  <span className="font-semibold text-foreground text-sm">{q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-20 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">تواصل معنا</h2>
            <p className="text-muted-foreground mt-3">نحن هنا للمساعدة في أي وقت</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              { icon: MessageCircle, label: 'واتساب', value: '+966 5X XXX XXXX', color: 'text-green-400', bg: 'bg-green-400/10' },
              { icon: Send, label: 'تيليجرام', value: '@academy_nur', color: 'text-blue-400', bg: 'bg-blue-400/10' },
              { icon: Mail, label: 'البريد الإلكتروني', value: 'info@academy.com', color: 'text-primary', bg: 'bg-primary/10' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="bg-card border border-border rounded-2xl p-5 text-center">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <p className="font-semibold text-foreground text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border bg-card/50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">أكاديمية النور</span>
          </div>
          <p className="text-xs text-muted-foreground">جميع الحقوق محفوظة &copy; 2024 أكاديمية النور</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Globe className="w-3.5 h-3.5" />
            <span>منصة تعليمية Front-End فقط</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
