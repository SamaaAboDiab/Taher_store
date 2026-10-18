import { useState } from "react";
import { Phone, Send, Check, Copy, ChevronDown, ArrowUpRight } from "lucide-react";
import { WhatsAppIcon, TikTokIcon, InstagramIcon, FacebookIcon } from "../components/SocialIcons";
import { SOCIAL_LINKS, WHATSAPP_NUMBER } from "../data/social";
import { useLang } from "../i18n/LanguageContext";

const LOCAL_NUMBER = "01032482784";

const TOPICS = [
  { id: "model", ar: "استفسار عن موديل", en: "About a model" },
  { id: "order", ar: "متابعة طلب", en: "Order follow-up" },
  { id: "other", ar: "حاجة تانية", en: "Something else" },
];

// إجابات من معلومات مؤكدة بس (الدفع عند الاستلام، الشحن لكل مصر، الطلب عبر واتساب)
const FAQ = [
  {
    q: { ar: "أطلب إزاي؟", en: "How do I order?" },
    a: {
      ar: "اختار الساعة من الموقع ودوس \"اطلب الآن\"، أو ابعتلنا صورتها على واتساب — وهنأكد معاك اللون والعنوان.",
      en: "Pick a watch on the site and tap \"Order now\", or send us its photo on WhatsApp — we'll confirm the colour and address with you.",
    },
  },
  {
    q: { ar: "الدفع إزاي؟", en: "How do I pay?" },
    a: {
      ar: "الدفع عند الاستلام، وبعد ما تفتح الشحنة وتعاين الساعة بنفسك.",
      en: "Cash on delivery — after you open the parcel and inspect the watch yourself.",
    },
  },
  {
    q: { ar: "بتشحنوا لفين؟", en: "Where do you ship?" },
    a: {
      ar: "لكل محافظات مصر. مصاريف الشحن بتتأكد معاك على واتساب حسب محافظتك.",
      en: "To every governorate in Egypt. The delivery fee is confirmed with you on WhatsApp based on your city.",
    },
  },
  {
    q: { ar: "الصور حقيقية؟", en: "Are the photos real?" },
    a: {
      ar: "أيوه، كل صور الساعات متصورة بإيدينا — وتقدر تشوف فيديوهات أكتر على تيك توك وإنستجرام.",
      en: "Yes, every watch photo is ours — and you can see more videos on TikTok and Instagram.",
    },
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ topic: "model", name: "", message: "" });
  const { tr } = useLang();

  const channels = [
    {
      id: "whatsapp",
      label: tr("واتساب", "WhatsApp"),
      value: LOCAL_NUMBER,
      note: tr("أسرع رد", "Fastest reply"),
      href: SOCIAL_LINKS.whatsapp,
      Icon: WhatsAppIcon,
      accent: "text-[#25D366] border-[#25D366]/40 bg-[#25D366]/10",
    },
    {
      id: "call",
      label: tr("اتصال", "Call"),
      value: LOCAL_NUMBER,
      href: `tel:+${WHATSAPP_NUMBER}`,
      Icon: Phone,
      accent: "text-brass border-brass/40 bg-brass/10",
    },
    { id: "tiktok", label: "TikTok", value: "@t.hour0", href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon, accent: "text-cream border-white/20 bg-white/5" },
    { id: "instagram", label: "Instagram", value: "@t_hour_", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon, accent: "text-[#E1306C] border-[#E1306C]/40 bg-[#E1306C]/10" },
    { id: "facebook", label: "Facebook", value: "T hour", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon, accent: "text-[#1877F2] border-[#1877F2]/40 bg-[#1877F2]/10" },
  ];

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(LOCAL_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // الحافظة مش متاحة — الرقم ظاهر قدام العميل يقدر ينسخه بإيده
    }
  };

  // الفورم بيفتح واتساب برسالة العميل جاهزة — مفيش سيرفر يستقبل الرسايل
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    const topic = TOPICS.find((t) => t.id === form.topic);
    const text =
      `${tr(topic.ar, topic.en)}\n` +
      `${tr("الاسم", "Name")}: ${form.name.trim()}\n\n${form.message.trim()}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
    setForm((f) => ({ ...f, name: "", message: "" }));
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="container-page py-10 md:py-16">
      {/* العنوان */}
      <header data-aos="fade-up" className="max-w-xl">
        <p className="text-xs font-mono tracking-[0.18em] text-brass uppercase">{tr("تواصل معنا", "Contact us")}</p>
        <h1 className="font-display mt-2 text-3xl font-bold text-cream sm:text-4xl">
          {tr("كلمنا — بنرد بسرعة", "Talk to us — we reply fast")}
        </h1>
        <p className="mt-3 text-base text-muted">
          {tr(
            "متجر أونلاين بيوصلك لحد البيت في أي محافظة. أسرع طريقة توصلنا بيها واتساب.",
            "An online store delivering to your door anywhere in Egypt. WhatsApp is the fastest way to reach us."
          )}
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* طرق التواصل */}
        <section data-aos="fade-up" className="lg:col-span-5" aria-label={tr("طرق التواصل", "Ways to reach us")}>
          <ul className="space-y-3">
            {channels.map(({ id, label, value, note, href, Icon, accent }) => (
              <li key={id}>
                <a
                  href={href}
                  target={id === "call" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#121215] p-3 pe-4 transition-colors hover:border-brass/40"
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${accent}`}>
                    <Icon size={22} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-sm font-bold text-cream">
                      {label}
                      {note && (
                        <span className="rounded-full bg-[#25D366]/15 px-2 py-0.5 text-[11px] font-semibold text-[#25D366]">{note}</span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted"><bdi dir="ltr">{value}</bdi></span>
                  </span>
                  <ArrowUpRight size={18} className="shrink-0 text-muted transition-colors group-hover:text-brass rtl:-scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={copyNumber}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-muted transition-colors hover:text-cream"
          >
            {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
            {copied ? tr("اتنسخ الرقم", "Number copied") : tr("انسخ الرقم", "Copy number")}
          </button>
        </section>

        {/* الفورم */}
        <section data-aos="fade-up" data-aos-delay="80" className="lg:col-span-7">
          <form onSubmit={submit} className="rounded-3xl border border-white/[0.08] bg-[#121215] p-5 sm:p-8">
            <h2 className="font-display text-xl font-bold text-cream sm:text-2xl">
              {tr("ابعت استفسارك", "Send your question")}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {tr("لما تدوس إرسال هتتفتح محادثة واتساب والرسالة جاهزة.", "Pressing Send opens WhatsApp with your message ready.")}
            </p>

            <fieldset className="mt-6">
              <legend className="mb-2 text-sm text-cream/90">{tr("بخصوص إيه؟", "What's it about?")}</legend>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <label
                    key={t.id}
                    className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-colors has-focus-visible:outline-2 has-focus-visible:outline-brass ${
                      form.topic === t.id ? "border-brass bg-brass/10 font-semibold text-brass" : "border-white/10 text-cream/80 hover:border-white/25"
                    }`}
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={t.id}
                      checked={form.topic === t.id}
                      onChange={() => setForm((f) => ({ ...f, topic: t.id }))}
                      className="sr-only"
                    />
                    {tr(t.ar, t.en)}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-5">
              <label htmlFor="contact-name" className="mb-1.5 block text-sm text-cream/90">{tr("اسمك", "Your name")}</label>
              <input
                id="contact-name"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-base text-cream outline-none focus:border-brass/60"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="contact-message" className="mb-1.5 block text-sm text-cream/90">{tr("رسالتك", "Your message")}</label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder={tr("مثال: عايز أعرف ألوان ساعة السكيلتون المتاحة", "e.g. Which colours does the skeleton watch come in?")}
                className="w-full resize-none rounded-xl border border-white/10 bg-ink px-4 py-3 text-base text-cream placeholder:text-muted/70 outline-none focus:border-brass/60"
              />
            </div>

            <button
              type="submit"
              className={`mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-colors ${
                sent ? "bg-success text-ink" : "bg-[#25D366] text-white hover:bg-[#1fbe5a]"
              }`}
            >
              {sent ? (
                <>
                  <Check size={17} /> {tr("اتفتحت محادثة واتساب — ابعت الرسالة من هناك", "WhatsApp opened — send the message there")}
                </>
              ) : (
                <>
                  <Send size={16} className="rtl:-scale-x-100" /> {tr("إرسال عبر واتساب", "Send via WhatsApp")}
                </>
              )}
            </button>
          </form>
        </section>
      </div>

      {/* أسئلة شائعة */}
      <section data-aos="fade-up" className="mt-14 md:mt-20" aria-labelledby="faq-title">
        <h2 id="faq-title" className="font-display text-2xl font-bold text-cream sm:text-3xl">
          {tr("أسئلة بتتكرر", "Common questions")}
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {FAQ.map((item) => (
            <details key={item.q.en} className="group rounded-2xl border border-white/[0.08] bg-[#121215] open:border-brass/30">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-cream [&::-webkit-details-marker]:hidden">
                {tr(item.q.ar, item.q.en)}
                <ChevronDown size={18} className="shrink-0 text-brass transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{tr(item.a.ar, item.a.en)}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
