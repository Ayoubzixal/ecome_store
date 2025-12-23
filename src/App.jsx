import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ShoppingCart, Heart, Search, User, Menu, X, Plus, Minus, Trash2, Edit, Package, Truck, Shield, Headphones, ArrowRight, Instagram, Facebook, Twitter, Globe } from 'lucide-react'

// ========================================
// TRANSLATIONS
// ========================================
const translations = {
    ar: {
        home: "الرئيسية",
        categories: "الفئات",
        products: "المنتجات",
        about: "من نحن",
        contact: "اتصل بنا",
        seller: "البائع",
        heroBadge: "أزياء مغربية أصيلة",
        heroTitle: "اكتشف جمال",
        heroTitleHighlight: "المغرب",
        heroDescription: "مجموعة فريدة من القفاطين والجلابيب والأحذية المغربية التقليدية. صنع يدوي بجودة عالية.",
        shopNow: "تسوق الآن",
        viewAll: "عرض الكل",
        productsCount: "منتج",
        kaftans: "القفاطين",
        djellabas: "الجلابيب",
        shoes: "الأحذية",
        accessories: "الإكسسوارات",
        dresses: "الفساتين",
        tunics: "التونيكات",
        ourCollection: "مجموعتنا",
        featuredProducts: "منتجات مميزة",
        all: "الكل",
        addToCart: "أضف للسلة",
        new: "جديد",
        sale: "تخفيض",
        hot: "رائج",
        freeShipping: "شحن مجاني",
        freeShippingDesc: "للطلبات فوق 150$",
        securePayment: "دفع آمن",
        securePaymentDesc: "حماية 100%",
        support247: "دعم متواصل",
        support247Desc: "خدمة على مدار الساعة",
        easyReturns: "إرجاع سهل",
        easyReturnsDesc: "خلال 30 يوم",
        newsletter: "اشترك في نشرتنا",
        newsletterDesc: "احصل على خصم 10% على طلبك الأول",
        emailPlaceholder: "بريدك الإلكتروني",
        subscribe: "اشتراك",
        shop: "تسوق",
        help: "مساعدة",
        faq: "الأسئلة الشائعة",
        shipping: "الشحن",
        returns: "الإرجاع",
        trackOrder: "تتبع الطلب",
        aboutUs: "من نحن",
        careers: "وظائف",
        press: "صحافة",
        footerDescription: "متجر المغرب - وجهتك للأزياء المغربية الأصيلة",
        allRights: "جميع الحقوق محفوظة",
        shoppingCart: "سلة التسوق",
        cartEmpty: "سلتك فارغة",
        total: "المجموع",
        checkout: "إتمام الشراء",
        sellerDashboard: "لوحة التحكم",
        backToStore: "العودة للمتجر",
        addProduct: "إضافة منتج",
        totalProducts: "المنتجات",
        totalValue: "القيمة",
        onSale: "في التخفيضات",
        allProducts: "جميع المنتجات",
        image: "الصورة",
        name: "الاسم",
        category: "الفئة",
        price: "السعر",
        badge: "الشارة",
        actions: "الإجراءات",
        editProduct: "تعديل المنتج",
        addNewProduct: "إضافة منتج جديد",
        productName: "اسم المنتج",
        originalPrice: "السعر الأصلي",
        imageUrl: "رابط الصورة",
        description: "الوصف",
        cancel: "إلغاء",
        save: "حفظ",
        update: "تحديث",
        none: "بدون",
        optional: "اختياري",
        addedToCart: "تمت الإضافة للسلة",
        removedFromCart: "تمت الإزالة",
        productAdded: "تمت إضافة المنتج",
        productUpdated: "تم تحديث المنتج",
        productDeleted: "تم حذف المنتج",
        confirmDelete: "هل تريد حذف هذا المنتج؟",
        thankYou: "شكراً لاشتراكك!",
        freeShippingBanner: "شحن مجاني للطلبات فوق 150$"
    },
    fr: {
        home: "Accueil",
        categories: "Catégories",
        products: "Produits",
        about: "À Propos",
        contact: "Contact",
        seller: "Vendeur",
        heroBadge: "Mode Marocaine Authentique",
        heroTitle: "Découvrez la beauté du",
        heroTitleHighlight: "Maroc",
        heroDescription: "Une collection unique de caftans, djellabas et chaussures marocaines traditionnelles. Artisanat de haute qualité.",
        shopNow: "Acheter",
        viewAll: "Voir tout",
        productsCount: "Produits",
        kaftans: "Caftans",
        djellabas: "Djellabas",
        shoes: "Chaussures",
        accessories: "Accessoires",
        dresses: "Robes",
        tunics: "Tuniques",
        ourCollection: "Notre Collection",
        featuredProducts: "Produits Vedettes",
        all: "Tous",
        addToCart: "Ajouter",
        new: "Nouveau",
        sale: "Solde",
        hot: "Tendance",
        freeShipping: "Livraison Gratuite",
        freeShippingDesc: "Commandes +150$",
        securePayment: "Paiement Sécurisé",
        securePaymentDesc: "Protection 100%",
        support247: "Support 24/7",
        support247Desc: "Service continu",
        easyReturns: "Retours Faciles",
        easyReturnsDesc: "Sous 30 jours",
        newsletter: "Newsletter",
        newsletterDesc: "10% de réduction sur votre première commande",
        emailPlaceholder: "Votre email",
        subscribe: "S'abonner",
        shop: "Boutique",
        help: "Aide",
        faq: "FAQ",
        shipping: "Livraison",
        returns: "Retours",
        trackOrder: "Suivi",
        aboutUs: "À Propos",
        careers: "Carrières",
        press: "Presse",
        footerDescription: "Maroc Boutique - Votre destination pour la mode marocaine authentique",
        allRights: "Tous droits réservés",
        shoppingCart: "Panier",
        cartEmpty: "Panier vide",
        total: "Total",
        checkout: "Commander",
        sellerDashboard: "Tableau de Bord",
        backToStore: "Retour",
        addProduct: "Ajouter",
        totalProducts: "Produits",
        totalValue: "Valeur",
        onSale: "En Solde",
        allProducts: "Tous les Produits",
        image: "Image",
        name: "Nom",
        category: "Catégorie",
        price: "Prix",
        badge: "Badge",
        actions: "Actions",
        editProduct: "Modifier",
        addNewProduct: "Nouveau Produit",
        productName: "Nom",
        originalPrice: "Prix Original",
        imageUrl: "URL Image",
        description: "Description",
        cancel: "Annuler",
        save: "Enregistrer",
        update: "Mettre à Jour",
        none: "Aucun",
        optional: "optionnel",
        addedToCart: "Ajouté au panier",
        removedFromCart: "Retiré",
        productAdded: "Produit ajouté",
        productUpdated: "Produit mis à jour",
        productDeleted: "Produit supprimé",
        confirmDelete: "Supprimer ce produit?",
        thankYou: "Merci!",
        freeShippingBanner: "Livraison gratuite pour +150$"
    },
    en: {
        home: "Home",
        categories: "Categories",
        products: "Products",
        about: "About",
        contact: "Contact",
        seller: "Seller",
        heroBadge: "Authentic Moroccan Fashion",
        heroTitle: "Discover the beauty of",
        heroTitleHighlight: "Morocco",
        heroDescription: "A unique collection of traditional Moroccan kaftans, djellabas, and shoes. High-quality handmade craftsmanship.",
        shopNow: "Shop Now",
        viewAll: "View All",
        productsCount: "Products",
        kaftans: "Kaftans",
        djellabas: "Djellabas",
        shoes: "Shoes",
        accessories: "Accessories",
        dresses: "Dresses",
        tunics: "Tunics",
        ourCollection: "Our Collection",
        featuredProducts: "Featured Products",
        all: "All",
        addToCart: "Add to Cart",
        new: "New",
        sale: "Sale",
        hot: "Hot",
        freeShipping: "Free Shipping",
        freeShippingDesc: "Orders over $150",
        securePayment: "Secure Payment",
        securePaymentDesc: "100% Protected",
        support247: "24/7 Support",
        support247Desc: "Always available",
        easyReturns: "Easy Returns",
        easyReturnsDesc: "30 day policy",
        newsletter: "Newsletter",
        newsletterDesc: "Get 10% off your first order",
        emailPlaceholder: "Your email",
        subscribe: "Subscribe",
        shop: "Shop",
        help: "Help",
        faq: "FAQ",
        shipping: "Shipping",
        returns: "Returns",
        trackOrder: "Track Order",
        aboutUs: "About Us",
        careers: "Careers",
        press: "Press",
        footerDescription: "Maroc Boutique - Your destination for authentic Moroccan fashion",
        allRights: "All rights reserved",
        shoppingCart: "Cart",
        cartEmpty: "Cart is empty",
        total: "Total",
        checkout: "Checkout",
        sellerDashboard: "Dashboard",
        backToStore: "Back",
        addProduct: "Add Product",
        totalProducts: "Products",
        totalValue: "Value",
        onSale: "On Sale",
        allProducts: "All Products",
        image: "Image",
        name: "Name",
        category: "Category",
        price: "Price",
        badge: "Badge",
        actions: "Actions",
        editProduct: "Edit Product",
        addNewProduct: "New Product",
        productName: "Name",
        originalPrice: "Original Price",
        imageUrl: "Image URL",
        description: "Description",
        cancel: "Cancel",
        save: "Save",
        update: "Update",
        none: "None",
        optional: "optional",
        addedToCart: "Added to cart",
        removedFromCart: "Removed",
        productAdded: "Product added",
        productUpdated: "Product updated",
        productDeleted: "Product deleted",
        confirmDelete: "Delete this product?",
        thankYou: "Thank you!",
        freeShippingBanner: "Free shipping on orders over $150"
    }
}

