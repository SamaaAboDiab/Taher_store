import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Check, ShoppingBag, ShieldCheck, ArrowUpRight, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLang } from "../i18n/LanguageContext";
import OrderModal from "./OrderModal";

export default function QuickViewModal({ product: rawProduct, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { addItem } = useCart();
  const { tr, loc } = useLang();

  if (!rawProduct) return null;
  const product = loc(rawProduct);

  const handleAdd = () => {
    addItem(rawProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#121215] p-6 text-cream shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={tr("إغلاق المعاينة", "Close preview")}
          className="absolute end-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-colors hover:border-brass hover:text-brass"
        >
          <X size={18} />
        </button>

        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* معرض الصور */}
          <div className="space-y-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d10]">
              <img
                src={product.gallery?.[activeImg] || product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute start-3 top-3 rounded-full bg-brass/20 px-2.5 py-1 text-[11px] font-semibold text-brass border border-brass/40 backdrop-blur-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {product.gallery?.length > 1 && (
              <div className="flex gap-2.5">
                {product.gallery.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveImg(i)}
                    className={`h-14 w-14 overflow-hidden rounded-xl border p-1 bg-[#0d0d10] transition-colors ${
                      activeImg === i ? "border-brass ring-1 ring-brass" : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full rounded-lg object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* التفاصيل والشراء */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-brass uppercase">
              <span>{product.brand}</span>
              <span>·</span>
              <span>{product.material}</span>
            </div>

            <h3 className="font-display mt-2 text-2xl font-bold text-cream leading-snug">
              {product.name}
            </h3>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-brass">
                {product.price.toLocaleString()} {product.currency}
              </span>
              <span className="text-xs text-muted">{tr("معاينة قبل الدفع", "Inspect before you pay")}</span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-muted line-clamp-3">
              {product.description}
            </p>

            {/* المواصفات السريعة */}
            <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-[11px]">
              <div>
                <span className="text-muted block">{tr("الميناء:", "Dial:")}</span>
                <span className="text-cream font-medium truncate block">{product.dialColor}</span>
              </div>
              <div>
                <span className="text-muted block">{tr("السوار:", "Strap:")}</span>
                <span className="text-cream font-medium truncate block">
                  {product.strap}
                </span>
              </div>
            </div>

            {/* أزرار العمليات */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                onClick={handleAdd}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-semibold text-[#0e0e10] transition-transform hover:-translate-y-0.5 hover:bg-brass-light"
              >
                {added ? (
                  <>
                    <Check size={16} /> {tr("تمت الإضافة", "Added")}
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> {tr("إضافة للسلة", "Add to cart")}
                  </>
                )}
              </button>

              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/20 px-5 py-3 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-950/40"
              >
                <MessageCircle size={16} /> {tr("معاينة واتساب", "Order via WhatsApp")}
              </button>
            </div>

            <OrderModal
              isOpen={isOrderModalOpen}
              onClose={() => setIsOrderModalOpen(false)}
              product={rawProduct}
            />

            <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/5 text-xs text-muted">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-brass" /> {tr("معاينة قبل الدفع", "Inspect before paying")}
              </span>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="inline-flex items-center gap-1 text-brass hover:underline"
              >
                {tr("الصفحة الكاملة", "Full details")} <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
