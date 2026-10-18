// كتالوج T Hour — كل الصور من صفحة التيك توك الرسمية للمتجر (@t.hour0)
// عند الـ Hover في كارت المنتج تظهر الزاوية الثانية تلقائياً
//
// ⚠️ الأسعار هنا تقديرية — عدّليها بالأسعار الحقيقية (السعر بالجنيه بدون فواصل)
// ⚠️ لو ضفتي ساعة جديدة ضيفي ترجمتها الإنجليزي في products.en.js بنفس الـ id

const img = (id, n) => `/tiktok/products/${id}-${n}.jpg`;
const gallery = (id, count) => Array.from({ length: count }, (_, i) => img(id, i + 1));

// "brand" هنا معناها التشكيلة (Collection) — بتستخدم في الفلترة والعرض
export const BRANDS = [
  { id: "all", label: "كل التشكيلات" },
  { id: "Classic", label: "كلاسيك" },
  { id: "Sport", label: "سبورت" },
  { id: "Skeleton", label: "سكيلتون ومكشوفة" },
  { id: "Chrono", label: "كرونوغراف" },
  { id: "Ladies", label: "حريمي" },
];

export const CATEGORIES = [
  { id: "all", label: "كل الخامات" },
  { id: "metal", label: "سوار ستيل" },
  { id: "leather", label: "حزام جلد" },
  { id: "rubber", label: "حزام رابر" },
];

function product({ id, count, ...rest }) {
  return {
    id,
    currency: "ج.م",
    image: img(id, 1),
    hoverImage: count > 1 ? img(id, 2) : null,
    gallery: gallery(id, count),
    ...rest,
  };
}

