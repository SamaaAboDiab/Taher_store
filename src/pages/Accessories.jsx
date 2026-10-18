import { useState } from "react";
import { Plus, Check, Sparkles } from "lucide-react";
import { accessories } from "../data/products";
import { useCart } from "../context/CartContext";
import { useLang } from "../i18n/LanguageContext";

export default function Accessories() {
  const { addItem } = useCart();
  const { tr, loc } = useLang();
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (a) => {
    addItem({ ...a, category: "accessory", gender: "unisex" });
    setAddedId(a.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="container-page py-10 md:py-16">
      <div data-aos="fade-up" className="mb-10 max-w-xl text-start">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-brass uppercase">
          <Sparkles size={14} />
          <span>{tr("ملحقات العناية والاقتناء", "Care & collecting essentials")}</span>
        </div>
        <h1 className="font-display mt-2 text-3xl font-extrabold text-cream sm:text-5xl">
          {tr("إكسسوارات وعلب الساعات الملكية", "Accessories & royal watch boxes")}
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          {tr(
            "تشكيلة مختارة من علب الحفظ الخشبية، أجهزة تدوير الساعات الأوتوماتيكية، ومستلزمات العناية للحفاظ على رونق مقتنياتك.",
            "A curated selection of wooden storage boxes, automatic watch winders and care supplies to keep your collection looking its best."
          )}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {accessories.map((raw, i) => {
          const a = loc(raw);
          return (
            <div
              key={a.id}
              data-aos="fade-up"
              data-aos-delay={(i % 4) * 80}
              className="group flex flex-col rounded-3xl border border-white/[0.08] bg-[#121215] overflow-hidden transition-all duration-300 hover:border-brass/40 hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden bg-[#0d0d10] p-4 flex items-center justify-center">
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-sm font-bold text-cream leading-snug sm:text-base">
                  {a.name}
                </h3>
                <p className="mt-2 text-xs text-muted/80 leading-relaxed line-clamp-2">
                  {a.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="font-mono text-base font-bold text-brass">
                    {a.price.toLocaleString()} {a.currency}
                  </span>
                  <button
                    onClick={() => handleAdd(raw)}
                    aria-label={tr(`أضف ${a.name} للسلة`, `Add ${a.name} to cart`)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 ${
                      addedId === a.id
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                        : "border-white/10 text-cream hover:border-brass hover:bg-brass hover:text-[#0e0e10]"
                    }`}
                  >
                    {addedId === a.id ? <Check size={16} /> : <Plus size={16} />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
