import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ArrowLeft, ShoppingBag, MessageCircle, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLang } from "../i18n/LanguageContext";
import OrderModal from "../components/OrderModal";

export default function Cart() {
  const { items, removeItem, total } = useCart();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { tr, loc, currency } = useLang();

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-28 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] text-brass">
          <ShoppingBag size={32} />
        </div>
        <h1 className="font-display mt-6 text-3xl font-bold text-cream">{tr("حقيبة المقتنيات فارغة", "Your cart is empty")}</h1>
        <p className="mt-2 text-sm text-muted">
          {tr(
            "لم تقم بإضافة أي ساعة بعد. استكشف مجموعتنا الفاخرة واختر ما يناسب ذوقك.",
            "You haven't added any watches yet. Explore our luxury collection and pick what suits your taste."
          )}
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brass px-8 py-3.5 text-sm font-bold text-[#0e0e10] transition-all hover:bg-brass-light"
        >
          {tr("تصفح كتالوج الساعات", "Browse the watch catalogue")} <ArrowLeft size={16} className="ltr:rotate-180" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10 md:py-16">
      <h1 className="font-display text-3xl font-extrabold text-cream sm:text-4xl text-start">
        {tr(`حقيبة المقتنيات (${items.length} قطع)`, `Your cart (${items.length} items)`)}
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* قائمة الساعات المضافة */}
        <div className="space-y-4">
          {items.map((raw) => {
            const item = loc(raw);
            return (
              <div
                key={item.id}
                className="flex items-center gap-5 rounded-3xl border border-white/[0.08] bg-[#121215] p-4 sm:p-5 transition-colors hover:border-brass/30"
              >
                <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl border border-white/10 bg-[#0d0d10] p-2 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1 text-start">
                  <span className="text-[10px] font-mono tracking-wider text-brass uppercase block">
                    {item.brand || "T HOUR"}
                  </span>
                  <Link
                    to={`/product/${item.id}`}
                    className="font-display text-sm sm:text-base font-semibold text-cream hover:text-brass transition-colors line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted">{tr("الكمية", "Qty")}: {item.qty}</p>
                  <div className="mt-2 font-mono text-sm sm:text-base font-bold text-brass">
                    {(item.price * item.qty).toLocaleString()} {item.currency}
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  aria-label={tr(`احذف ${item.name} من السلة`, `Remove ${item.name} from cart`)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}

          <div className="flex items-center gap-2 text-xs text-muted pt-4 border-t border-white/5">
            <CheckCircle2 size={15} className="text-brass" />
            <span>
              {tr(
                "شحن لكل محافظات مصر — ومصاريف الشحن بتتأكد معاك على واتساب",
                "Shipping across Egypt — delivery fees are confirmed with you on WhatsApp"
              )}
            </span>
          </div>
        </div>

        {/* ملخص الطلب والتأكيد */}
        <div className="h-fit rounded-3xl border border-white/[0.08] bg-[#121215] p-6 space-y-6">
          <h2 className="font-display text-xl font-bold text-cream pb-4 border-b border-white/5 text-start">
            {tr("ملخص الطلب", "Order summary")}
          </h2>

          <div className="space-y-3 text-xs text-muted">
            <div className="flex justify-between">
              <span>{tr("إجمالي الساعات", "Subtotal")}</span>
              <span className="font-mono text-cream font-semibold">{total.toLocaleString()} {currency}</span>
            </div>
            <div className="flex justify-between">
              <span>{tr("مصاريف الشحن", "Shipping fee")}</span>
              <span className="text-emerald-400 font-semibold">{tr("يتأكد على واتساب", "Confirmed on WhatsApp")}</span>
            </div>
            <div className="flex justify-between">
              <span>{tr("المعاينة", "Inspection")}</span>
              <span className="text-brass font-semibold">{tr("قبل الدفع", "Before paying")}</span>
            </div>
          </div>

          <div className="flex justify-between border-t border-white/10 pt-4 text-base font-bold text-cream">
            <span>{tr("الإجمالي (من غير الشحن)", "Total (excl. shipping)")}</span>
            <span className="font-mono text-xl text-brass">{total.toLocaleString()} {currency}</span>
          </div>

          {/* أزرار الحجز والدفع */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-950/40 py-3.5 text-sm font-bold text-emerald-400 transition-colors hover:bg-emerald-950/60"
            >
              <MessageCircle size={18} />
              {tr("تأكيد الطلب والمعاينة عبر واتساب", "Confirm order via WhatsApp")}
            </button>

            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="w-full rounded-full bg-brass py-3.5 text-sm font-bold text-[#0e0e10] shadow-lg shadow-brass/20 transition-all hover:bg-brass-light"
            >
              {tr("الدفع عند الاستلام والمعاينة", "Pay on delivery after inspection")}
            </button>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center text-xs text-muted">
            <ShieldCheck size={18} className="mx-auto text-brass mb-1.5" />
            <span>
              {tr(
                "لن تدفع أي مبالغ الآن — الدفع يتم فقط بعد فتح الشحنة ومعاينة ساعتك في يدك والتأكد من مطابقتها.",
                "You pay nothing now — payment happens only after you open the parcel and check your watch in your hands."
              )}
            </span>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cartItems={items}
        totalAmount={total}
      />
    </div>
  );
}
