import { useState } from "react";
import { X, MessageCircle, ShieldCheck, CheckCircle2, User, Phone, MapPin, Sparkles } from "lucide-react";
import { WHATSAPP_NUMBER } from "../data/social";
import { useLang } from "../i18n/LanguageContext";

export default function OrderModal({ isOpen, onClose, product: rawProduct, cartItems: rawCartItems, totalAmount }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { tr, loc, currency } = useLang();

  if (!isOpen) return null;

  const product = loc(rawProduct);
  const cartItems = rawCartItems?.map((item) => loc(item));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    let messageText = "";
    const siteUrl = window.location.origin;

    // بيانات العميل — مشتركة بين طلب السلة وطلب الساعة الواحدة
    const customerBlock =
      `👤 *${tr("بيانات العميل", "Customer details")}:*\n` +
      `- *${tr("الاسم", "Name")}:* ${customerName.trim()}\n` +
      `- *${tr("رقم الهاتف", "Phone")}:* ${customerPhone.trim()}\n` +
      (customerAddress.trim() ? `- *${tr("العنوان / المحافظة", "Address / City")}:* ${customerAddress.trim()}\n` : "") +
      (notes.trim() ? `- *${tr("ملاحظات", "Notes")}:* ${notes.trim()}\n` : "");

    if (cartItems && cartItems.length > 0) {
      const itemsList = cartItems
        .map((item, idx) => {
          const imgLink = item.image?.startsWith("http") ? item.image : `${siteUrl}${item.image}`;
          return `${idx + 1}. *${item.name}* (${item.brand || "T Hour"})\n   - ${tr("الكمية", "Qty")}: ${item.qty}\n   - ${tr("السعر", "Price")}: ${(item.price * item.qty).toLocaleString()} ${item.currency}\n   - ${tr("رابط الصورة", "Image")}: ${imgLink}`;
        })
        .join("\n\n");

      messageText =
        `👑 *${tr("طلب حجز مقتنيات من T HOUR", "Order request from T HOUR")}* 👑\n--------------------------------\n` +
        `📋 *${tr("تفاصيل الحقيبة", "Cart details")}:*\n${itemsList}\n\n` +
        `💰 *${tr("الإجمالي الكلي", "Total")}:* ${(totalAmount || 0).toLocaleString()} ${currency}\n--------------------------------\n` +
        customerBlock +
        `--------------------------------\n✨ ${tr(
          "أرجو التواصل لتأكيد موعد التوصيل والمعاينة المباشرة قبل الدفع.",
          "Please contact me to confirm delivery and inspection before payment."
        )}`;
    } else if (product) {
      const imgLink = product.image?.startsWith("http") ? product.image : `${siteUrl}${product.image}`;
      messageText =
        `👑 *${tr("طلب حجز ومعاينة ساعة من T HOUR", "Watch order & inspection request from T HOUR")}* 👑\n--------------------------------\n` +
        `⌚ *${tr("الساعة", "Watch")}:* ${product.name}\n` +
        `🏷️ *${tr("الماركة", "Brand")}:* ${product.brand || "T Hour"}\n` +
        `💰 *${tr("السعر", "Price")}:* ${product.price?.toLocaleString()} ${product.currency || currency}\n` +
        `🖼️ *${tr("صورة ومواصفات الساعة", "Watch image")}:* ${imgLink}\n--------------------------------\n` +
        customerBlock +
        `--------------------------------\n✨ ${tr(
          "أرجو التواصل لتأكيد موعد التوصيل والمعاينة المباشرة في يدي قبل الاستلام.",
          "Please contact me to confirm delivery and hands-on inspection before I accept."
        )}`;
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, "_blank");
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-cream placeholder-muted/50 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#121215] p-6 sm:p-8 shadow-2xl text-start overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label={tr("إغلاق النافذة", "Close")}
          className="absolute top-5 end-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-colors hover:text-cream hover:bg-white/10"
        >
          <X size={18} />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-display text-2xl font-bold text-cream">
              {tr("تم تحويل طلبك للواتساب بنجاح!", "Your order was sent to WhatsApp!")}
            </h3>
            <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
              {tr(
                "تم تجهيز رسالة تفاصيل الساعة وبياناتك على محادثة الواتساب الخاصة بـ T Hour. سيتواصل معك أحد مسؤولينا لتأكيد المعاينة.",
                "A message with the watch details and your info is ready in the T Hour WhatsApp chat. One of our team will contact you to confirm the inspection."
              )}
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="rounded-full bg-brass px-8 py-3 text-sm font-bold text-[#0e0e10] transition-colors hover:bg-brass-light"
              >
                {tr("العودة للتصفح", "Back to browsing")}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-brass uppercase mb-1">
              <Sparkles size={14} />
              <span>{tr("طلب حجز ومعاينة فورية", "Instant order & inspection")}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-cream">{tr("تأكيد بيانات طلبك", "Confirm your details")}</h3>
            <p className="text-xs text-muted mt-1">
              {tr(
                "سجل اسمك ورقمك وسنقوم بإرسال تفاصيل الساعة وصورتها مباشرة عبر الواتساب للمتابعة",
                "Enter your name and number and we'll send the watch details and photo straight to WhatsApp"
              )}
            </p>

            {product && (
              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d0d10] p-3.5">
                <div className="h-16 w-16 shrink-0 rounded-xl border border-white/10 bg-black/40 p-1 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono text-brass block uppercase">{product.brand}</span>
                  <div className="font-display text-sm font-semibold text-cream truncate">{product.name}</div>
                  <div className="font-mono text-sm font-bold text-brass mt-0.5">
                    {product.price?.toLocaleString()} {product.currency || currency}
                  </div>
                </div>
              </div>
            )}

            {cartItems && cartItems.length > 0 && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-[#0d0d10] p-3 text-xs text-muted flex justify-between items-center">
                <span>{tr(`إجمالي الطلب (${cartItems.length} ساعات):`, `Order total (${cartItems.length} items):`)}</span>
                <span className="font-mono text-base font-bold text-brass">
                  {(totalAmount || 0).toLocaleString()} {currency}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-cream mb-1.5 flex items-center gap-1.5">
                  <User size={13} className="text-brass" /> {tr("الاسم بالكامل", "Full name")} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={tr("مثال: أحمد محمد", "e.g. Ahmed Mohamed")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-cream mb-1.5 flex items-center gap-1.5">
                  <Phone size={13} className="text-brass" /> {tr("رقم الهاتف أو الواتساب", "Phone or WhatsApp number")} <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="010XXXXXXXX"
                  className={`${inputClass} text-start`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-cream mb-1.5 flex items-center gap-1.5">
                  <MapPin size={13} className="text-brass" /> {tr("المحافظة / العنوان (للمعاينة والتوصيل)", "City / Address (for delivery & inspection)")}
                </label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder={tr("مثال: القاهرة - التجمع الخامس", "e.g. Cairo - New Cairo")}
                  className={inputClass}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/30 transition-all hover:bg-emerald-500"
                >
                  <MessageCircle size={18} />
                  {tr("إرسال الطلب والتفاصيل عبر واتساب", "Send order via WhatsApp")}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-muted text-center pt-1">
                <ShieldCheck size={14} className="text-brass shrink-0" />
                <span>
                  {tr(
                    "المعاينة قبل الدفع — لا تدفع أي مبالغ حتى تستلم ساعتك وتفحصها بنفسك",
                    "Inspect before you pay — pay nothing until you receive and check your watch yourself"
                  )}
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
