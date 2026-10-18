import { useEffect, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { REVIEW_SCREENSHOTS } from "../data/reviews";
import { useLang } from "../i18n/LanguageContext";

// آراء العملاء الحقيقية كـ screenshots من محادثات واتساب، مع عرض مكبّر عند الضغط
export default function ReviewScreens() {
  const { tr } = useLang();
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (REVIEW_SCREENSHOTS.length === 0) return null;

  return (
    <section className="border-t border-white/[0.08] py-16 md:py-20">
      <div className="container-page">
        <div data-aos="fade-up" className="max-w-xl">
          <p className="flex items-center gap-2 text-xs font-mono tracking-widest text-brass uppercase">
            <MessageCircle size={14} /> {tr("من واتساب مباشرة", "Straight from WhatsApp")}
          </p>
          <h2 className="font-display mt-2 text-2xl font-bold text-cream sm:text-4xl">
            {tr("آراء عملائنا", "What our customers say")}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {tr("رسايل حقيقية من عملاء استلموا ساعاتهم.", "Real messages from customers who received their watches.")}
          </p>
        </div>

        <div className="mt-8 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          {REVIEW_SCREENSHOTS.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={tr(`تكبير رأي العميل ${i + 1}`, `Enlarge customer review ${i + 1}`)}
              className="mb-3 block w-full overflow-hidden rounded-2xl border border-white/[0.08] transition-colors hover:border-brass/50 sm:mb-4"
            >
              <img src={src} alt={tr(`رأي عميل ${i + 1}`, `Customer review ${i + 1}`)} loading="lazy" className="w-full" />
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(null)}
        >
          <button
            onClick={() => setOpen(null)}
            aria-label={tr("إغلاق", "Close")}
            className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-cream"
          >
            <X size={20} />
          </button>
          <img
            src={REVIEW_SCREENSHOTS[open]}
            alt=""
            className="max-h-[90vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
