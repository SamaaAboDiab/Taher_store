import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { X, ShoppingBag, Search, Sparkles, MessageCircle, Languages, Home, Watch, Info, Phone } from "lucide-react";
import LogoMark from "./LogoMark";
import { useCart } from "../context/CartContext";
import { useLang } from "../i18n/LanguageContext";
import { SOCIAL_LINKS } from "../data/social";
import { TikTokIcon, InstagramIcon, FacebookIcon } from "./SocialIcons";

const links = [
  { to: "/", ar: "الرئيسية", en: "Home", icon: Home, end: true },
  { to: "/shop", ar: "الساعات", en: "Watches", icon: Watch },
  { to: "/about", ar: "من نحن", en: "About Us", icon: Info },
  { to: "/contact", ar: "تواصل معنا", en: "Contact Us", icon: Phone },
];

function LangToggle({ className = "" }) {
  const { lang, toggleLang, tr } = useLang();
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={tr("Switch to English", "التبديل إلى العربية")}
      className={`flex h-11 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 text-xs font-bold text-cream transition-colors hover:border-brass hover:text-brass ${className}`}
    >
      <Languages size={15} className="text-brass" />
      <span>{lang === "ar" ? "EN" : "ع"}</span>
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const { count } = useCart();
  const { tr } = useLang();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
    setOpen(false);
  };

  return (
    <>
      {/* شريط الإعلان العلوي الفاخر */}
      <div className="bg-[#09090b] border-b border-white/[0.06] py-2 text-[11px] font-medium text-cream/80">
        <div className="container-page flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-brass animate-pulse" />
            <span>
              {tr(
                "الوقت مش أرقام… الوقت قيمة ⌚ · شحن لكل مصر 🚚",
                "Time isn't numbers… time is value ⌚ · Shipping across Egypt 🚚"
              )}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[
                { href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon, label: "TikTok" },
                { href: SOCIAL_LINKS.instagram, Icon: InstagramIcon, label: "Instagram" },
                { href: SOCIAL_LINKS.facebook, Icon: FacebookIcon, label: "Facebook" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`T Hour — ${label}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-cream/70 hover:text-brass transition-colors"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-brass hover:text-brass-light transition-colors"
            >
              <MessageCircle size={13} />
              <span>{tr("اطلب على واتساب", "Order on WhatsApp")}</span>
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-[#0c0c0e]/95 backdrop-blur-md border-white/[0.08] shadow-lg shadow-black/40"
            : "bg-[#0c0c0e]/80 backdrop-blur-md border-transparent"
        }`}
      >
        <div className="container-page flex h-20 items-center justify-between">
          {/* الشعار */}
          <Link to="/" className="flex items-center gap-3 group">
            <LogoMark />
            <div className="flex flex-col">
              <span dir="ltr" className="font-display text-2xl font-bold tracking-wider text-cream group-hover:text-brass transition-colors">
                T HOUR
              </span>
              <span dir="ltr" className="text-[9px] font-mono font-semibold tracking-[0.25em] text-brass uppercase -mt-0.5">
                TAHER MOSTAFA
              </span>
            </div>
          </Link>

          {/* روابط التنقل الرئيسية */}
          <nav
            className="hidden lg:flex items-center gap-9"
            aria-label={tr("التنقل الرئيسي", "Main navigation")}
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors ${
                    isActive ? "text-brass font-bold" : "text-cream/70 hover:text-cream"
                  }`
                }
              >
                {tr(l.ar, l.en)}
              </NavLink>
            ))}
          </nav>

          {/* البحث واللغة والسلة وموبايل منيو */}
          <div className="flex items-center gap-3">
            <form
              onSubmit={submitSearch}
              className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 focus-within:border-brass/60 focus-within:bg-white/[0.06] transition-colors"
            >
              <Search size={15} className="text-muted" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tr("ابحث عن ساعة (سكيلتون، جلد...)", "Search watches (skeleton, leather...)")}
                aria-label={tr("ابحث عن ساعة", "Search for a watch")}
                className="bg-transparent text-xs text-cream placeholder:text-muted outline-none w-44 lg:w-52"
              />
            </form>

            <LangToggle />

            <Link
              to="/cart"
              aria-label={tr(`السلة، ${count} منتج`, `Cart, ${count} items`)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] hover:border-brass hover:text-brass transition-colors"
            >
              <ShoppingBag size={19} className="text-cream" />
              {count > 0 && (
                <span className="absolute -top-1 -end-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brass px-1 text-[11px] font-bold text-[#0e0e10]">
                  {count}
                </span>
              )}
            </Link>

            <button
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-cream hover:text-brass"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? tr("قفل البحث", "Close search") : tr("بحث", "Search")}
            >
              {open ? <X size={20} /> : <Search size={19} />}
            </button>
          </div>
        </div>

        {/* شريط البحث على الموبايل */}
        {open && (
          <div className="md:hidden border-t border-white/10 bg-[#0e0e11] px-4 py-3">
            <form
              onSubmit={submitSearch}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 focus-within:border-brass/60"
            >
              <Search size={16} className="text-muted" aria-hidden="true" />
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tr("ابحث باسم الموديل أو اللون...", "Search by model or colour...")}
                aria-label={tr("ابحث عن ساعة", "Search for a watch")}
                className="bg-transparent text-base text-cream placeholder:text-muted outline-none w-full"
              />
            </form>
          </div>
        )}
      </header>

      {/* شريط التنقل السفلي — بديل المنيو على الشاشات الصغيرة */}
      <nav
        aria-label={tr("التنقل الرئيسي", "Main navigation")}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0c0c0e]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ul className="grid grid-cols-4">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                    isActive ? "text-brass" : "text-cream/60 hover:text-cream"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <l.icon size={21} strokeWidth={isActive ? 2.4 : 1.8} aria-hidden="true" />
                    <span className={isActive ? "font-bold" : ""}>{tr(l.ar, l.en)}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
