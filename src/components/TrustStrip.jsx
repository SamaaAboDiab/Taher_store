import { Truck, Eye, Gift, Camera } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";

const perks = [
  { icon: Eye, ar: "معاينة قبل الدفع", en: "Inspect before you pay" },
  { icon: Truck, ar: "شحن لكل مصر", en: "Shipping across Egypt" },
  { icon: Camera, ar: "صور حقيقية", en: "Real photos" },
  { icon: Gift, ar: "جاهزة للهدايا", en: "Gift-ready" },
];

// شريط مختصر لأسباب الثقة — تحت الـ Hero مباشرة
export default function TrustStrip() {
  const { tr } = useLang();
  return (
    <section className="border-y border-white/[0.08] bg-[#0c0c0e]">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-3 py-5 text-sm text-cream/85 md:grid-cols-4">
        {perks.map((p) => (
          <li key={p.en} className="flex items-center gap-2 md:justify-center">
            <p.icon size={18} className="shrink-0 text-brass" aria-hidden="true" />
            <span className="font-medium">{tr(p.ar, p.en)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
