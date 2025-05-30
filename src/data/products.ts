export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  price: number;
  oldPrice?: number;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  rating: number;
  reviewCount: number;
  variants?: ProductVariant[];
  relatedProducts?: string[];
}

export interface ProductVariant {
  name: string;
  options: string[];
}

// Muslim e-commerce store products data
export const products: Product[] = [
  {
    id: "1",
    name: "Женская абайя классическая",
    slug: "zhenskaya-abaya-klassicheskaya",
    category: "clothing",
    subcategory: "women",
    price: 3200,
    oldPrice: 3800,
    images: [
      "https://ae04.alicdn.com/kf/S1f5ae8f851a44e1299b944753092a02dE.jpg_480x480.jpg",
      "https://images.pexels.com/photos/6570642/pexels-photo-6570642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6570506/pexels-photo-6570506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    description: "Элегантная классическая абайя из премиального материала, обеспечивающая комфорт и соответствие исламским традициям. Идеальна для повседневного ношения и особых случаев.",
    features: [
      "Материал: 100% полиэстер высокого качества",
      "Свободный крой для комфортного ношения",
      "Скрытые застежки спереди",
      "Подходит для всех сезонов",
      "Машинная стирка при 30°C"
    ],
    inStock: true,
    isPopular: true,
    rating: 4.8,
    reviewCount: 124,
    variants: [
      {
        name: "Размер",
        options: ["S", "M", "L", "XL", "XXL"]
      },
      {
        name: "Цвет",
        options: ["Черный", "Темно-синий", "Бордовый", "Темно-зеленый"]
      }
    ],
    relatedProducts: ["2", "5", "7", "9"]
  },
  {
    id: "2",
    name: "Мужская тюбетейка ручной работы",
    slug: "muzhskaya-tyubeteyka-ruchnoy-raboty",
    category: "clothing",
    subcategory: "men",
    price: 1200,
    images: [
      "https://atsalavat.ru/wp-content/uploads/2022/02/50.jpg",
    ],
    description: "Традиционная тюбетейка ручной работы с уникальной вышивкой. Каждая тюбетейка - это произведение искусства, созданное опытными мастерами с использованием традиционных техник.",
    features: [
      "Ручная вышивка",
      "Материал: 100% хлопок с подкладкой",
      "Традиционный дизайн",
      "Подходит для повседневного ношения и религиозных мероприятий",
      "Бережная ручная стирка"
    ],
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 87,
    variants: [
      {
        name: "Размер",
        options: ["S (54-55)", "M (56-57)", "L (58-59)"]
      },
      {
        name: "Цвет",
        options: ["Черный", "Зеленый", "Синий", "Белый"]
      }
    ],
    relatedProducts: ["4", "8", "11", "15"]
  },
  {
    id: "3",
    name: "Коран в кожаном переплете (средний)",
    slug: "koran-v-kozhanom-pereplete-sredniy",
    category: "books",
    price: 2800,
    images: [
      "https://kniga-v-podarok.ru/wa-data/public/shop/products/84/28/2884/images/7098/7098.970.png",
    ],
    description: "Священный Коран в элегантном кожаном переплете с арабским текстом и параллельным переводом на русский язык. Книга оформлена декоративным тиснением и позолоченным обрезом.",
    features: [
      "Кожаный переплет ручной работы",
      "Арабский текст с переводом на русский язык",
      "Декоративное тиснение",
      "Позолоченный обрез",
      "Размер: 14x20 см",
      "Ленточка-закладка"
    ],
    inStock: true,
    isPopular: true,
    rating: 5.0,
    reviewCount: 216,
    variants: [
      {
        name: "Цвет переплета",
        options: ["Темно-коричневый", "Бордовый", "Зеленый", "Черный"]
      }
    ],
    relatedProducts: ["10", "12", "13", "14"]
  },
  {
    id: "4",
    name: "Мужской комплект для намаза",
    slug: "muzhskoy-komplekt-dlya-namaza",
    category: "prayer",
    subcategory: "men",
    price: 1800,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-y/c400/7122898798.jpg",
      ],
    description: "Полный комплект для намаза для мужчин, включающий молитвенный коврик, тюбетейку и четки. Удобная сумка для хранения в комплекте.",
    features: [
      "Молитвенный коврик размером 70x120 см",
      "Традиционная тюбетейка",
      "Четки из натурального дерева (33 бусины)",
      "Сумка для хранения и переноски",
      "Подходит для дома и путешествий"
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 64,
    variants: [
      {
        name: "Цвет коврика",
        options: ["Зеленый", "Синий", "Коричневый", "Бордовый"]
      }
    ],
    relatedProducts: ["2", "8", "14", "16"]
  },
  {
    id: "5",
    name: "Хиджаб-шарф",
    slug: "hijab-sharf-premium",
    category: "clothing",
    subcategory: "women",
    price: 1400,
    oldPrice: 1800,
    images: [
      "https://basket-12.wbbasket.ru/vol1812/part181269/181269138/images/big/1.webp",
    ],
    description: "Элегантный хиджаб-шарф премиум качества из мягкого, дышащего материала. Идеален для повседневного ношения и особых случаев.",
    features: [
      "Материал: высококачественный хлопок с добавлением шелка",
      "Размер: 180x70 см",
      "Легкий и дышащий материал",
      "Не скользит при ношении",
      "Бережная ручная стирка"
    ],
    inStock: true,
    isPopular: true,
    rating: 4.9,
    reviewCount: 157,
    variants: [
      {
        name: "Цвет",
        options: ["Черный", "Белый", "Бежевый", "Серый", "Бордовый", "Темно-синий", "Изумрудный"]
      }
    ],
    relatedProducts: ["1", "7", "9", "17"]
  },
  {
    id: "6",
    name: "Масляные духи 'Уд Аль-Малики'",
    slug: "maslyanie-duhi-ud-al-maliki",
    category: "fragrances",
    price: 2500,
    images: [
      "https://irecommend.ru/sites/default/files/imagecache/copyright1/user-images/202525/m1Ph8R2dpL0mp6cfxHOFnA.jpg",
    ],
    description: "Роскошный аромат с глубокими нотами уда, сандала и амбры. Масляные духи 'Уд Аль-Малики' созданы по традиционным арабским рецептам без использования спирта.",
    features: [
      "Объем: 15 мл",
      "Натуральные компоненты",
      "Не содержит спирта",
      "Стойкость аромата до 24 часов",
      "Деревянный футляр ручной работы",
      "Идеален для особых случаев"
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    rating: 4.9,
    reviewCount: 112,
    variants: [
      {
        name: "Концентрация",
        options: ["Стандартная", "Интенсивная"]
      }
    ],
    relatedProducts: ["18", "19", "20", "21"]
  },
  {
    id: "7",
    name: "Женский молитвенный костюм",
    slug: "zhenskiy-molitvenniy-kostyum",
    category: "prayer",
    subcategory: "women",
    price: 2600,
    images: [
      "https://ae04.alicdn.com/kf/S03493a89886046ed83130f758c9923579.jpg",
    ],
    description: "Элегантный женский молитвенный костюм, состоящий из длинного платья и платка. Легкий, удобный и соответствующий исламским требованиям к одежде для молитвы.",
    features: [
      "Материал: 100% высококачественный полиэстер",
      "Свободный крой для комфортного совершения намаза",
      "Двухсоставной комплект: платье и платок",
      "Легко надевается и снимается",
      "Компактно складывается для хранения и переноски"
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 98,
    variants: [
      {
        name: "Размер",
        options: ["S", "M", "L", "XL", "XXL"]
      },
      {
        name: "Цвет",
        options: ["Белый", "Черный", "Темно-синий", "Бордовый"]
      }
    ],
    relatedProducts: ["1", "5", "9", "16"]
  },
  {
    id: "8",
    name: "Мужская джалабия",
    slug: "muzhskaya-dzhalabiya",
    category: "clothing",
    subcategory: "men",
    price: 4200,
    images: [
      "https://s.alicdn.com/@sc04/kf/A7f613e60b4a441e5b917172c2434eb2aJ.jpeg_300x300.jpg",
    ],
    description: "Традиционная арабская джалабия для мужчин, сшитая из высококачественного хлопка. Идеальна для особых случаев, пятничной молитвы или повседневного ношения в жаркую погоду.",
    features: [
      "Материал: 100% хлопок высшего качества",
      "Традиционный арабский дизайн",
      "Вышивка ручной работы на воротнике и манжетах",
      "Длинные рукава с манжетами на пуговицах",
      "Свободный крой для максимального комфорта"
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 73,
    variants: [
      {
        name: "Размер",
        options: ["S", "M", "L", "XL", "XXL"]
      },
      {
        name: "Цвет",
        options: ["Белый", "Бежевый", "Серый", "Темно-синий"]
      }
    ],
    relatedProducts: ["2", "4", "11", "15"]
  },
  
  {
    id: "10",
    name: "Сборник хадисов Бухари",
    slug: "sbornik-hadisov-buhari",
    category: "books",
    price: 3200,
    images: [
      "https://basket-04.wbbasket.ru/vol507/part50709/50709920/images/big/1.webp",
    ],
    description: "Полное собрание достоверных хадисов имама аль-Бухари с комментариями ученых. Книга содержит самую авторитетную коллекцию хадисов в суннитском исламе с параллельным переводом на русский язык.",
    features: [
      "Твердый переплет высокого качества",
      "Арабский текст с переводом на русский язык",
      "Комментарии известных ученых",
      "Подробный указатель тем",
      "Качественная печать на офсетной бумаге",
      "Удобный формат для чтения и изучения"
    ],
    inStock: true,
    isPopular: true,
    rating: 5.0,
    reviewCount: 183,
    relatedProducts: ["3", "12", "13", "14"]
  },
  
  {
    id: "12",
    name: "Книга 'Исламская этика'",
    slug: "kniga-islamskaya-etika",
    category: "books",
    price: 1200,
    images: [
      "https://basket-12.wbbasket.ru/vol1723/part172362/172362065/images/big/1.webp",
      
    ],
    description: "Доступное и современное изложение основ исламской этики и нравственности. Книга содержит рекомендации по правильному поведению мусульманина в различных жизненных ситуациях.",
    features: [
      "Твердый переплет",
      "Доступное изложение для широкой аудитории",
      "Многочисленные примеры из жизни пророка Мухаммада",
      "Практические советы для повседневной жизни",
      "Ответы на современные этические вопросы"
    ],
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 64,
    relatedProducts: ["3", "10", "13", "14"]
  },
  {
    id: "13",
    name: "Книга для детей 'Истории пророков'",
    slug: "kniga-dlya-detey-istorii-prorokov",
    category: "books",
    subcategory: "children",
    price: 1500,
    images: [
      "https://basket-14.wbbasket.ru/vol2094/part209479/209479084/images/big/1.webp",
    ],
    description: "Красочная книга для детей с иллюстрациями, рассказывающая истории пророков в доступной форме. Прекрасный способ познакомить детей с основами ислама через интересные рассказы.",
    features: [
      "Твердый переплет повышенной прочности",
      "Яркие иллюстрации, адаптированные для мусульманской аудитории",
      "Крупный шрифт для легкого чтения",
      "25 историй о пророках",
      "Понятный язык для детей от 5 лет",
      "Нравственные уроки в каждой истории"
    ],
    inStock: true,
    isPopular: true,
    rating: 4.9,
    reviewCount: 127,
    relatedProducts: ["3", "10", "12", "14"]
  },
  
  
  {
    id: "16",
    name: "Женский молитвенный коврик с компасом",
    slug: "zhenskiy-molitvenniy-kovrik-s-kompasom",
    category: "prayer",
    subcategory: "women",
    price: 2200,
    oldPrice: 2600,
    images: [
      "https://ae04.alicdn.com/kf/S30f72bc4ec09450a9f97d1230b31f14e9.jpg",
    ],
    description: "Элегантный молитвенный коврик с встроенным компасом для определения киблы. Коврик выполнен из мягкого материала с декоративной вышивкой, идеален для дома и путешествий.",
    features: [
      "Размер: 70x120 см",
      "Встроенный компас для определения киблы",
      "Мягкий, но плотный материал",
      "Нескользящая основа",
      "Декоративная вышивка",
      "Сумка для хранения и переноски в комплекте"
    ],
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 56,
    variants: [
      {
        name: "Цвет",
        options: ["Розовый", "Голубой", "Бежевый", "Сиреневый", "Бирюзовый"]
      }
    ],
    relatedProducts: ["4", "7", "14", "17"]
  },
  {
    id: "17",
    name: "Шапочка-амира для девочек",
    slug: "shapochka-amira-dlya-devochek",
    category: "clothing",
    subcategory: "children",
    price: 900,
    images: [
      "https://img.joomcdn.net/8d834177f2e2f649672f10f5843ed13d0f174344_original.jpeg",
    ],
    description: "Удобная и красивая шапочка-амира для девочек, выполненная из мягкого хлопка. Идеальное решение для юных мусульманок, которые учатся носить хиджаб.",
    features: [
      "Материал: 100% хлопок",
      "Двухсоставная конструкция",
      "Эластичная посадка для комфорта",
      "Простота надевания и снятия",
      "Подходит для повседневного ношения и особых случаев"
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 83,
    variants: [
      {
        name: "Размер",
        options: ["4-6 лет", "7-9 лет", "10-12 лет"]
      },
      {
        name: "Цвет",
        options: ["Белый", "Розовый", "Голубой", "Сиреневый", "Бежевый"]
      }
    ],
    relatedProducts: ["5", "7", "9", "13"]
  },

  {
    id: "19",
    name: "Набор масляных духов 'Арабская коллекция'",
    slug: "nabor-maslyanih-duhov-arabskaya-kollekciya",
    category: "fragrances",
    price: 4500,
    images: [
      "https://www.leomax.ru/upload/iblock/a1a/a1a168285fc78d0760b767ff4d794398_thumb_58dd2416e2e8c731f2754c9ba9b88bf9.jpg",
    ],
    description: "Набор из 5 масляных духов различных ароматов в подарочной упаковке. Идеальный подарок для ценителей восточных ароматов.",
    features: [
      "5 флаконов по 5 мл",
      "100% натуральные масляные духи без спирта",
      "Ароматы: уд, мускус, амбра, сандал, роза",
      "Стойкость ароматов до 24 часов",
      "Элегантная подарочная упаковка",
      "Мини-книга с описанием ароматов и историей"
    ],
    inStock: true,
    isNew: true,
    rating: 5.0,
    reviewCount: 42,
    relatedProducts: ["6", "18", "20", "21"]
  },
  {
    id: "20",
    name: "Керамическая курильница для бахура",
    slug: "keramicheskaya-kurilnica-dlya-bahura",
    category: "fragrances",
    subcategory: "accessories",
    price: 1600,
    images: [
      "https://ae04.alicdn.com/kf/S5455ac37b0064018b96b9c6839c44152z.jpg",
    ],
    description: "Керамическая курильница ручной работы для бахура и ароматических смол. Традиционный дизайн с уникальной росписью делает её не только функциональным предметом, но и элементом декора.",
    features: [
      "Материал: высококачественная керамика",
      "Ручная роспись",
      "Устойчивая к высоким температурам",
      "Резной орнамент для циркуляции воздуха",
      "Съемная металлическая чаша для угля",
      "Размеры: 12 см (высота) x 10 см (диаметр)"
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 63,
    variants: [
      {
        name: "Дизайн",
        options: ["Традиционный синий", "Восточный красный", "Мозаика", "Каллиграфия"]
      }
    ],
    relatedProducts: ["6", "18", "19", "21"]
  },
  {
    id: "21",
    name: "Масляные духи 'Мускус и амбра'",
    slug: "maslyanie-duhi-muskus-i-ambra",
    category: "fragrances",
    price: 2200,
    images: [
      "https://basket-22.wbbasket.ru/vol3842/part384203/384203447/images/c516x688/1.webp",
    ],
    description: "Изысканная композиция из мускуса и амбры, создающая теплый, сладковатый аромат с древесными нотами. Идеально подходит как для мужчин, так и для женщин.",
    features: [
      "Объем: 15 мл",
      "100% натуральные компоненты",
      "Не содержит спирта",
      "Стойкость до 24 часов",
      "Флакон из темного стекла с роликовым аппликатором",
      "Деревянная подарочная упаковка"
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 78,
    variants: [
      {
        name: "Концентрация",
        options: ["Стандартная", "Интенсивная"]
      }
    ],
    relatedProducts: ["6", "18", "19", "20"]
  },
  {
    id: "22",
    name: "Декоративная тарелка с арабской каллиграфией",
    slug: "dekorativnaya-tarelka-s-arabskoy-kalligrafiey",
    category: "gifts",
    price: 2800,
    images: [
      "https://cs5.livemaster.ru/storage/ba/87/becdfc98bb69110e414439216c35--posuda-tarelka-dekorativnaya-s-arabskoj.jpg",
    ],
    description: "Декоративная керамическая тарелка с арабской каллиграфией ручной работы. Прекрасный подарок и стильный элемент исламского декора для дома или офиса.",
    features: [
      "Диаметр: 30 см",
      "Материал: высококачественная керамика",
      "Ручная роспись 24-каратным золотом",
      "Настенное крепление в комплекте",
      "Упаковка в подарочную коробку",
      "Возможность индивидуального заказа каллиграфической надписи"
    ],
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 37,
    variants: [
      {
        name: "Дизайн",
        options: ["Аят аль-Курси", "Шахада", "99 имен Аллаха", "Суры Аль-Фатиха"]
      },
      {
        name: "Цвет",
        options: ["Белый с золотом", "Синий с золотом", "Изумрудный с золотом", "Бордовый с золотом"]
      }
    ],
    relatedProducts: ["23", "24", "25", "26"]
  },
 
  {
    id: "24",
    name: "Электронная обучающая Коран-ручка",
    slug: "elektronnaya-obuchayushchaya-koran-ruchka",
    category: "gifts",
    subcategory: "electronic",
    price: 7500,
    images: [
      "https://ir-3.ozone.ru/multimedia/c1000/1036894970.jpg",
    ],
    description: "Инновационная электронная ручка для изучения Корана. При прикосновении к специальной книге воспроизводит правильное чтение аятов, помогая освоить правила таджвида и произношение.",
    features: [
      "Встроенный динамик высокого качества",
      "16 ГБ памяти",
      "Аккумулятор с зарядом до 8 часов работы",
      "В комплекте специальная книга Корана",
      "16 голосов известных чтецов",
      "Функции перевода и тафсира",
      "Автоматическое определение страницы и аята"
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    rating: 4.9,
    reviewCount: 86,
    relatedProducts: ["3", "10", "22", "23"]
  },
  {
    id: "25",
    name: "Настенные часы с исламским дизайном",
    slug: "nastennie-chasy-s-islamskim-dizaynom",
    category: "gifts",
    subcategory: "home",
    price: 2400,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPa8w9r0hg4XkE6MJXHZZxuKRDhTjlIQsXvQ&s",
    ],
    description: "Элегантные настенные часы с исламским геометрическим орнаментом. Бесшумный механизм и стильный дизайн делают их прекрасным дополнением любого интерьера.",
    features: [
      "Диаметр: 35 см",
      "Материал: металл и пластик высокого качества",
      "Бесшумный кварцевый механизм",
      "Арабские цифры",
      "Защитное стекло",
      "Исламский геометрический узор",
      "Работает от 1 батарейки AA (в комплекте)"
    ],
    inStock: true,
    rating: 4.6,
    reviewCount: 73,
    variants: [
      {
        name: "Цвет",
        options: ["Золотой", "Серебряный", "Черный", "Белый"]
      }
    ],
    relatedProducts: ["22", "23", "26", "27"]
  },
  
 
];

// Categories for catalog filtering
export const categories = [
  {
    id: "clothing",
    name: "Одежда",
    subcategories: [
      { id: "women", name: "Женская одежда" },
      { id: "men", name: "Мужская одежда" },
      { id: "children", name: "Детская одежда" }
    ],
    image: "https://images.pexels.com/photos/6570276/pexels-photo-6570276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "books",
    name: "Книги",
    subcategories: [
      { id: "quran", name: "Коран" },
      { id: "hadith", name: "Хадисы" },
      { id: "children", name: "Детская литература" },
      { id: "education", name: "Обучающая литература" }
    ],
    image: "https://images.pexels.com/photos/5899425/pexels-photo-5899425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "prayer",
    name: "Товары для намаза",
    subcategories: [
      { id: "carpets", name: "Молитвенные коврики" },
      { id: "clothing", name: "Одежда для намаза" },
      { id: "accessories", name: "Аксессуары для намаза" }
    ],
    image: "https://images.pexels.com/photos/3696663/pexels-photo-3696663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "fragrances",
    name: "Ароматы",
    subcategories: [
      { id: "oil", name: "Масляные духи" },
      { id: "bakhoor", name: "Бахур" },
      { id: "accessories", name: "Аксессуары" }
    ],
    image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "gifts",
    name: "Подарки и сувениры",
    subcategories: [
      { id: "home", name: "Для дома" },
      { id: "decor", name: "Декор" },
      { id: "electronic", name: "Электроника" },
      { id: "sets", name: "Подарочные наборы" }
    ],
    image: "https://images.pexels.com/photos/6243679/pexels-photo-6243679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

// Banner data for slider
export const banners = [
  {
    id: "1",
    title: "Новая коллекция абай",
    subtitle: "Скидки до 20% на женскую одежду",
    image: "https://images.pexels.com/photos/5824877/pexels-photo-5824877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "/catalog/clothing"
  },
  {
    id: "2",
    title: "Коран - священная книга",
    subtitle: "Широкий выбор изданий для всей семьи",
    image: "https://images.pexels.com/photos/5899425/pexels-photo-5899425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "/catalog/books"
  },
  {
    id: "3",
    title: "Ароматы Востока",
    subtitle: "Натуральные масляные духи из Саудовской Аравии",
    image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "/catalog/fragrances"
  }
];