export const products = [
  product({
    id: "open-heart-tourbillon",
    count: 4,
    name: "ساعة أوبن هارت بميناء مكشوف وسوار ستيل",
    brand: "Skeleton",
    category: "metal",
    gender: "men",
    price: 1650,
    badge: "جديد",
    rating: 5.0,
    reviews: 12,
    material: "ستانلس ستيل",
    movement: "ميكانيكا ظاهرة من الميناء",
    dialColor: "أخضر / أزرق / ذهبي مع تصميم الكرة الأرضية",
    strap: "سوار ستيل",
    description:
      "ميناء مكشوف بيظهر حركة الماكينة وهي شغالة، مع رسمة الكرة الأرضية وألوان أخضر وأزرق وذهبي. ساعة بتلفت النظر من أول مرة وتنفع هدية لحد بيحب التفاصيل.",
  }),
  product({
    id: "skeleton-cushion-rubber",
    count: 4,
    name: "ساعة سكيلتون كوشن بحزام رابر",
    brand: "Skeleton",
    category: "rubber",
    gender: "men",
    price: 1250,
    badge: "الأكثر مشاهدة",
    rating: 4.9,
    reviews: 41,
    material: "ستانلس ستيل",
    movement: "ميكانيكا ظاهرة (سكيلتون)",
    dialColor: "سكيلتون مفرغ — ألوان متعددة",
    strap: "رابر مثقب — أسود / أزرق / رمادي / بني",
    description:
      "أكتر موديل اتشاف على صفحتنا. هيكل كوشن ستيل وميناء سكيلتون بيكشف التروس، مع حزام رابر مريح متوفر بأكتر من لون. حضور رياضي وجريء على الإيد.",
  }),
  product({
    id: "square-roman-rubber",
    count: 4,
    name: "ساعة مربعة بأرقام رومانية وحزام رابر",
    brand: "Sport",
    category: "rubber",
    gender: "men",
    price: 1150,
    badge: "الأكثر طلباً",
    rating: 4.9,
    reviews: 36,
    material: "ستانلس ستيل",
    dialColor: "أبيض / أسود / أخضر / بني بأرقام رومانية",
    strap: "رابر — أزرق / أسود / أخضر / بني",
    description:
      "هيكل مربع ستيل بمسامير ظاهرة وأرقام رومانية كلاسيك، على حزام رابر رياضي. بتجمع بين الشياكة والراحة وتنفع للخروج والشغل.",
  }),
  product({
    id: "chrono-leather-rosegold",
    count: 4,
    name: "ساعة كرونوغراف بحزام جلد وتفاصيل روز جولد",
    brand: "Chrono",
    category: "leather",
    gender: "men",
    price: 1350,
    rating: 4.8,
    reviews: 22,
    material: "ستانلس ستيل — فضي أو روز جولد",
    dialColor: "أبيض / أزرق / رمادي بعدادات فرعية",
    strap: "جلد طبيعي بني أو أسود",
    description:
      "ميناء بعدادات فرعية وأرقام رومانية، على حزام جلد بني دافي. ساعة رسمية بلمسة روز جولد تنفع للمناسبات والشغل.",
  }),
  product({
    id: "textured-integrated-steel",
    count: 4,
    name: "ساعة سوار مدمج بميناء منقوش",
    brand: "Classic",
    category: "metal",
    gender: "men",
    price: 1300,
    rating: 4.9,
    reviews: 27,
    material: "ستانلس ستيل",
    dialColor: "أخضر / أزرق بنقشة مربعات",
    strap: "سوار ستيل مدمج",
    description:
      "تصميم السوار المدمج مع الهيكل اللي بقى ترند، وميناء منقوش بيلمع مع الضوء. خفيفة وأنيقة وتنفع مع أي لبس.",
  }),
  product({
    id: "integrated-bracelet-boxed",
    count: 4,
    name: "ساعة سوار مدمج في علبة هدايا",
    brand: "Classic",
    category: "metal",
    gender: "men",
    price: 1100,
    badge: "جاهزة للهدية",
    rating: 4.8,
    reviews: 19,
    material: "ستانلس ستيل",
    dialColor: "أزرق / سماوي / ذهبي",
    strap: "سوار ستيل مدمج — فضي / ذهبي / أسود",
    description:
      "بتوصل في علبتها وجاهزة تتهادى على طول. سوار مدمج وميناء بألوان مختلفة يناسب كل الأذواق.",
  }),
  product({
    id: "octagon-leather",
    count: 4,
    name: "ساعة أوكتاجون بحزام جلد",
    brand: "Classic",
    category: "leather",
    gender: "men",
    price: 1250,
    rating: 4.8,
    reviews: 24,
    material: "ستانلس ستيل — فضي أو روز جولد",
    dialColor: "أزرق / أخضر / أسود / أبيض بخطوط أفقية",
    strap: "جلد طبيعي — بني / أسود / أخضر / كحلي",
    description:
      "هيكل أوكتاجون بزوايا ناعمة وميناء بخطوط أفقية كلاسيك، على حزام جلد. ساعة هادية وشيك تنفع للبدلة والكاجوال.",
  }),
  product({
    id: "jubilee-fluted",
    count: 4,
    name: "ساعة كلاسيك بإطار محزز وسوار جوبيلي",
    brand: "Classic",
    category: "metal",
    gender: "men",
    price: 1150,
    rating: 4.9,
    reviews: 31,
    material: "ستانلس ستيل",
    dialColor: "أخضر / سماوي / أسود / كحلي / فضي",
    strap: "سوار جوبيلي ستيل",
    description:
      "إطار محزز وسوار جوبيلي بخمس وصلات — تصميم كلاسيك عمره ما بيقدم. متوفرة بألوان ميناء كتير تختار منها اللي يناسبك.",
  }),
  product({
    id: "square-steel-roman",
    count: 4,
    name: "ساعة مربعة ستيل بأرقام رومانية",
    brand: "Classic",
    category: "metal",
    gender: "men",
    price: 1150,
    rating: 4.8,
    reviews: 18,
    material: "ستانلس ستيل — فضي أو ذهبي",
    dialColor: "أبيض / أسود / بني / كحلي",
    strap: "سوار ستيل",
    description:
      "هيكل مربع بمسامير ظاهرة على الإطار وأرقام رومانية، على سوار ستيل كامل. شكل قوي وأنيق في نفس الوقت.",
  }),
  product({
    id: "chrono-steel",
    count: 4,
    name: "ساعة كرونوغراف ستيل بعدادات فرعية",
    brand: "Chrono",
    category: "metal",
    gender: "men",
    price: 1250,
    rating: 4.8,
    reviews: 16,
    material: "ستانلس ستيل",
    dialColor: "أسود / أزرق / أبيض",
    strap: "سوار ستيل",
    description:
      "كرونوغراف رياضي بثلاث عدادات فرعية على سوار ستيل. ساعة عملية وشكلها تقيل على الإيد.",
  }),
  product({
    id: "diver-steel",
    count: 4,
    name: "ساعة رياضية ستيل بإطار دوار",
    brand: "Sport",
    category: "metal",
    gender: "men",
    price: 1100,
    rating: 4.7,
    reviews: 14,
    material: "ستانلس ستيل",
    dialColor: "أزرق / أبيض / أسود",
    strap: "سوار ستيل",
    description:
      "تصميم ساعات الغطس الرياضي بإطار بارز ومؤشرات واضحة. ساعة يومية قوية ومريحة.",
  }),
  product({
    id: "octagon-steel-dark",
    count: 4,
    name: "ساعة أوكتاجون ستيل بميناء منقوش",
    brand: "Sport",
    category: "metal",
    gender: "men",
    price: 1250,
    rating: 4.8,
    reviews: 21,
    material: "ستانلس ستيل — فضي أو أسود",
    dialColor: "أزرق / أسود / أبيض بنقشة مربعات",
    strap: "سوار ستيل مدمج",
    description:
      "إطار أوكتاجون بمسامير ظاهرة وميناء منقوش بنقشة المربعات. من أكتر التصميمات المطلوبة للشباب.",
  }),
  product({
    id: "octagon-black-steel",
    count: 4,
    name: "ساعة أوكتاجون بلاك ستيل",
    brand: "Sport",
    category: "metal",
    gender: "men",
    price: 1050,
    rating: 4.7,
    reviews: 13,
    material: "ستانلس ستيل — أسود أو فضي",
    dialColor: "كحلي / أخضر / بني / ذهبي",
    strap: "سوار ستيل",
    description:
      "نسخة الأسود الكامل من الأوكتاجون مع ميناء منقوش بألوان مختلفة. شكل جريء وعصري.",
  }),
  product({
    id: "textured-octagon-bracelet",
    count: 4,
    name: "ساعة سوار مدمج بميناء ثلجي",
    brand: "Classic",
    category: "metal",
    gender: "men",
    price: 950,
    rating: 4.7,
    reviews: 15,
    material: "ستانلس ستيل",
    dialColor: "أخضر / ثلجي / أبيض",
    strap: "سوار ستيل مدمج",
    description:
      "ميناء بنقشة ثلجية بتلمع مع كل حركة، وسوار مدمج مريح. بسيطة وشيك.",
  }),
  product({
    id: "fluted-color-dial",
    count: 4,
    name: "ساعة بإطار محزز وميناء ملون",
    brand: "Classic",
    category: "metal",
    gender: "men",
    price: 950,
    rating: 4.7,
    reviews: 17,
    material: "ستانلس ستيل",
    dialColor: "أبيض / رمادي / أخضر / سماوي",
    strap: "سوار ستيل",
    description:
      "إطار محزز لامع وميناء بألوان مبهجة زي الأخضر والسماوي. ساعة تفرّح وتنفع هدية.",
  }),
  product({
    id: "rectangle-moonphase-steel",
    count: 4,
    name: "ساعة مستطيلة ستيل بأرقام رومانية",
    brand: "Classic",
    category: "metal",
    gender: "men",
    price: 1200,
    rating: 4.8,
    reviews: 12,
    material: "ستانلس ستيل — فضي أو روز جولد",
    dialColor: "أبيض / أسود بأرقام رومانية",
    strap: "سوار ستيل",
    description:
      "تصميم مستطيل كلاسيك بأرقام رومانية وعداد فرعي، على سوار ستيل. أناقة رسمية للمناسبات.",
  }),
  product({
    id: "tank-leather",
    count: 4,
    name: "ساعة مستطيلة كلاسيك بحزام جلد",
    brand: "Classic",
    category: "leather",
    gender: "men",
    price: 850,
    rating: 4.8,
    reviews: 23,
    material: "ستانلس ستيل — ذهبي أو فضي",
    dialColor: "أبيض بأرقام رومانية وعقارب زرقا",
    strap: "جلد طبيعي — بني / أسود / كحلي",
    description:
      "التصميم المستطيل الكلاسيك بأرقام رومانية وعقارب زرقا، على حزام جلد. ساعة بتليق بالبدلة وبالكاجوال.",
  }),
  product({
    id: "classic-leather-date",
    count: 4,
    name: "ساعة كلاسيك بحزام جلد ونافذة تاريخ",
    brand: "Classic",
    category: "leather",
    gender: "men",
    price: 950,
    rating: 4.8,
    reviews: 29,
    material: "ستانلس ستيل",
    dialColor: "أخضر / أسود / كحلي",
    strap: "جلد بنقشة التمساح — أخضر / أسود / بني",
    description:
      "ميناء بنقشة ناعمة ونافذة تاريخ، على حزام جلد بنقشة التمساح. اختيار شيك وهادي يناسب كل يوم.",
  }),
  product({
    id: "classic-steel-gold",
    count: 4,
    name: "ساعة كلاسيك ستيل بنافذة تاريخ",
    brand: "Classic",
    category: "metal",
    gender: "men",
    price: 850,
    rating: 4.7,
    reviews: 20,
    material: "ستانلس ستيل — فضي / ذهبي / أزرق",
    dialColor: "ذهبي / أبيض / أسود / أزرق",
    strap: "سوار ستيل",
    description:
      "ساعة كلاسيك بسيطة على سوار ستيل مع نافذة تاريخ. متوفرة بألوان كتير وتنفع هدية لأي حد.",
  }),
  product({
    id: "square-classic-steel",
    count: 4,
    name: "ساعة مربعة كلاسيك ستيل",
    brand: "Classic",
    category: "metal",
    gender: "men",
    price: 900,
    rating: 4.8,
    reviews: 26,
    material: "ستانلس ستيل",
    dialColor: "رمادي بنمط أشعة الشمس",
    strap: "سوار ستيل",
    description:
      "هيكل مربع بزوايا ناعمة وميناء رمادي بيلمع مع الضوء، ونافذة تاريخ. ستايل ريترو رجع تاني بقوة.",
  }),
  product({
    id: "silver-textured-dial",
    count: 2,
    name: "ساعة ستيل بميناء فضي منقوش",
    brand: "Classic",
    category: "metal",
    gender: "men",
    price: 1000,
    badge: "جديد",
    rating: 4.8,
    reviews: 6,
    material: "ستانلس ستيل",
    dialColor: "فضي بنقشة هندسية",
    strap: "سوار ستيل مدمج",
    description:
      "ميناء فضي بنقشة هندسية بارزة وسوار ستيل مدمج. من أحدث الموديلات اللي نزلت على الصفحة.",
  }),
  product({
    id: "ladies-rectangle-leather",
    count: 3,
    name: "ساعة حريمي مستطيلة بحزام جلد وسلسلة ذهبي",
    brand: "Ladies",
    category: "leather",
    gender: "women",
    price: 290,
    badge: "أقل من 300 ج",
    rating: 4.9,
    reviews: 33,
    material: "معدن بلون ذهبي",
    dialColor: "أبيض / كحلي",
    strap: "جلد — أبيض / بني / أخضر مع سلسلة ذهبي",
    description:
      "ساعة حريمي رقيقة بإطار مستطيل ذهبي، على حزام جلد مع سلسلة. هدية حلوة وبسعر أقل من 300 جنيه.",
  }),
  product({
    id: "octagon-color-dial",
    count: 4,
    name: "ساعة أوكتاجون ستيل بميناء ملون",
    brand: "Ladies",
    category: "metal",
    gender: "women",
    price: 950,
    rating: 4.8,
    reviews: 25,
    material: "ستانلس ستيل",
    dialColor: "كحلي / أخضر / سماوي / وردي / أبيض / أحمر / أصفر",
    strap: "سوار ستيل مدمج",
    description:
      "تصميم أوكتاجون بزوايا ناعمة وميناء بنقشة خطوط، متوفر بألوان كتير جداً من الوردي للأصفر. اختاري اللون اللي يشبهك.",
  }),
  product({
    id: "ladies-turquoise-gold",
    count: 3,
    name: "ساعة حريمي ذهبي بميناء تركواز",
    brand: "Ladies",
    category: "metal",
    gender: "women",
    price: 650,
    rating: 4.8,
    reviews: 14,
    material: "معدن بلون ذهبي",
    dialColor: "تركواز بفصوص لامعة",
    strap: "سوار ذهبي",
    description:
      "ميناء تركواز مبهج بفصوص لامعة على سوار ذهبي. ساعة أنثوية تنفع هدية تخرج أو عيد ميلاد.",
  }),
  product({
    id: "ladies-bracelet-rectangle",
    count: 4,
    name: "ساعة حريمي مستطيلة بسوار مجوهرات",
    brand: "Ladies",
    category: "metal",
    gender: "women",
    price: 550,
    rating: 4.7,
    reviews: 18,
    material: "معدن — ذهبي / فضي / أسود",
    dialColor: "صدفي / أخضر / أسود",
    strap: "سوار بتصميم المجوهرات",
    description:
      "ساعة صغيرة مستطيلة على سوار بيتلبس زي الإسورة. ناعمة وبتكمّل أي لوك.",
  }),
  product({
    id: "ladies-cushion-steel",
    count: 3,
    name: "ساعة حريمي كوشن ستيل صغيرة",
    brand: "Ladies",
    category: "metal",
    gender: "women",
    price: 700,
    rating: 4.7,
    reviews: 11,
    material: "ستانلس ستيل",
    dialColor: "أبيض / أسود",
    strap: "سوار ستيل",
    description:
      "هيكل كوشن صغير على سوار ستيل رفيع. ساعة يومية بسيطة وأنيقة.",
  }),
  product({
    id: "ladies-leopard",
    count: 2,
    name: "ساعة حريمي بحزام نقشة الفهد",
    brand: "Ladies",
    category: "leather",
    gender: "women",
    price: 450,
    rating: 4.6,
    reviews: 9,
    material: "معدن بلون ذهبي",
    dialColor: "ذهبي بنقشة",
    strap: "حزام بنقشة الفهد",
    description:
      "إطار ذهبي بيضاوي على حزام بنقشة الفهد — لمسة جريئة ومختلفة للبنات اللي بيحبوا يلفتوا النظر.",
  }),
];

