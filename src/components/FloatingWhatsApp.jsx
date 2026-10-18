import { useLocation } from "react-router-dom";
import { WhatsAppIcon } from "./SocialIcons";
import { SOCIAL_LINKS } from "../data/social";
import { useLang } from "../i18n/LanguageContext";

// زرار واتساب عائم — أسرع طريق للطلب من أي صفحة.
// في صفحة المنتج على الموبايل بيستخبى لأن فيه شريط طلب ثابت تحت.
export default function FloatingWhatsApp() {
  const { pathname } = useLocation();
  const { tr } = useLang();
  const onProduct = pathname.startsWith("/product/");

  return (
    <a
      href={SOCIAL_LINKS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={tr("اطلب على واتساب", "Order on WhatsApp")}
      className={`fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] end-4 z-40 items-center lg:bottom-5 lg:end-5 gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/50 transition-transform hover:-translate-y-0.5 sm:px-5 ${
        onProduct ? "hidden lg:flex" : "flex"
      }`}
    >
      <WhatsAppIcon size={22} />
      <span className="hidden sm:inline">{tr("اطلب على واتساب", "Order on WhatsApp")}</span>
    </a>
  );
}
