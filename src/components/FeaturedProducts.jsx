import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { useLang } from "../i18n/LanguageContext";

const TABS = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "men", ar: "رجالي", en: "Men" },
  { id: "Skeleton", ar: "سكيلتون", en: "Skeleton" },
  { id: "women", ar: "حريمي", en: "Women" },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");
  const [quickProduct, setQuickProduct] = useState(null);
  const { tr } = useLang();

  const displayed = useMemo(() => {
    let list = [...products];
    if (activeTab === "men") {
      list = list.filter((p) => p.gender === "men");
    } else if (activeTab === "Skeleton") {
      list = list.filter((p) => p.brand === "Skeleton");
    } else if (activeTab === "women") {
      list = list.filter((p) => p.gender === "women");
    }
    return list.slice(0, 8);
  }, [activeTab]);

  return (
    <section className="border-t border-white/[0.08] bg-[#0c0c0e] py-16 md:py-24">
      <div className="container-page">
        <div data-aos="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-brass uppercase">
              <Sparkles size={14} />
              <span>{tr("الأكثر طلباً", "Best sellers")}</span>
            </div>
            <h2 className="font-display mt-2 text-2xl font-bold text-cream sm:text-4xl">
              {tr("الموديلات اللي الناس بتسأل عليها", "The models everyone asks about")}
            </h2>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brass hover:text-brass-light transition-colors"
          >
            {tr(
              `كل الساعات (${products.length})`,
              `All watches (${products.length})`
            )}{" "}
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* ألسنة التبديل السريع */}
        <div data-aos="fade-up" className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`min-h-11 shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === t.id
                  ? "bg-brass text-[#0e0e10] font-bold"
                  : "border border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-cream"
              }`}
            >
              {tr(t.ar, t.en)}
            </button>
          ))}
        </div>

        {/* شبكة الساعات */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {displayed.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onQuickView={(prod) => setQuickProduct(prod)}
            />
          ))}
        </div>
      </div>

      {/* نافذة المعاينة السريعة */}
      {quickProduct && (
        <QuickViewModal
          product={quickProduct}
          onClose={() => setQuickProduct(null)}
        />
      )}
    </section>
  );
}
