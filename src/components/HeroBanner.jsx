import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { WhatsAppIcon } from "./SocialIcons";
import { SOCIAL_LINKS } from "../data/social";
import { useLang } from "../i18n/LanguageContext";

// 10 ساعات من مجلد P_HOUR بعد شيل الخلفية (public/hero-cutouts)
const WATCHES = Array.from({ length: 10 }, (_, i) => `/hero-cutouts/watch-${String(i + 1).padStart(2, "0")}.webp`);

export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const { tr } = useLang();

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % WATCHES.length), 4500);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  // أي تبديل يدوي بيعيد عدّاد التبديل التلقائي من الأول
  const go = (i) => {
    setIndex((i + WATCHES.length) % WATCHES.length);
    startTimer();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0c] via-[#101014] to-[#0a0a0c]">
      {/* هالة ذهبي خافتة */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]"
      />

      <div className="container-page relative py-8 md:py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
          {/* الكلام */}
          <div className="lg:col-span-7" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-3.5 py-1 text-xs text-brass">
              <Sparkles size={13} />
              <span dir="ltr">Luxury Watches &amp; Gifts</span>
            </div>

            <h1 className="font-display mt-5 text-4xl font-extrabold text-cream leading-[1.2] sm:text-5xl lg:text-6xl">
              {tr("الوقت مش أرقام…", "Time isn't numbers…")}
              <span className="block text-brass">{tr("الوقت قيمة", "time is value")}</span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {tr(
                "ساعات فخمة بأسعار مميزة — معاينة قبل الدفع وشحن لكل مصر.",
                "Luxury watches at great prices — inspect before you pay, shipping across Egypt."
              )}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-bold text-[#0e0e10] shadow-lg shadow-brass/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brass-light"
              >
                {tr("تسوق الساعات", "Shop watches")}
                <ArrowLeft size={16} className="ltr:rotate-180" />
              </Link>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-[#25D366] hover:text-[#25D366]"
              >
                <WhatsAppIcon size={17} />
                {tr("اطلب على واتساب", "Order on WhatsApp")}
              </a>
            </div>
          </div>

          {/* الكارت الدائري — الساعات بتتبدل وهي بتلف مع عقارب الساعة */}
          <div className="order-first lg:order-none lg:col-span-5 flex flex-col items-center" data-aos="zoom-in" data-aos-delay="150">
            <div className="relative w-full max-w-[290px] sm:max-w-sm md:max-w-md aspect-square rounded-full border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 shadow-2xl flex items-center justify-center group">
              <div className="absolute inset-4 rounded-full border border-brass/20 bg-[radial-gradient(circle_at_center,#1c1c21_0%,#0d0d10_70%)]" />

              <div className="relative z-10 h-[74%] w-[74%] flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                <img
                  key={index}
                  src={WATCHES[index]}
                  alt=""
                  className="hero-watch-spin max-h-full max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                />
              </div>

              <button
                onClick={() => go(index - 1)}
                aria-label={tr("الساعة السابقة", "Previous watch")}
                className="absolute start-2 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-muted transition-colors hover:border-brass hover:text-brass"
              >
                <ChevronRight size={18} className="ltr:rotate-180" />
              </button>
              <button
                onClick={() => go(index + 1)}
                aria-label={tr("الساعة التالية", "Next watch")}
                className="absolute end-2 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-muted transition-colors hover:border-brass hover:text-brass"
              >
                <ChevronLeft size={18} className="ltr:rotate-180" />
              </button>
            </div>

            {/* نقط التبديل */}
            <div className="mt-4 flex items-center" role="group" aria-label={tr("اختيار الساعة", "Choose watch")}>
              {WATCHES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={tr(`الساعة ${i + 1}`, `Watch ${i + 1}`)}
                  aria-current={index === i}
                  className="group/dot flex h-8 items-center px-1"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${
                      index === i ? "w-6 bg-brass" : "w-1.5 bg-white/25 group-hover/dot:bg-white/50"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
