import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, Heart, Search, Menu, X, Plus, Minus, Trash2, Edit, Package, Truck, Shield, Headphones, ArrowRight, Instagram, Facebook, Twitter, Globe, Lock } from 'lucide-react'

// ========================================
// CONFIG - CHANGE THESE!
// ========================================
const CONFIG = {
    whatsappNumber: '212600000000', // Your WhatsApp number
    adminPassword: 'seller2024',    // Admin password - CHANGE THIS!
    adminUrl: '/manage-store-2025'  // Secret admin URL - CHANGE THIS!
}

// ========================================
// TRANSLATIONS
// ========================================
const translations = {
    ar: {
        home: "الرئيسية", categories: "الفئات", products: "المنتجات", about: "من نحن",
        heroBadge: "أزياء مغربية أصيلة", heroTitle: "اكتشف جمال", heroTitleHighlight: "المغرب",
        heroDescription: "مجموعة فريدة من القفاطين والجلابيب والأحذية المغربية التقليدية.",
        shopNow: "تسوق الآن", viewAll: "عرض الكل", productsCount: "منتج",
        kaftans: "القفاطين", djellabas: "الجلابيب", shoes: "الأحذية",
        accessories: "الإكسسوارات", dresses: "الفساتين", tunics: "التونيكات",
        featuredProducts: "منتجات مميزة", all: "الكل", addToCart: "أضف للسلة",
        new: "جديد", sale: "تخفيض", hot: "رائج",
        freeShipping: "شحن مجاني", securePayment: "دفع آمن",
        support247: "دعم متواصل", easyReturns: "إرجاع سهل",
        newsletter: "اشترك في نشرتنا", subscribe: "اشتراك",
        shoppingCart: "سلة التسوق", cartEmpty: "سلتك فارغة", total: "المجموع", checkout: "إتمام الطلب",
        freeShippingBanner: "شحن مجاني للطلبات فوق 150$",
        adminLogin: "تسجيل دخول المدير", password: "كلمة المرور", login: "دخول", wrongPassword: "كلمة مرور خاطئة",
        dashboard: "لوحة التحكم", addProduct: "إضافة منتج", totalProducts: "المنتجات", totalValue: "القيمة",
        productName: "اسم المنتج", category: "الفئة", price: "السعر", imageUrl: "رابط الصورة",
        save: "حفظ", cancel: "إلغاء", delete: "حذف", edit: "تعديل", logout: "خروج",
        orderSummary: "ملخص الطلب", customerName: "الاسم", phone: "الهاتف", city: "المدينة", address: "العنوان",
        sendWhatsApp: "أرسل عبر واتساب", back: "رجوع"
    },
    fr: {
        home: "Accueil", categories: "Catégories", products: "Produits", about: "À Propos",
        heroBadge: "Mode Marocaine", heroTitle: "Découvrez", heroTitleHighlight: "le Maroc",
        heroDescription: "Collection unique de caftans, djellabas et chaussures marocaines.",
        shopNow: "Acheter", viewAll: "Voir tout", productsCount: "Produits",
        kaftans: "Caftans", djellabas: "Djellabas", shoes: "Chaussures",
        accessories: "Accessoires", dresses: "Robes", tunics: "Tuniques",
        featuredProducts: "Produits Vedettes", all: "Tous", addToCart: "Ajouter",
        new: "Nouveau", sale: "Solde", hot: "Tendance",
        freeShipping: "Livraison Gratuite", securePayment: "Paiement Sécurisé",
        support247: "Support 24/7", easyReturns: "Retours Faciles",
        newsletter: "Newsletter", subscribe: "S'abonner",
        shoppingCart: "Panier", cartEmpty: "Panier vide", total: "Total", checkout: "Commander",
        freeShippingBanner: "Livraison gratuite +150$",
        adminLogin: "Connexion Admin", password: "Mot de passe", login: "Connexion", wrongPassword: "Mot de passe incorrect",
        dashboard: "Tableau de bord", addProduct: "Ajouter", totalProducts: "Produits", totalValue: "Valeur",
        productName: "Nom", category: "Catégorie", price: "Prix", imageUrl: "URL Image",
        save: "Enregistrer", cancel: "Annuler", delete: "Supprimer", edit: "Modifier", logout: "Déconnexion",
        orderSummary: "Résumé", customerName: "Nom", phone: "Téléphone", city: "Ville", address: "Adresse",
        sendWhatsApp: "Envoyer WhatsApp", back: "Retour"
    },
    en: {
        home: "Home", categories: "Categories", products: "Products", about: "About",
        heroBadge: "Moroccan Fashion", heroTitle: "Discover", heroTitleHighlight: "Morocco",
        heroDescription: "Unique collection of traditional Moroccan kaftans, djellabas, and shoes.",
        shopNow: "Shop Now", viewAll: "View All", productsCount: "Products",
        kaftans: "Kaftans", djellabas: "Djellabas", shoes: "Shoes",
        accessories: "Accessories", dresses: "Dresses", tunics: "Tunics",
        featuredProducts: "Featured Products", all: "All", addToCart: "Add to Cart",
        new: "New", sale: "Sale", hot: "Hot",
        freeShipping: "Free Shipping", securePayment: "Secure Payment",
        support247: "24/7 Support", easyReturns: "Easy Returns",
        newsletter: "Newsletter", subscribe: "Subscribe",
        shoppingCart: "Cart", cartEmpty: "Cart is empty", total: "Total", checkout: "Checkout",
        freeShippingBanner: "Free shipping on orders over $150",
        adminLogin: "Admin Login", password: "Password", login: "Login", wrongPassword: "Wrong password",
        dashboard: "Dashboard", addProduct: "Add Product", totalProducts: "Products", totalValue: "Value",
        productName: "Name", category: "Category", price: "Price", imageUrl: "Image URL",
        save: "Save", cancel: "Cancel", delete: "Delete", edit: "Edit", logout: "Logout",
        orderSummary: "Order Summary", customerName: "Name", phone: "Phone", city: "City", address: "Address",
        sendWhatsApp: "Send via WhatsApp", back: "Back"
    }
}

