import { Link } from "react-router-dom";
import { Camera, Truck, Gift, HeartHandshake, ArrowLeft } from "lucide-react";
import StatCounter from "../components/StatCounter";
import ReviewScreens from "../components/ReviewScreens";
import { WhatsAppIcon } from "../components/SocialIcons";
import { SOCIAL_LINKS } from "../data/social";
import { STORE_STATS } from "../data/testimonials";
import { STATS_EN } from "../data/products.en";
import { useLang } from "../i18n/LanguageContext";

const values = [
  {
    icon: Camera,
    title: { ar: "صور حقيقية", en: "Real photos" },
    copy: {
      ar: "متصورة بإيدينا على الإيد — اللي بتشوفه هو اللي بيوصلك.",
      en: "Shot by us on the wrist — what you see is what arrives.",
    },
  },
  {
    icon: Truck,
    title: { ar: "شحن لكل مصر", en: "Shipping across Egypt" },
    copy: {
      ar: "لكل المحافظات، ومعاينة قبل الدفع.",
      en: "To every governorate, with inspection before you pay.",
    },
  },
  {
    icon: Gift,
    title: { ar: "هدايا بتفرّح", en: "Gifts that delight" },
    copy: {
      ar: "لعيد ميلاد، تخرج، أو أي مناسبة.",
      en: "For birthdays, graduations or any occasion.",
    },
  },
  {
    icon: HeartHandshake,
    title: { ar: "رد سريع على واتساب", en: "Fast replies on WhatsApp" },
    copy: {
      ar: "هنساعدك تختار الموديل واللون المناسب.",
      en: "We'll help you pick the right model and colour.",
    },
  },
];

export default function About() {
  const { tr, isAr } = useLang();
  return (
    <div>
      {/* المقدمة */}
      <section className="container-page py-12 md:py-20">
        <div data-aos="fade-up" className="max-w-2xl">
          <p className="text-xs font-mono tracking-[0.18em] text-brass uppercase">
            {tr("من نحن", "About us")}
          </p>
          <h1 className="font-display mt-3 text-3xl text-cream sm:text-4xl lg:text-5xl">
            {tr(
              "متجر ساعات أونلاين لكل مصر",
              "An online watch store for all of Egypt"
            )}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {tr(
              "بنختار كل موديل بنفسنا ونصوّره على الإيد من غير فلاتر. ساعة لنفسك أو هدية لحد غالي عليك — اختر وقتك.. وامنح لحظة مميزة.",
              "We pick every model ourselves and shoot it on the wrist with no filters. A watch for you, or a gift for someone special — choose your time… gift a special moment."
            )}
          </p>
        </div>
      </section>

      {/* الأرقام */}
      <section className="border-y border-line bg-ink-2/30">
        <div className="container-page grid grid-cols-3 gap-4 py-12 md:py-16">
          {STORE_STATS.map((stat, i) => (
            <div
              key={stat.id}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="text-center"
            >
              <div className="text-2xl text-brass sm:text-4xl lg:text-5xl">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-xs text-muted sm:text-sm">{isAr ? stat.label : STATS_EN[stat.id]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* قيمنا */}
      <section className="container-page py-12 md:py-24">
        <div data-aos="fade-up" className="max-w-xl">
          <p className="text-xs font-mono tracking-[0.18em] text-brass uppercase">
            {tr("ليه T Hour", "Why T Hour")}
          </p>
          <h2 className="font-display mt-3 text-3xl text-cream sm:text-4xl">
            {tr("مش بس بنبيع ساعات… بنبيع لحظات", "Not just watches… moments")}
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {values.map((v, i) => (
            <div
              key={v.title.en}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className="rounded-2xl border border-line bg-ink-2/50 p-4 sm:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brass/40 text-brass">
                <v.icon size={20} />
              </div>
              <h3 className="font-display mt-3 text-base text-cream sm:mt-4 sm:text-lg">
                {tr(v.title.ar, v.title.en)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {tr(v.copy.ar, v.copy.en)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ReviewScreens />

      {/* دعوة للتسوق */}
      <section className="container-page py-16 text-center md:py-20">
        <h2 className="font-display text-2xl text-cream sm:text-3xl">
          {tr("جاهز تختار ساعتك؟", "Ready to choose your watch?")}
        </h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:bg-brass-light"
          >
            {tr("تسوق الساعات", "Shop watches")} <ArrowLeft size={16} className="ltr:rotate-180" />
          </Link>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-[#25D366] hover:text-[#25D366]"
          >
            <WhatsAppIcon size={17} /> {tr("اطلب على واتساب", "Order on WhatsApp")}
          </a>
        </div>
      </section>
    </div>
  );
}
