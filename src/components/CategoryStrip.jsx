import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";

const collections = [
  {
    id: "men",
    title: { ar: "ساعات رجالي", en: "Men's watches" },
    subtitle: { ar: "كلاسيك، سبورت، وكرونوغراف", en: "Classic, sport & chronograph" },
    link: "/shop?gender=men",
    image: "/tiktok/products/skeleton-cushion-rubber-1.jpg",
  },
  {
    id: "women",
    title: { ar: "ساعات حريمي", en: "Women's watches" },
    subtitle: { ar: "ذهبي رقيق وألوان مبهجة", en: "Delicate gold & bright colours" },
    link: "/shop?gender=women",
    image: "/tiktok/products/octagon-color-dial-4.jpg",
  },
  {
    id: "skeleton",
    title: { ar: "سكيلتون", en: "Skeleton" },
    subtitle: { ar: "الماكينة ظاهرة من الميناء", en: "The movement on show" },
    link: "/shop?brand=Skeleton",
    image: "/tiktok/products/open-heart-tourbillon-1.jpg",
  },
];

export default function CategoryStrip() {
  const { tr } = useLang();
  return (
    <section className="container-page py-16 md:py-24">
      <div data-aos="fade-up" className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono tracking-widest text-brass uppercase">
            {tr("تسوق حسب الفئة", "Shop by category")}
          </p>
          <h2 className="font-display mt-2 text-2xl font-bold text-cream sm:text-4xl">
            {tr("لنفسك أو هدية", "For you, or as a gift")}
          </h2>
        </div>
        <Link
          to="/shop"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brass hover:text-brass-light"
        >
          {tr("كل الساعات", "All watches")} <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
        {collections.map((c, i) => (
          <Link
            key={c.id}
            to={c.link}
            data-aos="fade-up"
            data-aos-delay={i * 100}
            className="group relative aspect-[16/10] sm:aspect-[4/5] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0e0e11] p-6 flex flex-col justify-end transition-all duration-500 hover:border-brass/50 hover:shadow-2xl hover:shadow-black/70"
          >
            <img
              src={c.image}
              alt={tr(c.title.ar, c.title.en)}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* تدرج للقراءة */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

            {/* نصوص الكارت */}
            <div className="relative z-10">
              <h3 className="font-display text-xl font-bold text-cream transition-colors group-hover:text-brass sm:text-2xl">
                {tr(c.title.ar, c.title.en)}
              </h3>
              <p className="mt-1 text-xs text-cream/70 line-clamp-1">{tr(c.subtitle.ar, c.subtitle.en)}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brass opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {tr("تصفح", "Browse")} <ArrowUpRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
