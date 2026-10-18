import { TikTokIcon, InstagramIcon, FacebookIcon } from "./SocialIcons";
import { SOCIAL_LINKS } from "../data/social";
import { useLang } from "../i18n/LanguageContext";

const FEED = [1, 2, 3, 4, 5, 6].map((n) => `/tiktok/feed/feed-${n}.jpg`);

const SOCIAL_CHANNELS = [
  { id: "tiktok", label: "TikTok", handle: "@t.hour0", href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon, hover: "hover:border-cream hover:text-cream" },
  { id: "instagram", label: "Instagram", handle: "@t_hour_", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon, hover: "hover:border-[#E1306C] hover:text-[#E1306C]" },
  { id: "facebook", label: "Facebook", handle: "T hour", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon, hover: "hover:border-[#1877F2] hover:text-[#1877F2]" },
];

// قسم "تابعنا" — صور حقيقية من صفحاتنا + لينكات تيك توك وإنستجرام وفيسبوك
export default function SocialFeed() {
  const { tr } = useLang();
  return (
    <section className="border-t border-white/[0.08] bg-[#0c0c0e] py-16 md:py-20">
      <div className="container-page">
        <div data-aos="fade-up" className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-mono tracking-widest text-brass uppercase">
              {tr("تابعنا", "Follow us")}
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold text-cream sm:text-4xl">
              {tr("شوفها على الإيد قبل ما تطلب", "See them on the wrist first")}
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted">
              {tr(
                "صور وفيديوهات حقيقية — والموديلات الجديدة بتنزل على صفحاتنا الأول.",
                "Real photos and videos — new models land on our pages first."
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {SOCIAL_CHANNELS.map(({ id, label, handle, href, Icon, hover }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} — ${handle}`}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 text-sm font-semibold text-cream/90 transition-colors ${hover}`}
              >
                <Icon size={17} />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 md:grid-cols-6">
          {FEED.map((src, i) => {
            // الصور بتتوزع على التلات صفحات بالتبادل
            const ch = SOCIAL_CHANNELS[i % SOCIAL_CHANNELS.length];
            return (
              <a
                key={src}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                data-aos="fade-up"
                data-aos-delay={i * 60}
                aria-label={tr(`افتح صفحتنا على ${ch.label}`, `Open our ${ch.label} page`)}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/[0.08]"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-cream opacity-0 transition-opacity group-hover:opacity-100">
                  <ch.Icon size={26} />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
