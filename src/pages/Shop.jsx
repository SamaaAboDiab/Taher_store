import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, Sparkles, RotateCcw } from "lucide-react";
import { CATEGORIES, BRANDS, fetchProducts } from "../data/products";
import { BRANDS_EN, CATEGORIES_EN, localize } from "../data/products.en";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import { useLang } from "../i18n/LanguageContext";

const GENDERS = [
  { id: "all", label: "الكل", en: "All" },
  { id: "men", label: "رجالي", en: "Men" },
  { id: "women", label: "حريمي", en: "Women" },
];

const SORTS = [
  { id: "featured", ar: "المميز والأكثر طلباً", en: "Featured" },
  { id: "price-asc", ar: "السعر: من الأقل للأعلى", en: "Price: low to high" },
  { id: "price-desc", ar: "السعر: من الأعلى للأقل", en: "Price: high to low" },
  { id: "rating", ar: "الأعلى تقييماً", en: "Top rated" },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "all";
  const brand = params.get("brand") || "all";
  const gender = params.get("gender") || "all";
  const q = params.get("q") || "";
  const [sort, setSort] = useState("featured");
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickProduct, setQuickProduct] = useState(null);
  const { tr, isAr } = useLang();

  // تسميات الفلاتر حسب اللغة
  const brandOptions = BRANDS.map((b) => ({ id: b.id, label: isAr ? b.label : BRANDS_EN[b.id] || b.id }));
  const categoryOptions = CATEGORIES.map((c) => ({ id: c.id, label: isAr ? c.label : CATEGORIES_EN[c.id] }));
  const genderOptions = GENDERS.map((g) => ({ id: g.id, label: isAr ? g.label : g.en }));

  useEffect(() => {
    setLoading(true);
    fetchProducts().then((items) => {
      setAll(items);
      setLoading(false);
    });
  }, []);

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const clearAllFilters = () => {
    setParams({}, { replace: true });
  };

  const results = useMemo(() => {
    let list = [...all];
    if (brand !== "all") {
      list = list.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
    }
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    if (gender !== "all") {
      list = list.filter((p) => p.gender === gender);
    }
    if (q) {
      // البحث بيشتغل على الاسم العربي والإنجليزي مع بعض
      const needle = q.toLowerCase();
      list = list.filter((p) => {
        const en = localize(p, "en");
        return [p.name, en.name, p.brand, p.dialColor, en.dialColor, p.strap, en.strap, p.description].some(
          (field) => field && field.toLowerCase().includes(needle)
        );
      });
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [all, brand, category, gender, q, sort]);

  const brandLabel = brandOptions.find((b) => b.id.toLowerCase() === brand.toLowerCase())?.label || brand;
  const categoryLabel = categoryOptions.find((c) => c.id === category)?.label || category;
  const activeFilters = [
    brand !== "all" && { key: "brand", label: tr(`التشكيلة: ${brandLabel}`, `Collection: ${brandLabel}`) },
    category !== "all" && { key: "category", label: tr(`الخامة: ${categoryLabel}`, `Material: ${categoryLabel}`) },
    gender !== "all" && { key: "gender", label: genderOptions.find((g) => g.id === gender)?.label },
    q && { key: "q", label: tr(`بحث: ${q}`, `Search: ${q}`) },
  ].filter(Boolean);

  return (
    <div className="container-page py-10 md:py-16">
      {/* عنوان الصفحة الرئيسي */}
      <div data-aos="fade-up" className="mb-10 text-start">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-brass uppercase">
          <Sparkles size={14} />
          <span>{tr("كل موديلات T Hour", "All T Hour models")}</span>
        </div>
        <h1 className="font-display mt-2 text-3xl font-extrabold text-cream sm:text-5xl">
          {q
            ? tr(`نتائج البحث عن "${q}"`, `Results for "${q}"`)
            : brand !== "all"
              ? tr(`تشكيلة ${brandLabel}`, `${brandLabel} collection`)
              : tr("ساعات فخمة بأسعار مميزة", "Luxury watches at great prices")}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {loading
            ? tr("جاري فحص الكتالوج…", "Loading catalogue…")
            : tr(
                `${results.length} موديل متوفر — معاينة قبل الدفع وشحن لكل مصر`,
                `${results.length} models available — inspect before you pay, shipping across Egypt`
              )}
        </p>
      </div>

      <div className="flex items-start gap-8">
        {/* الفلاتر الجانبية — للشاشات الكبيرة */}
        <aside className="hidden w-64 shrink-0 lg:block space-y-6 rounded-3xl border border-white/[0.08] bg-[#121215] p-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <span className="font-display text-base font-bold text-cream">{tr("تصفية الساعات", "Filter watches")}</span>
            {activeFilters.length > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-xs text-brass hover:underline"
              >
                <RotateCcw size={12} /> {tr("إعادة ضبط", "Reset")}
              </button>
            )}
          </div>

          <FilterGroup
            title={tr("التشكيلة", "Collection")}
            options={brandOptions}
            active={brand}
            onChange={(val) => setParam("brand", val)}
          />

          <FilterGroup
            title={tr("الفئة", "Gender")}
            options={genderOptions}
            active={gender}
            onChange={(val) => setParam("gender", val)}
          />

          <FilterGroup
            title={tr("خامة السوار والهيكل", "Case & strap material")}
            options={categoryOptions}
            active={category}
            onChange={(val) => setParam("category", val)}
          />
        </aside>

        {/* عرض النتائج والفرز */}
        <div className="min-w-0 flex-1">
          {/* شريط التحكم العلوي */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-[#121215] p-4">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-cream"
            >
              <SlidersHorizontal size={14} className="text-brass" />
              {tr("تصفية", "Filters")} ({activeFilters.length})
            </button>

            {/* بادجات الفلاتر النشطة */}
            <div className="flex flex-wrap items-center gap-2">
              {activeFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setParam(f.key, "all")}
                  className="flex items-center gap-1 rounded-full border border-brass/40 bg-brass/10 px-3 py-1 text-xs font-medium text-brass transition-colors hover:bg-brass/20"
                >
                  <span>{f.label}</span>
                  <X size={13} />
                </button>
              ))}
            </div>

            {/* الترتيب */}
            <div className="flex items-center gap-2 ms-auto">
              <span className="text-xs text-muted hidden sm:inline">{tr("الترتيب حسب:", "Sort by:")}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-white/10 bg-[#0d0d10] px-3.5 py-2 text-xs font-medium text-cream outline-none focus:border-brass"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {tr(s.ar, s.en)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* شبكة الساعات */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-2xl bg-white/[0.03] border border-white/5" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="rounded-3xl border border-white/[0.08] bg-[#121215] p-12 text-center">
              <p className="font-display text-xl text-cream">
                {tr("لم نجد ساعات مطابقة لمعايير البحث", "No watches match your search")}
              </p>
              <p className="mt-2 text-xs text-muted">
                {tr("جرب إزالة بعض الفلاتر لعرض مزيد من الساعات الفاخرة", "Try removing some filters to see more watches")}
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brass px-6 py-2.5 text-xs font-bold text-[#0e0e10]"
              >
                {tr("عرض كل الساعات", "Show all watches")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
              {results.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i}
                  onQuickView={(prod) => setQuickProduct(prod)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* نافذة الفلاتر للموبايل */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/80 backdrop-blur-sm lg:hidden">
          <div className="relative ms-auto w-full max-w-xs bg-[#121215] p-6 h-full overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-display text-base font-bold text-cream">{tr("تصفية الساعات", "Filter watches")}</span>
              <button onClick={() => setFiltersOpen(false)} className="p-1 text-muted hover:text-cream">
                <X size={20} />
              </button>
            </div>

            <FilterGroup
              title={tr("التشكيلة", "Collection")}
              options={brandOptions}
              active={brand}
              onChange={(val) => {
                setParam("brand", val);
                setFiltersOpen(false);
              }}
            />

            <FilterGroup
              title={tr("الفئة", "Gender")}
              options={genderOptions}
              active={gender}
              onChange={(val) => {
                setParam("gender", val);
                setFiltersOpen(false);
              }}
            />

            <FilterGroup
              title={tr("الخامة", "Material")}
              options={categoryOptions}
              active={category}
              onChange={(val) => {
                setParam("category", val);
                setFiltersOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* نافذة المعاينة السريعة */}
      {quickProduct && (
        <QuickViewModal
          product={quickProduct}
          onClose={() => setQuickProduct(null)}
        />
      )}
    </div>
  );
}

function FilterGroup({ title, options, active, onChange }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-mono tracking-wider text-brass uppercase">{title}</h4>
      <div className="flex flex-col space-y-1">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors ${
              active === opt.id
                ? "bg-brass/10 text-brass font-bold border border-brass/30"
                : "text-cream/70 hover:bg-white/5 hover:text-cream"
            }`}
          >
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
