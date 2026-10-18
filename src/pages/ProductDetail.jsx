import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShieldCheck,
  Truck,
  Check,
  ChevronLeft,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  Eye,
  Award
} from "lucide-react";
import { fetchProductById, products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useLang } from "../i18n/LanguageContext";
import ProductCard from "../components/ProductCard";
import OrderModal from "../components/OrderModal";

export default function ProductDetail() {
  const { id } = useParams();
  const [rawProduct, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { addItem } = useCart();
  const { tr, loc } = useLang();

  useEffect(() => {
    setProduct(null);
    setActiveImg(0);
    setAdded(false);
    fetchProductById(id)
      .then(setProduct)
      .catch(() => setProduct(false));
    window.scrollTo({ top: 0 });
  }, [id]);

  if (rawProduct === null) {
    return (
      <div className="container-page py-32 text-center text-muted animate-pulse font-display text-lg">
        {tr("جاري تحضير تفاصيل الساعة الفاخرة…", "Preparing watch details…")}
      </div>
    );
  }

  if (rawProduct === false) {
    return (
      <div className="container-page py-28 text-center">
        <p className="font-display text-2xl text-cream">
          {tr("الساعة المطلوبة غير متوفرة حالياً", "This watch is currently unavailable")}
        </p>
        <Link
          to="/shop"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brass px-6 py-2.5 text-xs font-bold text-[#0e0e10]"
        >
          {tr("الرجوع إلى كتالوج الساعات", "Back to the watch catalogue")}
        </Link>
      </div>
    );
  }

  const product = loc(rawProduct);

  const related = products
    .filter((p) => (p.brand === product.brand || p.category === product.category) && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    addItem(rawProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // بنعرض بس المواصفات المكتوبة فعلاً للساعة
  const specsList = [
    { label: tr("التشكيلة", "Collection"), val: product.brand },
    { label: tr("الفئة", "For"), val: product.gender === "women" ? tr("حريمي", "Women") : tr("رجالي", "Men") },
    { label: tr("الهيكل", "Case"), val: product.material },
    { label: tr("الحركة", "Movement"), val: product.movement },
    { label: tr("ألوان الميناء", "Dial colours"), val: product.dialColor },
    { label: tr("السوار / الحزام", "Strap / bracelet"), val: product.strap },
  ].filter((s) => s.val);

  const crumbSep = <ChevronLeft size={14} className="ltr:rotate-180" />;

  return (
    <div className="container-page pt-6 pb-48 md:pt-10 lg:py-16">
      {/* مسار التصفح */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 overflow-hidden text-xs text-muted md:mb-8">
        <Link to="/" className="hover:text-brass transition-colors">{tr("الرئيسية", "Home")}</Link>
        {crumbSep}
        <Link to="/shop" className="hover:text-brass transition-colors">{tr("الساعات", "Watches")}</Link>
        {crumbSep}
        <Link to={`/shop?brand=${encodeURIComponent(product.brand)}`} className="hover:text-brass transition-colors">{product.brand}</Link>
        {crumbSep}
        <span className="text-cream truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* معرض الصور التفاعلي */}
        <div className="lg:col-span-6 space-y-4" data-aos="fade-up">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d10] shadow-2xl">
            <img
              src={product.gallery?.[activeImg] || product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-4 start-4 rounded-full bg-brass/20 px-3 py-1 text-xs font-bold text-brass border border-brass/40 backdrop-blur-md">
                {product.badge}
              </span>
            )}
            <div className="absolute bottom-4 end-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] text-cream/70 backdrop-blur-md border border-white/10">
              <Eye size={13} />
              <span>{tr("صورة حقيقية من صفحتنا", "Real photo from our page")}</span>
            </div>
          </div>

          {/* مصغرات زوايا الساعة */}
          {product.gallery?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.gallery.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImg(i)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl border p-2 bg-[#0d0d10] transition-all ${
                    activeImg === i
                      ? "border-brass ring-2 ring-brass/40 scale-105"
                      : "border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full rounded-xl object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* تفاصيل الساعة والطلب */}
        <div className="lg:col-span-6 flex flex-col" data-aos="fade-up" data-aos-delay="100">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brass uppercase">
            <Sparkles size={13} />
            <span>{product.brand}</span>
            <span>·</span>
            <span>{product.material}</span>
          </div>

          <h1 className="font-display mt-2 text-2xl font-extrabold text-cream leading-snug sm:text-4xl">
            {product.name}
          </h1>

          {/* السعر وبادج الضمان */}
          <div className="mt-5 flex flex-wrap items-baseline gap-4 rounded-2xl border border-white/[0.06] bg-[#121215] p-5">
            <div>
              <span className="text-[11px] text-muted block">{tr("السعر", "Price")}</span>
              <span className="font-mono text-3xl font-extrabold text-brass">
                {product.price.toLocaleString()} {product.currency}
              </span>
            </div>
            <div className="ms-auto flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              <Check size={14} /> {tr("متوفرة — شحن لكل مصر", "In stock — ships across Egypt")}
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          {/* أزرار الإجراء السريع */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAdd}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-brass px-7 py-4 text-sm font-bold text-[#0e0e10] shadow-lg shadow-brass/20 transition-all hover:-translate-y-0.5 hover:bg-brass-light"
            >
              {added ? (
                <>
                  <Check size={18} /> {tr("تمت الإضافة لحقيبتك", "Added to your cart")}
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> {tr("إضافة إلى حقيبة الشراء", "Add to cart")}
                </>
              )}
            </button>

            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="flex items-center justify-center gap-2.5 rounded-full border border-emerald-500/40 bg-emerald-950/30 px-6 py-4 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-950/50"
            >
              <MessageCircle size={18} /> {tr("طلب معاينة عبر واتساب", "Order via WhatsApp")}
            </button>
          </div>

          <OrderModal
            isOpen={isOrderModalOpen}
            onClose={() => setIsOrderModalOpen(false)}
            product={rawProduct}
          />

          {/* بطاقات الضمان والخدمات الفاخرة */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-center text-xs">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <ShieldCheck size={18} className="mx-auto text-brass" />
              <span className="mt-2 block font-medium text-cream">{tr("معاينة قبل الدفع", "Inspect before paying")}</span>
              <span className="text-[10px] text-muted">{tr("استلم في يدك وافحص", "Check it in your hands")}</span>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <Award size={18} className="mx-auto text-brass" />
              <span className="mt-2 block font-medium text-cream">{tr("صور حقيقية", "Real photos")}</span>
              <span className="text-[10px] text-muted">{tr("اللي بتشوفه هو اللي هيوصلك", "What you see is what you get")}</span>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <Truck size={18} className="mx-auto text-brass" />
              <span className="mt-2 block font-medium text-cream">{tr("شحن لكل مصر", "Shipping across Egypt")}</span>
              <span className="text-[10px] text-muted">{tr("وتأكيد الطلب على واتساب", "Order confirmed on WhatsApp")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* جدول المواصفات الفنية التفصيلي */}
      <section className="mt-16 rounded-3xl border border-white/[0.08] bg-[#121215] p-6 sm:p-10" data-aos="fade-up">
        <h2 className="font-display text-xl font-bold text-cream sm:text-2xl mb-6 flex items-center gap-2">
          <Sparkles size={18} className="text-brass" />
          {tr("المواصفات", "Specifications")}
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {specsList.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3 text-xs"
            >
              <span className="text-muted shrink-0">{s.label}:</span>
              <span className="font-semibold text-cream text-end">{s.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ساعات مشابهة من نفس التشكيلة */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-white/10 pt-12" data-aos="fade-up">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-xl font-bold text-cream sm:text-2xl">
              {tr("ممكن يعجبك كمان", "You may also like")}
            </h2>
            <Link to="/shop" className="text-xs font-semibold text-brass hover:underline">
              {tr("عرض المزيد", "View more")}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* شريط طلب ثابت على الموبايل — السعر وزرار الطلب دايماً قدام العميل */}
      <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-40 border-t border-white/10 bg-[#0c0c0e]/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <span className="block truncate text-[11px] text-muted">{product.name}</span>
            <span className="font-mono text-lg font-bold text-brass">
              {product.price.toLocaleString()} {product.currency}
            </span>
          </div>
          <button
            onClick={handleAdd}
            aria-label={tr("إضافة للسلة", "Add to cart")}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors ${
              added ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" : "border-white/15 text-cream"
            }`}
          >
            {added ? <Check size={20} /> : <ShoppingBag size={20} />}
          </button>
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="flex h-12 shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-bold text-white"
          >
            <MessageCircle size={18} />
            {tr("اطلب الآن", "Order now")}
          </button>
        </div>
      </div>
    </div>
  );
}
