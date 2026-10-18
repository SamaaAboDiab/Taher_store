import { Link } from "react-router-dom";
import LogoMark from "./LogoMark";
import {
  InstagramIcon,
  TikTokIcon,
  FacebookIcon,
  WhatsAppIcon,
} from "./SocialIcons";
import { SOCIAL_LINKS } from "../data/social";
import { useLang } from "../i18n/LanguageContext";

export default function Footer() {
  const { tr } = useLang();
  return (
    <footer className="border-t border-white/[0.08] bg-[#09090b]">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <LogoMark size={30} animate={false} />
            <div className="flex flex-col">
              <span dir="ltr" className="font-display text-xl font-bold tracking-wider text-cream">T HOUR</span>
              <span dir="ltr" className="text-[9px] font-mono font-semibold tracking-[0.25em] text-brass uppercase -mt-0.5">
                TAHER MOSTAFA
              </span>
            </div>
          </Link>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted">
            {tr(
              "الوقت مش أرقام… الوقت قيمة ⌚ ساعات فخمة بأسعار مميزة، صور حقيقية من غير فلاتر، ومعاينة قبل الدفع وشحن لكل مصر.",
              "Time isn't numbers… time is value ⌚ Luxury watches at great prices, real unfiltered photos, inspection before you pay and shipping across Egypt."
            )}
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: InstagramIcon, href: SOCIAL_LINKS.instagram, label: tr("إنستجرام T Hour", "T Hour on Instagram") },
              { Icon: TikTokIcon, href: SOCIAL_LINKS.tiktok, label: tr("تيك توك T Hour", "T Hour on TikTok") },
              { Icon: FacebookIcon, href: SOCIAL_LINKS.facebook, label: tr("فيسبوك T Hour", "T Hour on Facebook") },
              { Icon: WhatsAppIcon, href: SOCIAL_LINKS.whatsapp, label: tr("واتساب T Hour", "T Hour on WhatsApp") },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-cream/80 transition-colors hover:border-brass hover:text-brass"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-mono tracking-[0.2em] text-brass uppercase">
            {tr("التشكيلات", "Collections")}
          </h4>
          <ul className="mt-4 space-y-2.5 text-xs text-muted">
            <li>
              <Link to="/shop?gender=men" className="hover:text-cream transition-colors">
                {tr("ساعات رجالي", "Men's watches")}
              </Link>
            </li>
            <li>
              <Link to="/shop?gender=women" className="hover:text-cream transition-colors">
                {tr("ساعات حريمي", "Women's watches")}
              </Link>
            </li>
            <li>
              <Link to="/shop?brand=Skeleton" className="hover:text-cream transition-colors">
                {tr("سكيلتون وميناء مكشوف", "Skeleton & open dial")}
              </Link>
            </li>
            <li>
              <Link to="/shop?brand=Chrono" className="hover:text-cream transition-colors">
                {tr("كرونوغراف", "Chronograph")}
              </Link>
            </li>
            <li>
              <Link to="/accessories" className="hover:text-cream transition-colors">
                {tr("علب الساعات الخشبية والإكسسوارات", "Watch boxes & accessories")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-mono tracking-[0.2em] text-brass uppercase">
            {tr("خدمة العملاء", "Customer care")}
          </h4>
          <ul className="mt-4 space-y-2.5 text-xs text-muted">
            <li>
              <span className="text-cream font-medium">{tr("معاينة قبل الدفع عند الاستلام", "Inspect before paying on delivery")}</span>
            </li>
            <li>
              <span className="text-cream font-medium">{tr("شحن لكل محافظات مصر", "Shipping across Egypt")}</span>
            </li>
            <li>
              <span className="text-cream font-medium">{tr("الطلب والتأكيد على واتساب 01032482784", "Order on WhatsApp 01032482784")}</span>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cream transition-colors">
                {tr("محتار تختار؟ كلمنا", "Not sure? Talk to us")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-mono tracking-[0.2em] text-brass uppercase">
            {tr("عن T Hour", "About T Hour")}
          </h4>
          <ul className="mt-4 space-y-2.5 text-xs text-muted">
            <li>
              <Link to="/about" className="hover:text-cream transition-colors">
                {tr("قصتنا ومعاييرنا", "Our story & standards")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cream transition-colors">
                {tr("تواصل معنا", "Contact us")}
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-cream transition-colors">
                {tr("كتالوج الساعات الكامل", "Full watch catalogue")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-page flex flex-col items-center justify-between gap-3 pt-6 pb-40 text-xs text-muted sm:flex-row lg:pb-6">
          <p>
            © {new Date().getFullYear()} T Hour. {tr("جميع الحقوق محفوظة.", "All rights reserved.")}
          </p>
          <p className="font-mono text-brass/80">{tr("اختر وقتك.. وامنح لحظة مميزة", "Choose your time… gift a special moment")}</p>
        </div>
      </div>
    </footer>
  );
}
