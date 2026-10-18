import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Check, Layers } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLang } from "../i18n/LanguageContext";

export default function ProductCard({ product: rawProduct, index = 0, onQuickView }) {
  const { addItem } = useCart();
  const { tr, loc } = useLang();
  const [added, setAdded] = useState(false);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const product = loc(rawProduct);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(rawProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleQuick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(rawProduct);
  };

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const secondaryImage = product.hoverImage || (images.length > 1 ? images[1] : null);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={(index % 4) * 70}
      className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-[#121215] overflow-hidden transition-all duration-300 hover:border-brass/50 hover:shadow-2xl hover:shadow-black/60"
    >
      {/* قسم الصورة مع تبديل الزاوية التلقائي عند الـ Hover */}
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-[#0a0a0c] cursor-pointer"
      >
        {/* الصورة الأساسية الأولى */}
        <img
          src={images[activeAngleIndex] || product.image}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover transition-all duration-500 ${
            secondaryImage && activeAngleIndex === 0
              ? "group-hover:opacity-0 group-hover:scale-105"
              : "group-hover:scale-105"
          }`}
        />

        {/* صورة الزاوية الثانية التي تظهر عند تمرير الماوس (Hover Angle) */}
        {secondaryImage && activeAngleIndex === 0 && (
          <img
            src={secondaryImage}
            alt={tr(`${product.name} - زاوية أخرى`, `${product.name} - another angle`)}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* بادج الماركة أو التميز */}
        <div className="absolute top-3 start-3 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.badge ? (
            <span className="rounded-full bg-brass/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-brass border border-brass/30 backdrop-blur-sm">
              {product.badge}
            </span>
          ) : (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-mono tracking-wider text-cream/80 border border-white/10 backdrop-blur-sm">
              {product.brand}
            </span>
          )}
        </div>

        {/* مؤشر توفر زوايا متعددة للساعة */}
        {images.length > 1 && (
          <div className="absolute top-3 end-3 z-10 pointer-events-none hidden sm:flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-medium text-cream/70 border border-white/10 backdrop-blur-sm">
            <Layers size={11} className="text-brass" />
            <span>{tr(`${images.length} زوايا`, `${images.length} angles`)}</span>
          </div>
        )}

        {/* أزرار الإجراء السريع والمعاينة عند التحويم */}
        <div className="absolute inset-x-3 bottom-3 z-20 hidden md:flex items-center justify-center gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={handleQuick}
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1.5 text-xs font-medium text-cream border border-white/20 backdrop-blur-md transition-colors hover:border-brass hover:text-brass"
          >
            <Eye size={13} />
            {tr("معاينة سريعة", "Quick view")}
          </button>
        </div>
      </Link>

      {/* نقاط التبديل السريع بين الزوايا (إن وجدت أكثر من زاوية) */}
      {images.length > 1 && (
        <div className="flex justify-center bg-[#0e0e11] border-t border-white/[0.04]">
          {images.slice(0, 4).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveAngleIndex(i);
              }}
              aria-label={tr(`الزاوية ${i + 1}`, `Angle ${i + 1}`)}
              aria-pressed={activeAngleIndex === i}
              // مساحة لمس أكبر من النقطة نفسها
              className="group/dot flex h-8 items-center px-1.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all ${
                  activeAngleIndex === i ? "w-5 bg-brass" : "w-2 bg-white/25 group-hover/dot:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* تفاصيل الساعة */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-1">
          <span className="text-brass tracking-wider">{product.brand}</span>
          <span>{tr(product.gender === "women" ? "حريمي" : "رجالي", product.gender === "women" ? "Women" : "Men")}</span>
        </div>

        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-display text-sm font-semibold text-cream leading-snug line-clamp-2 transition-colors group-hover:text-brass-light sm:text-base">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-[11px] text-muted/80 line-clamp-1">
          {product.movement || product.dialColor}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.05]">
          <div className="flex flex-col">
            <span className="text-[11px] text-muted">{tr("السعر", "Price")}</span>
            <span className="font-mono text-base font-bold text-brass sm:text-lg">
              {product.price.toLocaleString()} {product.currency}
            </span>
          </div>

          <button
            onClick={handleAdd}
            aria-label={tr(`إضافة ${product.name} للسلة`, `Add ${product.name} to cart`)}
            type="button"
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
              added
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                : "border-white/10 text-cream hover:border-brass hover:bg-brass hover:text-ink"
            }`}
          >
            {added ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
