import DashboardLayout from '@/components/layout/DashboardLayout';
import { telegramChannels } from '@/data/telegram';
import { courses } from '@/data/courses';
import { Send, Users, ExternalLink, Hash } from 'lucide-react';

export default function TelegramPage() {
  const courseMap = Object.fromEntries(courses.map(c => [c.id, c]));

  const grouped = courses.map(c => ({
    course: c,
    channels: telegramChannels.filter(t => t.courseId === c.id),
  }));

  return (
    <DashboardLayout title="قنوات Telegram">
      <div className="space-y-6">
        <div className="bg-gradient-to-l from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-3">
          <Send className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground text-sm">كيفية الاستخدام</p>
            <p className="text-xs text-muted-foreground mt-1">
              انضم إلى قنوات ومجموعات Telegram لكل مادة للوصول إلى المحاضرات والملفات والتواصل مع زملائك والأساتذة.
            </p>
          </div>
        </div>

        {grouped.map(({ course, channels }) => (
          <div key={course.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${course.thumbnail} flex items-center justify-center flex-shrink-0`}>
                <Hash className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-foreground">{course.title}</h3>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{course.instructor}</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {channels.map(ch => (
                <div key={ch.id} data-testid={`card-channel-${ch.id}`} className="bg-card border border-border rounded-2xl p-4 hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Send className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                      ch.type === 'channel'
                        ? 'text-purple-400 bg-purple-400/10 border-purple-400/20'
                        : 'text-green-400 bg-green-400/10 border-green-400/20'
                    }`}>
                      {ch.type === 'channel' ? 'قناة' : 'مجموعة'}
                    </span>
                  </div>
                  <p className="font-semibold text-foreground text-sm mt-3">{ch.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ch.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="w-3.5 h-3.5" /> {ch.members} عضو
                    </span>
                    <a
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`button-join-${ch.id}`}
                      className="flex items-center gap-1.5 text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
                    >
                      انضمام <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