// Language Context
const LanguageContext = createContext()
const useLanguage = () => useContext(LanguageContext)

// Sample products
const initialProducts = [
    {
        id: 1,
        name: { ar: "قفطان ملكي تقليدي", fr: "Caftan Royal", en: "Royal Kaftan" },
        category: "kaftans",
        price: 299,
        originalPrice: 399,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
        badge: "hot",
        description: { ar: "قفطان فاخر", fr: "Caftan de luxe", en: "Luxury kaftan" }
    },
    {
        id: 2,
        name: { ar: "بلغة جلدية", fr: "Babouche Cuir", en: "Leather Babouche" },
        category: "shoes",
        price: 89,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500",
        badge: "new",
        description: { ar: "بلغة تقليدية", fr: "Babouche traditionnelle", en: "Traditional babouche" }
    },
    {
        id: 3,
        name: { ar: "جلابة مطرزة", fr: "Djellaba Brodée", en: "Embroidered Djellaba" },
        category: "djellabas",
        price: 199,
        originalPrice: 249,
        image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=500",
        badge: "sale",
        description: { ar: "جلابة أنيقة", fr: "Djellaba élégante", en: "Elegant djellaba" }
    },
    {
        id: 4,
        name: { ar: "فستان مغربي", fr: "Robe Marocaine", en: "Moroccan Dress" },
        category: "dresses",
        price: 159,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
        badge: "new",
        description: { ar: "فستان عصري", fr: "Robe moderne", en: "Modern dress" }
    },
    {
        id: 5,
        name: { ar: "صندل جلدي", fr: "Sandales Cuir", en: "Leather Sandals" },
        category: "shoes",
        price: 75,
        originalPrice: 95,
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500",
        badge: "sale",
        description: { ar: "صندل يدوي", fr: "Sandales artisanales", en: "Handmade sandals" }
    },
    {
        id: 6,
        name: { ar: "قفطان عروس", fr: "Caftan Mariée", en: "Bridal Kaftan" },
        category: "kaftans",
        price: 599,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500",
        badge: "hot",
        description: { ar: "قفطان زفاف", fr: "Caftan de mariée", en: "Bridal kaftan" }
    },
    {
        id: 7,
        name: { ar: "بلغة رجالية", fr: "Babouche Homme", en: "Men's Babouche" },
        category: "shoes",
        price: 79,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=500",
        badge: null,
        description: { ar: "بلغة كلاسيكية", fr: "Babouche classique", en: "Classic babouche" }
    },
    {
        id: 8,
        name: { ar: "تونيك مغربي", fr: "Tunique Marocaine", en: "Moroccan Tunic" },
        category: "tunics",
        price: 89,
        originalPrice: 119,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
        badge: "sale",
        description: { ar: "تونيك مريح", fr: "Tunique confortable", en: "Comfortable tunic" }
    }
]