export const accessories = [
  {
    id: "royal-watch-box",
    name: "علبة ساعات خشبية ملكية فاخرة",
    price: 850,
    currency: "ج.م",
    image: "/P_HOUR/1e3thbau0001-2.jpg",
    description: "خشب طبيعي مصقول بطلاء بيانو لامع ومبطنة بالمخمل الأسود الناعم لحفظ مقتنياتك الثمينة بأمان.",
  },
  {
    id: "automatic-watch-winder",
    name: "جهاز تدوير الساعات الأوتوماتيك (Winder)",
    price: 1850,
    currency: "ج.م",
    image: "/P_HOUR/24a3d21fc7730eb165adb5f000abcb2d.jpg",
    description: "محرك ياباني فائق الهدوء يحافظ على تشغيل الساعات الميكانيكية وشحنها المستمر عند عدم ارتدائها.",
  },
  {
    id: "leather-travel-roll",
    name: "محفظة سفر جلدية ثلاثية للساعات",
    price: 690,
    currency: "ج.م",
    image: "/P_HOUR/WhatsApp-Image-2024-08-19-at-6.34-Photoroom-800x800.jpg",
    description: "جلد مدبوغ عالي الجودة مع فواصل مبطنة لحماية الساعات من الخدش أثناء السفر والتنقل.",
  },
  {
    id: "luxury-care-kit",
    name: "طقم العناية والتلميع الشامل للساعات",
    price: 420,
    currency: "ج.م",
    image: "/P_HOUR/public-17-Photoroom-800x800.jpg",
    description: "محلول آمن لتنظيف المعادن والزجاج مع قماش ميكروفايبر معالج لإعادة بريق الساعة.",
  },
];

// مساعدات الجلب والبحث
export function fetchProducts({ brand, category, gender } = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let list = [...products];
      if (brand && brand !== "all") {
        list = list.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
      }
      if (category && category !== "all") {
        list = list.filter((p) => p.category === category);
      }
      if (gender && gender !== "all") {
        list = list.filter((p) => p.gender === gender);
      }
      resolve(list);
    }, 150);
  });
}

export function fetchProductById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = products.find((p) => p.id === id);
      if (found) {
        resolve(found);
      } else {
        reject(new Error("Product not found"));
      }
    }, 100);
  });
}