// Default products
const defaultProducts = [
    { id: 1, name: { ar: "قفطان ملكي", fr: "Caftan Royal", en: "Royal Kaftan" }, category: "kaftans", price: 299, originalPrice: 399, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", badge: "hot" },
    { id: 2, name: { ar: "بلغة جلدية", fr: "Babouche Cuir", en: "Leather Babouche" }, category: "shoes", price: 89, originalPrice: null, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500", badge: "new" },
    { id: 3, name: { ar: "جلابة مطرزة", fr: "Djellaba Brodée", en: "Embroidered Djellaba" }, category: "djellabas", price: 199, originalPrice: 249, image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=500", badge: "sale" },
    { id: 4, name: { ar: "فستان مغربي", fr: "Robe Marocaine", en: "Moroccan Dress" }, category: "dresses", price: 159, originalPrice: null, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500", badge: "new" },
    { id: 5, name: { ar: "قفطان عروس", fr: "Caftan Mariée", en: "Bridal Kaftan" }, category: "kaftans", price: 599, originalPrice: null, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500", badge: "hot" },
    { id: 6, name: { ar: "صندل جلدي", fr: "Sandales Cuir", en: "Leather Sandals" }, category: "shoes", price: 75, originalPrice: 95, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500", badge: "sale" }
]

const categories = [
    { key: "kaftans", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400" },
    { key: "djellabas", image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400" },
    { key: "shoes", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400" },
    { key: "accessories", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" }
]

// Context
const AppContext = createContext()
const useApp = () => useContext(AppContext)

// Load/Save products from localStorage
const loadProducts = () => {
    try {
        const saved = localStorage.getItem('store_products')
        return saved ? JSON.parse(saved) : defaultProducts
    } catch { return defaultProducts }
}
const saveProducts = (products) => {
    localStorage.setItem('store_products', JSON.stringify(products))
}

// ========================================
// COMPONENTS
// ========================================

// Language Switcher
function LanguageSwitcher() {
    const { language, setLanguage } = useApp()
    const [open, setOpen] = useState(false)
    const langs = [{ code: 'ar', label: 'العربية' }, { code: 'fr', label: 'FR' }, { code: 'en', label: 'EN' }]
    return (
        <div style={{ position: 'relative' }}>
            <button onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: '#f5f5f5', borderRadius: 6, fontSize: 13 }}>
                <Globe size={14} /> {langs.find(l => l.code === language)?.label}
            </button>
            {open && (
                <div style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden', zIndex: 100, marginTop: 4 }}>
                    {langs.map(l => (
                        <button key={l.code} onClick={() => { setLanguage(l.code); setOpen(false) }}
                            style={{ display: 'block', width: '100%', padding: '10px 20px', textAlign: 'start', background: language === l.code ? '#C1272D' : '#fff', color: language === l.code ? '#fff' : '#333', border: 'none', cursor: 'pointer' }}>
                            {l.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// Header (NO seller button - hidden!)
function Header({ onCartClick, cartCount }) {
    const { t } = useApp()
    return (
        <header style={{ position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid #eee', zIndex: 1000 }}>
            <div style={{ background: '#1a1a1a', color: '#fff', padding: '8px 0', textAlign: 'center', fontSize: 13 }}>{t.freeShippingBanner}</div>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #C1272D, #8B0000)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#C9A227', fontSize: 16 }}>★</span>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 18 }}>MarocBoutique</span>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <LanguageSwitcher />
                    <button onClick={onCartClick} style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'transparent' }}>
                        <ShoppingCart size={20} />
                        {cartCount > 0 && <span style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, background: '#C1272D', color: '#fff', borderRadius: '50%', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
                    </button>
                </div>
            </div>
        </header>
    )
}

// Hero
function Hero() {
    const { t } = useApp()
    return (
        <section style={{ background: 'linear-gradient(135deg, #f8f8f8, #f0f0f0)', padding: '60px 16px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
                <span style={{ display: 'inline-block', background: 'rgba(193,39,45,0.1)', color: '#C1272D', padding: '6px 16px', borderRadius: 20, fontSize: 13, marginBottom: 16 }}>{t.heroBadge}</span>
                <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, marginBottom: 16 }}>{t.heroTitle} <span style={{ color: '#C1272D' }}>{t.heroTitleHighlight}</span></h1>
                <p style={{ color: '#666', maxWidth: 500, margin: '0 auto 24px', fontSize: 16 }}>{t.heroDescription}</p>
                <a href="#products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a1a1a', color: '#fff', padding: '12px 28px', borderRadius: 8, fontWeight: 500 }}>{t.shopNow} <ArrowRight size={16} /></a>
            </div>
        </section>
    )
}

// Categories
function Categories() {
    const { t } = useApp()
    return (
        <section style={{ padding: '48px 16px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', fontSize: 24, marginBottom: 32 }}>{t.categories}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
                    {categories.map((cat, i) => (
                        <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}>
                            <img src={cat.image} alt={t[cat.key]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', display: 'flex', alignItems: 'flex-end', padding: 16 }}>
                                <span style={{ color: '#fff', fontWeight: 600 }}>{t[cat.key]}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Product Card
function ProductCard({ product, onAdd }) {
    const { t, language } = useApp()
    const name = product.name[language] || product.name.en
    return (
        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #eee' }}>
            <div style={{ position: 'relative', aspectRatio: '1' }}>
                <img src={product.image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {product.badge && <span style={{ position: 'absolute', top: 8, left: 8, background: product.badge === 'sale' ? '#C1272D' : product.badge === 'new' ? '#1a1a1a' : '#C9A227', color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{t[product.badge]}</span>}
            </div>
            <div style={{ padding: 12 }}>
                <p style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>{t[product.category]}</p>
                <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontWeight: 700, color: '#1a1a1a' }}>${product.price}</span>
                    {product.originalPrice && <span style={{ color: '#999', textDecoration: 'line-through', fontSize: 13 }}>${product.originalPrice}</span>}
                </div>
                <button onClick={() => onAdd(product)} style={{ width: '100%', padding: 10, background: '#1a1a1a', color: '#fff', borderRadius: 6, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, border: 'none', cursor: 'pointer' }}>
                    <ShoppingCart size={14} /> {t.addToCart}
                </button>
            </div>
        </div>
    )
}

// Products
function Products({ products, onAdd }) {
    const { t } = useApp()
    const [filter, setFilter] = useState('all')
    const filters = ['all', 'kaftans', 'djellabas', 'shoes', 'dresses']
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter)
    return (
        <section id="products" style={{ padding: '48px 16px', background: '#fafafa' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <h2 style={{ fontSize: 24, marginBottom: 24 }}>{t.featuredProducts}</h2>
                <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                    {filters.map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 16px', borderRadius: 20, border: '1px solid #ddd', background: filter === f ? '#1a1a1a' : '#fff', color: filter === f ? '#fff' : '#333', cursor: 'pointer', fontSize: 13 }}>
                            {f === 'all' ? t.all : t[f]}
                        </button>
                    ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                    {filtered.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}
                </div>
            </div>
        </section>
    )
}

// Features
function Features() {
    const { t } = useApp()
    const items = [
        { icon: <Truck size={20} />, title: t.freeShipping },
        { icon: <Shield size={20} />, title: t.securePayment },
        { icon: <Headphones size={20} />, title: t.support247 },
        { icon: <Package size={20} />, title: t.easyReturns }
    ]
    return (
        <section style={{ padding: '48px 16px', borderTop: '1px solid #eee' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 24 }}>
                {items.map((item, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ width: 48, height: 48, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>{item.icon}</div>
                        <p style={{ fontWeight: 500, fontSize: 14 }}>{item.title}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

// Footer
function Footer() {
    return (
        <footer style={{ background: '#1a1a1a', color: '#fff', padding: '48px 16px 24px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
                    <a href="#" style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Instagram size={18} /></a>
                    <a href="#" style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Facebook size={18} /></a>
                    <a href="#" style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Twitter size={18} /></a>
                </div>
                <p style={{ color: '#888', fontSize: 13 }}>© 2024 MarocBoutique. All rights reserved.</p>
            </div>
        </footer>
    )
}

// Cart Sidebar
function CartSidebar({ isOpen, onClose, cart, updateQty, remove, clear }) {
    const { t, language } = useApp()
    const [checkout, setCheckout] = useState(false)
    const [info, setInfo] = useState({ name: '', phone: '', city: '', address: '' })
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
    const getName = p => p.name[language] || p.name.en

    const sendOrder = (e) => {
        e.preventDefault()
        let msg = `🛒 *New Order*\n\n`
        cart.forEach(i => { msg += `• ${getName(i)} x${i.qty} - $${i.price * i.qty}\n` })
        msg += `\n*Total:* $${total}\n\n*Customer:*\n${info.name}\n${info.phone}\n${info.city}\n${info.address}`
        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank')
        clear()
        setCheckout(false)
        onClose()
    }

    if (!isOpen) return null
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={onClose} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', maxWidth: 400, height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: 16, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontWeight: 600 }}>{checkout ? t.checkout : t.shoppingCart}</h3>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                </div>
                {!checkout ? (
                    <>
                        <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
                            {cart.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: 48, color: '#999' }}><ShoppingCart size={40} /><p style={{ marginTop: 16 }}>{t.cartEmpty}</p></div>
                            ) : cart.map(i => (
                                <div key={i.id} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
                                    <img src={i.image} alt="" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 500, fontSize: 14 }}>{getName(i)}</p>
                                        <p style={{ color: '#666', fontSize: 13 }}>${i.price}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                                            <button onClick={() => updateQty(i.id, i.qty - 1)} style={{ width: 24, height: 24, background: '#f5f5f5', borderRadius: 4, border: 'none', cursor: 'pointer' }}><Minus size={12} /></button>
                                            <span>{i.qty}</span>
                                            <button onClick={() => updateQty(i.id, i.qty + 1)} style={{ width: 24, height: 24, background: '#f5f5f5', borderRadius: 4, border: 'none', cursor: 'pointer' }}><Plus size={12} /></button>
                                        </div>
                                    </div>
                                    <button onClick={() => remove(i.id)} style={{ background: 'transparent', border: 'none', color: '#999', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                        {cart.length > 0 && (
                            <div style={{ padding: 16, borderTop: '1px solid #eee', background: '#fafafa' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontWeight: 600 }}><span>{t.total}</span><span>${total}</span></div>
                                <button onClick={() => setCheckout(true)} style={{ width: '100%', padding: 14, background: '#1a1a1a', color: '#fff', borderRadius: 8, fontWeight: 500, border: 'none', cursor: 'pointer' }}>{t.checkout}</button>
                            </div>
                        )}
                    </>
                ) : (
                    <form onSubmit={sendOrder} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16 }}>
                        <div style={{ flex: 1 }}>
                            {['name', 'phone', 'city', 'address'].map(f => (
                                <div key={f} style={{ marginBottom: 16 }}>
                                    <label style={{ display: 'block', marginBottom: 4, fontWeight: 500, fontSize: 14 }}>{t[f === 'name' ? 'customerName' : f]}</label>
                                    {f === 'address' ? (
                                        <textarea required value={info[f]} onChange={e => setInfo({ ...info, [f]: e.target.value })} style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 8, resize: 'none', height: 80 }} />
                                    ) : (
                                        <input required type={f === 'phone' ? 'tel' : 'text'} value={info[f]} onChange={e => setInfo({ ...info, [f]: e.target.value })} style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 8 }} />
                                    )}
                                </div>
                            ))}
                            <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 8 }}>
                                <p style={{ fontWeight: 500, marginBottom: 8 }}>{t.orderSummary}</p>
                                {cart.map(i => <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span>{getName(i)} x{i.qty}</span><span>${i.price * i.qty}</span></div>)}
                                <div style={{ borderTop: '1px solid #ddd', marginTop: 8, paddingTop: 8, fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}><span>{t.total}</span><span>${total}</span></div>
                            </div>
                        </div>
                        <div style={{ marginTop: 16 }}>
                            <button type="button" onClick={() => setCheckout(false)} style={{ width: '100%', padding: 12, marginBottom: 8, background: '#eee', borderRadius: 8, border: 'none', cursor: 'pointer' }}>{t.back}</button>
                            <button type="submit" style={{ width: '100%', padding: 14, background: '#25D366', color: '#fff', borderRadius: 8, fontWeight: 500, border: 'none', cursor: 'pointer' }}>📱 {t.sendWhatsApp}</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

// ========================================
// ADMIN PANEL (Hidden at secret URL)
// ========================================
function AdminLogin({ onLogin }) {
    const { t } = useApp()
    const [pwd, setPwd] = useState('')
    const [error, setError] = useState(false)
    const handleLogin = (e) => {
        e.preventDefault()
        if (pwd === CONFIG.adminPassword) {
            sessionStorage.setItem('admin_auth', 'true')
            onLogin()
        } else {
            setError(true)
        }
    }
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
            <form onSubmit={handleLogin} style={{ background: '#fff', padding: 32, borderRadius: 12, width: '100%', maxWidth: 360, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Lock size={40} color="#C1272D" />
                    <h2 style={{ marginTop: 12 }}>{t.adminLogin}</h2>
                </div>
                <input type="password" placeholder={t.password} value={pwd} onChange={e => { setPwd(e.target.value); setError(false) }}
                    style={{ width: '100%', padding: 14, border: `1px solid ${error ? '#C1272D' : '#ddd'}`, borderRadius: 8, marginBottom: 16, fontSize: 16 }} />
                {error && <p style={{ color: '#C1272D', fontSize: 13, marginBottom: 12 }}>{t.wrongPassword}</p>}
                <button type="submit" style={{ width: '100%', padding: 14, background: '#1a1a1a', color: '#fff', borderRadius: 8, fontWeight: 500, border: 'none', cursor: 'pointer' }}>{t.login}</button>
            </form>
        </div>
    )
}

function AdminPanel({ products, setProducts }) {
    const { t, language } = useApp()
    const navigate = useNavigate()
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ name: '', category: 'kaftans', price: '', originalPrice: '', image: '', badge: '' })

    const logout = () => { sessionStorage.removeItem('admin_auth'); navigate('/') }
    const getName = p => p.name[language] || p.name.en

    const openAdd = () => {
        setForm({ name: '', category: 'kaftans', price: '', originalPrice: '', image: '', badge: '' })
        setEditing('new')
    }
    const openEdit = (p) => {
        setForm({ name: getName(p), category: p.category, price: p.price.toString(), originalPrice: p.originalPrice?.toString() || '', image: p.image, badge: p.badge || '' })
        setEditing(p.id)
    }
    const save = () => {
        const data = {
            id: editing === 'new' ? Date.now() : editing,
            name: { ar: form.name, fr: form.name, en: form.name },
            category: form.category,
            price: parseFloat(form.price),
            originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
            image: form.image,
            badge: form.badge || null
        }
        let newProducts
        if (editing === 'new') {
            newProducts = [...products, data]
        } else {
            newProducts = products.map(p => p.id === editing ? data : p)
        }
        setProducts(newProducts)
        saveProducts(newProducts)
        setEditing(null)
    }
    const del = (id) => {
        if (confirm(t.delete + '?')) {
            const newProducts = products.filter(p => p.id !== id)
            setProducts(newProducts)
            saveProducts(newProducts)
        }
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: 16 }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h1 style={{ fontSize: 24 }}>{t.dashboard}</h1>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={openAdd} style={{ padding: '10px 20px', background: '#C1272D', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}><Plus size={16} /> {t.addProduct}</button>
                        <button onClick={logout} style={{ padding: '10px 20px', background: '#333', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer' }}>{t.logout}</button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 24 }}>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12 }}><p style={{ color: '#888', fontSize: 13 }}>{t.totalProducts}</p><p style={{ fontSize: 28, fontWeight: 700 }}>{products.length}</p></div>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12 }}><p style={{ color: '#888', fontSize: 13 }}>{t.totalValue}</p><p style={{ fontSize: 28, fontWeight: 700 }}>${products.reduce((s, p) => s + p.price, 0)}</p></div>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f9f9f9' }}>
                                <th style={{ padding: 12, textAlign: 'start', fontSize: 13 }}>Image</th>
                                <th style={{ padding: 12, textAlign: 'start', fontSize: 13 }}>{t.productName}</th>
                                <th style={{ padding: 12, textAlign: 'start', fontSize: 13 }}>{t.category}</th>
                                <th style={{ padding: 12, textAlign: 'start', fontSize: 13 }}>{t.price}</th>
                                <th style={{ padding: 12, textAlign: 'start', fontSize: 13 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id} style={{ borderTop: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: 12 }}><img src={p.image} alt="" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 6 }} /></td>
                                    <td style={{ padding: 12 }}>{getName(p)}</td>
                                    <td style={{ padding: 12 }}>{t[p.category]}</td>
                                    <td style={{ padding: 12 }}>${p.price}</td>
                                    <td style={{ padding: 12 }}>
                                        <button onClick={() => openEdit(p)} style={{ width: 32, height: 32, background: 'rgba(0,128,0,0.1)', color: 'green', borderRadius: 6, border: 'none', cursor: 'pointer', marginRight: 8 }}><Edit size={14} /></button>
                                        <button onClick={() => del(p.id)} style={{ width: 32, height: 32, background: 'rgba(193,39,45,0.1)', color: '#C1272D', borderRadius: 6, border: 'none', cursor: 'pointer' }}><Trash2 size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editing && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: 450, maxHeight: '90vh', overflow: 'auto' }}>
                        <div style={{ padding: 16, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                            <h3>{editing === 'new' ? t.addProduct : t.edit}</h3>
                            <button onClick={() => setEditing(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <div style={{ padding: 16 }}>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>{t.productName}</label>
                                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 8 }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>{t.category}</label>
                                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
                                        {['kaftans', 'djellabas', 'shoes', 'dresses', 'tunics', 'accessories'].map(c => <option key={c} value={c}>{t[c]}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>Badge</label>
                                    <select value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
                                        <option value="">None</option>
                                        <option value="new">{t.new}</option>
                                        <option value="sale">{t.sale}</option>
                                        <option value="hot">{t.hot}</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>{t.price} ($)</label>
                                    <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 8 }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>Original Price</label>
                                    <input type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 8 }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>{t.imageUrl}</label>
                                <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 8 }} placeholder="https://..." />
                            </div>
                        </div>
                        <div style={{ padding: 16, borderTop: '1px solid #eee', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setEditing(null)} style={{ padding: '10px 20px', background: '#eee', borderRadius: 8, border: 'none', cursor: 'pointer' }}>{t.cancel}</button>
                            <button onClick={save} style={{ padding: '10px 20px', background: '#1a1a1a', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer' }}>{t.save}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function AdminRoute({ products, setProducts }) {
    const [auth, setAuth] = useState(sessionStorage.getItem('admin_auth') === 'true')
    if (!auth) return <AdminLogin onLogin={() => setAuth(true)} />
    return <AdminPanel products={products} setProducts={setProducts} />
}

// ========================================
// MAIN APP
// ========================================
function App() {
    const [language, setLanguage] = useState('ar')
    const [products, setProducts] = useState(loadProducts)
    const [cart, setCart] = useState([])
    const [cartOpen, setCartOpen] = useState(false)

    const t = translations[language]

    useEffect(() => {
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
        document.documentElement.lang = language
    }, [language])

    const addToCart = (p) => {
        setCart(prev => {
            const exists = prev.find(i => i.id === p.id)
            if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
            return [...prev, { ...p, qty: 1 }]
        })
    }
    const updateQty = (id, qty) => {
        if (qty <= 0) setCart(prev => prev.filter(i => i.id !== id))
        else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
    }
    const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))
    const clearCart = () => setCart([])
    const cartCount = cart.reduce((s, i) => s + i.qty, 0)

    return (
        <AppContext.Provider value={{ language, setLanguage, t }}>
            <Router>
                <Routes>
                    <Route path={CONFIG.adminUrl} element={<AdminRoute products={products} setProducts={setProducts} />} />
                    <Route path="*" element={
                        <>
                            <Header onCartClick={() => setCartOpen(true)} cartCount={cartCount} />
                            <Hero />
                            <Categories />
                            <Products products={products} onAdd={addToCart} />
                            <Features />
                            <Footer />
                            <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart} updateQty={updateQty} remove={removeFromCart} clear={clearCart} />
                        </>
                    } />
                </Routes>
            </Router>
        </AppContext.Provider>
    )
}

export default App