const categories = [
    { key: "kaftans", count: 24, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400" },
    { key: "djellabas", count: 18, image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400" },
    { key: "shoes", count: 32, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400" },
    { key: "accessories", count: 45, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" }
]

// Toast
function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 2500)
        return () => clearTimeout(timer)
    }, [onClose])
    return <div className={`toast ${type}`}>{message}</div>
}

// Language Switcher
function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const langs = [
        { code: 'ar', label: 'العربية' },
        { code: 'fr', label: 'FR' },
        { code: 'en', label: 'EN' }
    ]
    const current = langs.find(l => l.code === language)

    return (
        <div className="language-switcher">
            <button className="language-btn" onClick={() => setIsOpen(!isOpen)}>
                <Globe size={14} />
                <span>{current?.label}</span>
            </button>
            {isOpen && (
                <div className="language-dropdown">
                    {langs.map(lang => (
                        <button
                            key={lang.code}
                            className={`language-option ${language === lang.code ? 'active' : ''}`}
                            onClick={() => { setLanguage(lang.code); setIsOpen(false) }}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// Header
function Header({ cartCount, onCartClick, onAdminClick }) {
    const { t, language } = useLanguage()
    const brandName = language === 'ar' ? 'متجر المغرب' : 'Maroc Boutique'

    return (
        <header className="header">
            <div className="header-top">
                <span>{t.freeShippingBanner}</span>
            </div>
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <div className="logo-mark"></div>
                        <span className="logo-text">{brandName}</span>
                    </Link>

                    <nav className="nav-links">
                        <Link to="/" className="nav-link">{t.home}</Link>
                        <a href="#categories" className="nav-link">{t.categories}</a>
                        <a href="#products" className="nav-link">{t.products}</a>
                        <a href="#about" className="nav-link">{t.about}</a>
                    </nav>

                    <div className="header-actions">
                        <LanguageSwitcher />
                        <button className="icon-btn"><Search size={20} /></button>
                        <button className="icon-btn" onClick={onCartClick}>
                            <ShoppingCart size={20} />
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </button>
                        <button className="seller-btn" onClick={onAdminClick}>
                            <User size={16} /> {t.seller}
                        </button>
                        <button className="mobile-menu-btn"><Menu size={20} /></button>
                    </div>
                </div>
            </div>
        </header>
    )
}

// Hero
function Hero() {
    const { t, language } = useLanguage()
    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <span className="hero-badge">{t.heroBadge}</span>
                        <h1 className="hero-title">
                            {t.heroTitle} <span>{t.heroTitleHighlight}</span>
                        </h1>
                        <p className="hero-description">{t.heroDescription}</p>
                        <div className="hero-buttons">
                            <a href="#products" className="btn btn-primary">
                                {t.shopNow} <ArrowRight size={16} />
                            </a>
                            <a href="#categories" className="btn btn-secondary">{t.viewAll}</a>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600" alt="Moroccan Fashion" />
                    </div>
                </div>
            </div>
        </section>
    )
}

// Categories
function Categories() {
    const { t } = useLanguage()
    return (
        <section className="section" id="categories">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t.categories}</h2>
                </div>
                <div className="categories-grid">
                    {categories.map((cat, i) => (
                        <div key={i} className="category-card">
                            <img src={cat.image} alt={t[cat.key]} />
                            <div className="category-overlay">
                                <span className="category-name">{t[cat.key]}</span>
                                <span className="category-count">{cat.count} {t.productsCount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Product Card
function ProductCard({ product, onAddToCart }) {
    const { t, language } = useLanguage()
    const name = typeof product.name === 'object' ? product.name[language] : product.name
    const category = t[product.category] || product.category
    const badge = product.badge ? t[product.badge] : null

    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={name} />
                {badge && <span className={`product-badge badge-${product.badge}`}>{badge}</span>}
                <button className="product-wishlist"><Heart size={16} /></button>
            </div>
            <div className="product-info">
                <span className="product-category">{category}</span>
                <h3 className="product-name">{name}</h3>
                <div className="product-price">
                    <span className="price-current">${product.price}</span>
                    {product.originalPrice && <span className="price-original">${product.originalPrice}</span>}
                </div>
                <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                    <ShoppingCart size={16} /> {t.addToCart}
                </button>
            </div>
        </div>
    )
}

// Products
function Products({ products, onAddToCart }) {
    const { t } = useLanguage()
    const [filter, setFilter] = useState('all')
    const filters = ['all', 'kaftans', 'djellabas', 'shoes', 'dresses', 'tunics']
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter)

    return (
        <section className="section" id="products">
            <div className="container">
                <div className="products-header">
                    <div className="section-header" style={{ marginBottom: 0, textAlign: 'start' }}>
                        <h2 className="section-title">{t.featuredProducts}</h2>
                    </div>
                    <div className="products-filters">
                        {filters.map(f => (
                            <button
                                key={f}
                                className={`filter-btn ${filter === f ? 'active' : ''}`}
                                onClick={() => setFilter(f)}
                            >
                                {f === 'all' ? t.all : t[f]}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="products-grid">
                    {filtered.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
                </div>
            </div>
        </section>
    )
}

// Features
function Features() {
    const { t } = useLanguage()
    const items = [
        { icon: <Truck size={20} />, title: t.freeShipping, desc: t.freeShippingDesc },
        { icon: <Shield size={20} />, title: t.securePayment, desc: t.securePaymentDesc },
        { icon: <Headphones size={20} />, title: t.support247, desc: t.support247Desc },
        { icon: <Package size={20} />, title: t.easyReturns, desc: t.easyReturnsDesc }
    ]
    return (
        <section className="section features" id="about">
            <div className="container">
                <div className="features-grid">
                    {items.map((item, i) => (
                        <div key={i} className="feature-card">
                            <div className="feature-icon">{item.icon}</div>
                            <h3 className="feature-title">{item.title}</h3>
                            <p className="feature-description">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Newsletter
function Newsletter() {
    const { t } = useLanguage()
    const [email, setEmail] = useState('')
    const handleSubmit = (e) => { e.preventDefault(); alert(t.thankYou); setEmail('') }

    return (
        <section className="newsletter">
            <div className="container">
                <div className="newsletter-content">
                    <h3>{t.newsletter}</h3>
                    <p>{t.newsletterDesc}</p>
                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="newsletter-input"
                            placeholder={t.emailPlaceholder}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="newsletter-btn">{t.subscribe}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

// Footer
function Footer() {
    const { t, language } = useLanguage()
    const brandName = language === 'ar' ? 'متجر المغرب' : 'Maroc Boutique'

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="logo">
                            <div className="logo-mark"></div>
                            <span className="logo-text" style={{ color: 'white' }}>{brandName}</span>
                        </div>
                        <p>{t.footerDescription}</p>
                        <div className="social-links">
                            <a href="#" className="social-link"><Instagram size={18} /></a>
                            <a href="#" className="social-link"><Facebook size={18} /></a>
                            <a href="#" className="social-link"><Twitter size={18} /></a>
                        </div>
                    </div>
                    <div className="footer-column">
                        <h4>{t.shop}</h4>
                        <ul className="footer-links">
                            <li><a href="#">{t.kaftans}</a></li>
                            <li><a href="#">{t.djellabas}</a></li>
                            <li><a href="#">{t.shoes}</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>{t.help}</h4>
                        <ul className="footer-links">
                            <li><a href="#">{t.faq}</a></li>
                            <li><a href="#">{t.shipping}</a></li>
                            <li><a href="#">{t.returns}</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>{t.contact}</h4>
                        <ul className="footer-links">
                            <li><a href="#">{t.aboutUs}</a></li>
                            <li><a href="#">{t.careers}</a></li>
                            <li><a href="#">{t.press}</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2024 {brandName}. {t.allRights}</p>
                    <div className="payment-methods">
                        <span className="payment-icon">VISA</span>
                        <span className="payment-icon">MC</span>
                        <span className="payment-icon">PAYPAL</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// Cart Sidebar with Checkout
function CartSidebar({ isOpen, onClose, cart, updateQuantity, removeFromCart, clearCart }) {
    const { t, language } = useLanguage()
    const [showCheckout, setShowCheckout] = useState(false)
    const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '', city: '' })
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const getName = (p) => typeof p.name === 'object' ? p.name[language] : p.name

    const handleCheckout = (e) => {
        e.preventDefault()
        // Build WhatsApp message
        let msg = language === 'ar' ? '🛒 *طلب جديد*\n\n' : '🛒 *New Order*\n\n'
        msg += language === 'ar' ? '*المنتجات:*\n' : '*Products:*\n'
        cart.forEach(item => {
            msg += `• ${getName(item)} x${item.quantity} - $${item.price * item.quantity}\n`
        })
        msg += `\n${language === 'ar' ? '*المجموع:*' : '*Total:*'} $${total.toFixed(2)}\n\n`
        msg += language === 'ar' ? '*معلومات العميل:*\n' : '*Customer Info:*\n'
        msg += `${language === 'ar' ? 'الاسم' : 'Name'}: ${customerInfo.name}\n`
        msg += `${language === 'ar' ? 'الهاتف' : 'Phone'}: ${customerInfo.phone}\n`
        msg += `${language === 'ar' ? 'المدينة' : 'City'}: ${customerInfo.city}\n`
        msg += `${language === 'ar' ? 'العنوان' : 'Address'}: ${customerInfo.address}`

        // Open WhatsApp (replace with your number)
        const whatsappNumber = '212600000000' // Change to seller's WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank')
        clearCart()
        setShowCheckout(false)
        onClose()
    }

    return (
        <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
                <div className="cart-header">
                    <h3>{showCheckout ? (language === 'ar' ? 'إتمام الطلب' : 'Checkout') : t.shoppingCart} ({cart.length})</h3>
                    <button className="cart-close" onClick={onClose}><X size={20} /></button>
                </div>

                {!showCheckout ? (
                    <>
                        <div className="cart-items">
                            {cart.length === 0 ? (
                                <div className="cart-empty">
                                    <ShoppingCart size={40} />
                                    <p>{t.cartEmpty}</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-image">
                                            <img src={item.image} alt={getName(item)} />
                                        </div>
                                        <div className="cart-item-info">
                                            <h4 className="cart-item-name">{getName(item)}</h4>
                                            <p className="cart-item-price">${item.price}</p>
                                            <div className="cart-item-quantity">
                                                <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={12} /></button>
                                                <span>{item.quantity}</span>
                                                <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={12} /></button>
                                            </div>
                                        </div>
                                        <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}><Trash2 size={16} /></button>
                                    </div>
                                ))
                            )}
                        </div>
                        {cart.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-total">
                                    <span>{t.total}</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
                                    {t.checkout}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <form onSubmit={handleCheckout} style={{ padding: '16px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 60px)' }}>
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            <div className="form-group">
                                <label>{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                                <input type="text" required value={customerInfo.name} onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                                <input type="tel" required value={customerInfo.phone} onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>{language === 'ar' ? 'المدينة' : 'City'}</label>
                                <input type="text" required value={customerInfo.city} onChange={e => setCustomerInfo({ ...customerInfo, city: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>{language === 'ar' ? 'العنوان' : 'Address'}</label>
                                <textarea required value={customerInfo.address} onChange={e => setCustomerInfo({ ...customerInfo, address: e.target.value })} />
                            </div>
                            <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '8px', marginTop: '16px' }}>
                                <p style={{ fontSize: '14px', marginBottom: '8px' }}>{language === 'ar' ? 'ملخص الطلب:' : 'Order Summary:'}</p>
                                {cart.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                                        <span>{getName(item)} x{item.quantity}</span>
                                        <span>${item.price * item.quantity}</span>
                                    </div>
                                ))}
                                <div style={{ borderTop: '1px solid #ddd', marginTop: '8px', paddingTop: '8px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{t.total}</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '16px' }}>
                            <button type="button" onClick={() => setShowCheckout(false)} style={{ width: '100%', padding: '12px', marginBottom: '8px', background: '#eee', borderRadius: '6px', fontWeight: 500 }}>
                                {language === 'ar' ? '← العودة' : '← Back'}
                            </button>
                            <button type="submit" className="checkout-btn" style={{ background: '#25D366' }}>
                                {language === 'ar' ? '📱 أرسل الطلب عبر واتساب' : '📱 Send Order via WhatsApp'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

// Admin Panel
function AdminPanel({ products, onAddProduct, onEditProduct, onDeleteProduct, onBack }) {
    const { t, language } = useLanguage()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [formData, setFormData] = useState({
        name: '', category: 'kaftans', price: '', originalPrice: '', image: '', description: '', badge: ''
    })

    const getName = (p) => typeof p.name === 'object' ? p.name[language] : p.name

    const openAddModal = () => {
        setEditingProduct(null)
        setFormData({ name: '', category: 'kaftans', price: '', originalPrice: '', image: '', description: '', badge: '' })
        setIsModalOpen(true)
    }

    const openEditModal = (product) => {
        setEditingProduct(product)
        setFormData({
            name: getName(product),
            category: product.category,
            price: product.price.toString(),
            originalPrice: product.originalPrice?.toString() || '',
            image: product.image,
            description: typeof product.description === 'object' ? product.description[language] : product.description,
            badge: product.badge || ''
        })
        setIsModalOpen(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: { ar: formData.name, fr: formData.name, en: formData.name },
            category: formData.category,
            price: parseFloat(formData.price),
            originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
            image: formData.image,
            description: { ar: formData.description, fr: formData.description, en: formData.description },
            badge: formData.badge || null
        }
        if (editingProduct) {
            onEditProduct({ ...data, id: editingProduct.id })
        } else {
            onAddProduct({ ...data, id: Date.now() })
        }
        setIsModalOpen(false)
    }

    return (
        <div className="admin-page">
            <div className="admin-container">
                <div className="admin-header">
                    <div>
                        <button className="back-btn" onClick={onBack}>← {t.backToStore}</button>
                        <h1>{t.sellerDashboard}</h1>
                    </div>
                    <button className="btn btn-primary" onClick={openAddModal}>
                        <Plus size={16} /> {t.addProduct}
                    </button>
                </div>

                <div className="admin-stats">
                    <div className="admin-stat-card">
                        <h3>{t.totalProducts}</h3>
                        <div className="value">{products.length}</div>
                    </div>
                    <div className="admin-stat-card">
                        <h3>{t.totalValue}</h3>
                        <div className="value">${products.reduce((s, p) => s + p.price, 0)}</div>
                    </div>
                    <div className="admin-stat-card">
                        <h3>{t.categories}</h3>
                        <div className="value">{[...new Set(products.map(p => p.category))].length}</div>
                    </div>
                    <div className="admin-stat-card">
                        <h3>{t.onSale}</h3>
                        <div className="value">{products.filter(p => p.originalPrice).length}</div>
                    </div>
                </div>

                <div className="admin-section">
                    <div className="admin-section-header">
                        <h2>{t.allProducts}</h2>
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>{t.image}</th>
                                <th>{t.name}</th>
                                <th>{t.category}</th>
                                <th>{t.price}</th>
                                <th>{t.actions}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id}>
                                    <td><img src={p.image} alt={getName(p)} /></td>
                                    <td>{getName(p)}</td>
                                    <td>{t[p.category]}</td>
                                    <td>${p.price}</td>
                                    <td>
                                        <div className="admin-actions">
                                            <button className="admin-action-btn edit" onClick={() => openEditModal(p)}><Edit size={14} /></button>
                                            <button className="admin-action-btn delete" onClick={() => onDeleteProduct(p.id)}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={() => setIsModalOpen(false)}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>{editingProduct ? t.editProduct : t.addNewProduct}</h3>
                        <button className="modal-close" onClick={() => setIsModalOpen(false)}><X size={18} /></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>{t.productName}</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t.category}</label>
                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                        <option value="kaftans">{t.kaftans}</option>
                                        <option value="djellabas">{t.djellabas}</option>
                                        <option value="shoes">{t.shoes}</option>
                                        <option value="dresses">{t.dresses}</option>
                                        <option value="tunics">{t.tunics}</option>
                                        <option value="accessories">{t.accessories}</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>{t.badge}</label>
                                    <select value={formData.badge} onChange={e => setFormData({ ...formData, badge: e.target.value })}>
                                        <option value="">{t.none}</option>
                                        <option value="new">{t.new}</option>
                                        <option value="sale">{t.sale}</option>
                                        <option value="hot">{t.hot}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t.price} ($)</label>
                                    <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>{t.originalPrice}</label>
                                    <input type="number" value={formData.originalPrice} onChange={e => setFormData({ ...formData, originalPrice: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{t.imageUrl}</label>
                                <input type="url" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>{t.description}</label>
                                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>{t.cancel}</button>
                            <button type="submit" className="btn-save">{editingProduct ? t.update : t.save}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

// Main App
function App() {
    const [language, setLanguage] = useState('ar')
    const [products, setProducts] = useState(initialProducts)
    const [cart, setCart] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isAdminView, setIsAdminView] = useState(false)
    const [toasts, setToasts] = useState([])

    const t = translations[language]
    const isRTL = language === 'ar'

    useEffect(() => {
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
        document.documentElement.lang = language
    }, [language, isRTL])

    const showToast = (msg, type = 'success') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message: msg, type }])
    }

    const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id))

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === product.id)
            if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
            return [...prev, { ...product, quantity: 1 }]
        })
        showToast(t.addedToCart)
    }

    const updateQuantity = (id, qty) => {
        if (qty <= 0) { removeFromCart(id); return }
        setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
    }

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(i => i.id !== id))
        showToast(t.removedFromCart, 'error')
    }

    const clearCart = () => setCart([])

    const addProduct = (p) => { setProducts(prev => [...prev, p]); showToast(t.productAdded) }
    const editProduct = (p) => { setProducts(prev => prev.map(x => x.id === p.id ? p : x)); showToast(t.productUpdated) }
    const deleteProduct = (id) => {
        if (window.confirm(t.confirmDelete)) {
            setProducts(prev => prev.filter(p => p.id !== id))
            showToast(t.productDeleted, 'error')
        }
    }

    const cartCount = cart.reduce((s, i) => s + i.quantity, 0)
    const ctx = { language, setLanguage, t, isRTL }

    if (isAdminView) {
        return (
            <LanguageContext.Provider value={ctx}>
                <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} onAdminClick={() => setIsAdminView(true)} />
                <AdminPanel products={products} onAddProduct={addProduct} onEditProduct={editProduct} onDeleteProduct={deleteProduct} onBack={() => setIsAdminView(false)} />
                <div className="toast-container">{toasts.map(t => <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />)}</div>
            </LanguageContext.Provider>
        )
    }

    return (
        <LanguageContext.Provider value={ctx}>
            <Router>
                <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} onAdminClick={() => setIsAdminView(true)} />
                <main>
                    <Hero />
                    <Categories />
                    <Products products={products} onAddToCart={addToCart} />
                    <Features />
                    <Newsletter />
                </main>
                <Footer />
                <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />
                <div className="toast-container">{toasts.map(t => <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />)}</div>
            </Router>
        </LanguageContext.Provider>
    )
}

export default App
