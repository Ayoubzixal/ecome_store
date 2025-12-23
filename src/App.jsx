import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, Search, Menu, X, Plus, Minus, Trash2, Edit, Package, Truck, Shield, Headphones, ArrowRight, Instagram, Facebook, Twitter, Globe, Lock, ShoppingBag, Settings, LogOut, CheckCircle, AlertCircle } from 'lucide-react'

// ========================================
// CONFIG DU STORE
// ========================================
const DEFAULT_CONFIG = {
    storeName: 'MarocBoutique',
    whatsappNumber: '212600000000',
    adminPassword: 'seller2024',
    adminUrl: '/manage-store-2025',
    currency: 'USD' // Can be 'DH' or '$'
}

// ========================================
// TRANSLATIONS
// ========================================
const translations = {
    ar: {
        home: "الرئيسية", categories: "الفئات", products: "المنتجات", about: "من نحن",
        heroBadge: "أزياء مغربية أصيلة", heroTitle: "اكتشف جمال", heroTitleHighlight: "المغرب",
        heroDescription: "مجموعة فريدة من القفاطين والجلابيب والأحذية المغربية التقليدية.",
        shopNow: "تسوق الآن", viewAll: "عرض الكل",
        kaftans: "القفاطين", djellabas: "الجلابيب", shoes: "الأحذية", accessories: "الإكسسوارات", dresses: "الفساتين",
        featuredProducts: "منتجات مميزة", all: "الكل", addToCart: "أضف للسلة",
        new: "جديد", sale: "تخفيض", hot: "رائج",
        freeShipping: "شحن مجاني", securePayment: "دفع آمن", support247: "دعم متواصل", easyReturns: "إرجاع سهل",
        shoppingCart: "سلة التسوق", cartEmpty: "سلتك فارغة", total: "المجموع", checkout: "إتمام الطلب",
        adminLogin: "تسجيل دخول المدير", password: "كلمة المرور", login: "دخول", wrongPassword: "كلمة مرور خاطئة",
        dashboard: "لوحة التحكم", orders: "الطلبات", settings: "الإعدادات",
        totalSales: "المبيعات", totalOrders: "الطلبات",
        orderId: "رقم الطلب", customer: "العميل", date: "التاريخ", status: "الحالة", actions: "إجراءات",
        status_pending: "جديد", status_completed: "مكتمل", status_cancelled: "ملغى",
        saveSettings: "حفظ الإعدادات", storeSettings: "إعدادات المتجر",
        orderSent: "تم إرسال الطلب!",
        sendWhatsApp: "أرسل عبر واتساب", back: "رجوع",
        productName: "اسم المنتج", category: "الفئة", price: "السعر", imageUrl: "رابط الصورة",
        save: "حفظ", cancel: "إلغاء", delete: "حذف", edit: "تعديل", logout: "خروج"
    },
    fr: {
        home: "Accueil", categories: "Catégories", products: "Produits", about: "À Propos",
        heroBadge: "Mode Marocaine", heroTitle: "Découvrez", heroTitleHighlight: "le Maroc",
        heroDescription: "Collection unique de caftans, djellabas et chaussures marocaines.",
        shopNow: "Acheter", viewAll: "Voir tout",
        kaftans: "Caftans", djellabas: "Djellabas", shoes: "Chaussures", accessories: "Accessoires", dresses: "Robes",
        featuredProducts: "Produits Vedettes", all: "Tous", addToCart: "Ajouter",
        new: "Nouveau", sale: "Solde", hot: "Tendance",
        freeShipping: "Livraison Gratuite", securePayment: "Paiement Sécurisé", support247: "Support 24/7", easyReturns: "Retours Faciles",
        shoppingCart: "Panier", cartEmpty: "Panier vide", total: "Total", checkout: "Commander",
        adminLogin: "Connexion Admin", password: "Mot de passe", login: "Connexion", wrongPassword: "Mot de passe incorrect",
        dashboard: "Tableau de Bord", orders: "Commandes", settings: "Paramètres",
        totalSales: "Ventes", totalOrders: "Total Commandes",
        orderId: "Réf", customer: "Client", date: "Date", status: "Statut", actions: "Actions",
        status_pending: "Nouveau", status_completed: "Terminé", status_cancelled: "Annulé",
        saveSettings: "Enregistrer", storeSettings: "Paramètres Boutique",
        orderSent: "Commande Envoyée!",
        sendWhatsApp: "Envoyer WhatsApp", back: "Retour",
        productName: "Nom", category: "Catégorie", price: "Prix", imageUrl: "URL Image",
        save: "Enregistrer", cancel: "Annuler", delete: "Supprimer", edit: "Modifier", logout: "Déconnexion"
    },
    en: {
        home: "Home", categories: "Categories", products: "Products", about: "About",
        heroBadge: "Moroccan Fashion", heroTitle: "Discover", heroTitleHighlight: "Morocco",
        heroDescription: "Unique collection of traditional Moroccan kaftans, djellabas, and shoes.",
        shopNow: "Shop Now", viewAll: "View All",
        kaftans: "Kaftans", djellabas: "Djellabas", shoes: "Shoes", accessories: "Accessories", dresses: "Dresses",
        featuredProducts: "Featured Products", all: "All", addToCart: "Add to Cart",
        new: "New", sale: "Sale", hot: "Hot",
        freeShipping: "Free Shipping", securePayment: "Secure Payment", support247: "24/7 Support", easyReturns: "Easy Returns",
        shoppingCart: "Cart", cartEmpty: "Cart is empty", total: "Total", checkout: "Checkout",
        adminLogin: "Admin Login", password: "Password", login: "Login", wrongPassword: "Wrong password",
        dashboard: "Dashboard", orders: "Orders", settings: "Settings",
        totalSales: "Total Sales", totalOrders: "Total Orders",
        orderId: "Order #", customer: "Customer", date: "Date", status: "Status", actions: "Actions",
        status_pending: "New", status_completed: "Completed", status_cancelled: "Cancelled",
        saveSettings: "Save Settings", storeSettings: "Store Settings",
        orderSent: "Order Sent!",
        sendWhatsApp: "Send via WhatsApp", back: "Back",
        productName: "Name", category: "Category", price: "Price", imageUrl: "Image URL",
        save: "Save", cancel: "Cancel", delete: "Delete", edit: "Edit", logout: "Logout"
    }
}

// Default Data
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

// Hooks
const AppContext = createContext()
const useApp = () => useContext(AppContext)
function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
        try {
            const stickyValue = window.localStorage.getItem(key)
            return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
        } catch { return defaultValue }
    })
    useEffect(() => { window.localStorage.setItem(key, JSON.stringify(value)) }, [key, value])
    return [value, setValue]
}

// ========================================
// CORE COMPONENTS
// ========================================
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
                            style={{ display: 'block', width: '100%', padding: '10px 20px', textAlign: 'start', background: language === l.code ? '#C1272D' : '#fff', color: language === l.code ? '#fff' : '#333', border: 'none', cursor: 'pointer' }}>{l.label}</button>
                    ))}
                </div>
            )}
        </div>
    )
}

function Header({ onCartClick, cartCount }) {
    const { config } = useApp()
    return (
        <header style={{ position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid #eee', zIndex: 1000 }}>
            <div style={{ background: '#1a1a1a', color: '#fff', padding: '8px 0', textAlign: 'center', fontSize: 13 }}>Free shipping on orders over $150</div>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #C1272D, #8B0000)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#C9A227', fontSize: 16 }}>★</span>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 18 }}>{config.storeName}</span>
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

function ProductCard({ product, onAdd }) {
    const { t, language, config } = useApp()
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
                    <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{product.price} {config.currency}</span>
                </div>
                <button onClick={() => onAdd(product)} style={{ width: '100%', padding: 10, background: '#1a1a1a', color: '#fff', borderRadius: 6, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, border: 'none', cursor: 'pointer' }}>
                    <ShoppingCart size={14} /> {t.addToCart}
                </button>
            </div>
        </div>
    )
}

function CartSidebar({ isOpen, onClose, cart, updateQty, remove, clear, onOrder }) {
    const { t, language, config } = useApp()
    const [checkout, setCheckout] = useState(false)
    const [info, setInfo] = useState({ name: '', phone: '', city: '', address: '' })
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
    const getName = p => p.name[language] || p.name.en

    const handleOrder = (e) => {
        e.preventDefault()
        const newOrder = {
            id: "ORD-" + Math.floor(Math.random() * 10000),
            date: new Date().toISOString(),
            customer: info,
            items: cart,
            total: total,
            status: 'pending'
        }
        onOrder(newOrder)
        let msg = `🛒 *New Order ${newOrder.id}*\n\n`
        cart.forEach(i => { msg += `• ${getName(i)} x${i.qty} - ${i.price * i.qty} ${config.currency}\n` })
        msg += `\n*Total:* ${total} ${config.currency}\n\n*Customer:*\n${info.name}\n${info.phone}\n${info.city}\n${info.address}`
        window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank')
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
                                        <p style={{ color: '#666', fontSize: 13 }}>{i.price} {config.currency}</p>
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
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontWeight: 600 }}><span>{t.total}</span><span>{total} {config.currency}</span></div>
                                <button onClick={() => setCheckout(true)} style={{ width: '100%', padding: 14, background: '#1a1a1a', color: '#fff', borderRadius: 8, fontWeight: 500, border: 'none', cursor: 'pointer' }}>{t.checkout}</button>
                            </div>
                        )}
                    </>
                ) : (
                    <form onSubmit={handleOrder} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16 }}>
                        <div style={{ flex: 1 }}>
                            {['name', 'phone', 'city', 'address'].map(f => (
                                <div key={f} style={{ marginBottom: 16 }}>
                                    <label style={{ display: 'block', marginBottom: 4, fontWeight: 500, fontSize: 14 }}>{t[f === 'name' ? 'customer' : f]}</label>
                                    {f === 'address' ? (
                                        <textarea required value={info[f]} onChange={e => setInfo({ ...info, [f]: e.target.value })} style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 8, resize: 'none', height: 80 }} />
                                    ) : (
                                        <input required type={f === 'phone' ? 'tel' : 'text'} value={info[f]} onChange={e => setInfo({ ...info, [f]: e.target.value })} style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 8 }} />
                                    )}
                                </div>
                            ))}
                        </div>
                        <button type="submit" style={{ width: '100%', padding: 14, background: '#25D366', color: '#fff', borderRadius: 8, fontWeight: 500, border: 'none', cursor: 'pointer' }}>📱 {t.sendWhatsApp}</button>
                    </form>
                )}
            </div>
        </div>
    )
}

// ========================================
// ADMIN DASHBOARD
// ========================================
function Dashboard({ products, orders, config, setConfig, setProducts, setOrders }) {
    const { t } = useApp()
    const [tab, setTab] = useState('orders')
    const [auth, setAuth] = useState(sessionStorage.getItem('auth') === 'true')
    const [pwd, setPwd] = useState('')
    const navigate = useNavigate()

    // Login Screen
    if (!auth) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#fafafa' }}>
            <div style={{ background: '#fff', padding: 32, borderRadius: 12, border: '1px solid #eee', width: 320 }}>
                <h2>{t.adminLogin}</h2>
                <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} style={{ width: '100%', padding: 10, margin: '16px 0', border: '1px solid #ddd', borderRadius: 6 }} placeholder={t.password} />
                <button onClick={() => { if (pwd === config.adminPassword) { setAuth(true); sessionStorage.setItem('auth', 'true') } else alert(t.wrongPassword) }} style={{ width: '100%', padding: 10, background: '#C1272D', color: '#fff', borderRadius: 6 }}>{t.login}</button>
            </div>
        </div>
    )

    const menu = [
        { id: 'dashboard', label: t.dashboard, icon: <Package size={18} /> },
        { id: 'orders', label: t.orders, icon: <Truck size={18} /> },
        { id: 'products', label: t.products, icon: <ShoppingBag size={18} /> },
        { id: 'settings', label: t.settings, icon: <Settings size={18} /> }
    ]

    // Dashboard Tab Content
    const totalSales = orders.reduce((s, o) => s + o.total, 0)

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
            {/* Sidebar */}
            <div style={{ width: 250, background: '#fff', borderRight: '1px solid #eee', padding: 20 }}>
                <h3 style={{ marginBottom: 32, fontWeight: 800 }}>Admin Panel</h3>
                {menu.map(m => (
                    <button key={m.id} onClick={() => setTab(m.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '12px', marginBottom: 4, borderRadius: 8, background: tab === m.id ? '#C1272D' : 'transparent', color: tab === m.id ? '#fff' : '#555', transition: '0.2s', textAlign: 'start' }}>
                        {m.icon} {m.label}
                    </button>
                ))}
                <button onClick={() => { setAuth(false); sessionStorage.removeItem('auth'); navigate('/') }} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '12px', marginTop: 40, color: '#f44336' }}>
                    <LogOut size={18} /> {t.logout}
                </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
                {tab === 'dashboard' && (
                    <div>
                        <h2 style={{ marginBottom: 24 }}>{t.dashboard}</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
                            <div style={{ background: '#fff', padding: 24, borderRadius: 12 }}>
                                <p style={{ color: '#888', fontSize: 13 }}>{t.totalSales}</p>
                                <p style={{ fontSize: 24, fontWeight: 700 }}>{totalSales} {config.currency}</p>
                            </div>
                            <div style={{ background: '#fff', padding: 24, borderRadius: 12 }}>
                                <p style={{ color: '#888', fontSize: 13 }}>{t.totalOrders}</p>
                                <p style={{ fontSize: 24, fontWeight: 700 }}>{orders.length}</p>
                            </div>
                            <div style={{ background: '#fff', padding: 24, borderRadius: 12 }}>
                                <p style={{ color: '#888', fontSize: 13 }}>{t.products}</p>
                                <p style={{ fontSize: 24, fontWeight: 700 }}>{products.length}</p>
                            </div>
                        </div>
                        <h3>Recent Activity</h3>
                        {/* Reuse Orders Table logic partially or just show list */}
                        <div style={{ background: '#fff', borderRadius: 12, marginTop: 16 }}>
                            {orders.slice(0, 5).map(o => (
                                <div key={o.id} style={{ padding: 16, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{o.id}</span>
                                    <span>{o.total} {config.currency}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {tab === 'orders' && (
                    <div>
                        <h2 style={{ marginBottom: 24 }}>{t.orders}</h2>
                        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                                    <tr>
                                        <th style={{ padding: 16, textAlign: 'start' }}>ID</th>
                                        <th style={{ padding: 16, textAlign: 'start' }}>Customer</th>
                                        <th style={{ padding: 16, textAlign: 'start' }}>Total</th>
                                        <th style={{ padding: 16, textAlign: 'start' }}>Status</th>
                                        <th style={{ padding: 16, textAlign: 'start' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(o => (
                                        <tr key={o.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                            <td style={{ padding: 16, fontSize: 13 }}>{o.id}</td>
                                            <td style={{ padding: 16 }}>{o.customer.name}<br /><span style={{ fontSize: 12, color: '#888' }}>{o.customer.phone}</span></td>
                                            <td style={{ padding: 16, fontWeight: 600 }}>{o.total} {config.currency}</td>
                                            <td style={{ padding: 16 }}><span style={{ padding: '4px 8px', background: '#e3f2fd', color: '#1976d2', borderRadius: 4, fontSize: 12 }}>{t.status_pending}</span></td>
                                            <td style={{ padding: 16 }}>
                                                <button onClick={() => { if (confirm('Delete?')) setOrders(orders.filter(x => x.id !== o.id)) }} style={{ color: 'red' }}><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {tab === 'settings' && (
                    <div>
                        <h2 style={{ marginBottom: 24 }}>{t.settings}</h2>
                        <div style={{ background: '#fff', padding: 24, borderRadius: 12, maxWidth: 500 }}>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: 'block', marginBottom: 8 }}>Store Name</label>
                                <input value={config.storeName} onChange={e => setConfig({ ...config, storeName: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6 }} />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: 'block', marginBottom: 8 }}>WhatsApp Number</label>
                                <input value={config.whatsappNumber} onChange={e => setConfig({ ...config, whatsappNumber: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6 }} />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: 'block', marginBottom: 8 }}>Currency</label>
                                <input value={config.currency} onChange={e => setConfig({ ...config, currency: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6 }} />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: 'block', marginBottom: 8 }}>Admin Password</label>
                                <input value={config.adminPassword} onChange={e => setConfig({ ...config, adminPassword: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6 }} />
                            </div>
                            <button onClick={() => alert('Settings Saved!')} style={{ background: '#1a1a1a', color: '#fff', padding: '10px 20px', borderRadius: 6 }}>{t.saveSettings}</button>
                        </div>
                    </div>
                )}

                {tab === 'products' && (
                    <ProductsView products={products} setProducts={setProducts} />
                )}
            </div>
        </div>
    )
}

// Re-using the ProductView logic from before but wrapping it simply
function ProductsView({ products, setProducts }) {
    const { t, language, config } = useApp()
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({})

    const save = () => {
        const p = { id: editing === 'new' ? Date.now() : editing, name: { ar: form.name, en: form.name, fr: form.name }, price: form.price, image: form.image, category: 'kaftans' }
        setProducts(editing === 'new' ? [...products, p] : products.map(x => x.id === editing ? p : x))
        setEditing(null)
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ marginBottom: 0 }}>{t.products}</h2>
                <button onClick={() => { setForm({}); setEditing('new') }} style={{ background: '#C1272D', color: '#fff', padding: '8px 16px', borderRadius: 8 }}>{t.new}</button>
            </div>
            <div style={{ background: '#fff', borderRadius: 12 }}>
                {products.map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid #eee' }}>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <img src={p.image} style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} />
                            <div>
                                <div style={{ fontWeight: 500 }}>{p.name[language] || p.name.en}</div>
                                <div style={{ fontSize: 13, color: '#888' }}>{p.price} {config.currency}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => { setForm({ name: p.name.en, price: p.price, image: p.image }); setEditing(p.id) }}><Edit size={16} /></button>
                            <button onClick={() => setProducts(products.filter(x => x.id !== p.id))} style={{ color: 'red' }}><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
            {editing && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, width: 300 }}>
                        <h3>Edit</h3>
                        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: 8, margin: '8px 0', border: '1px solid #ddd' }} />
                        <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={{ width: '100%', padding: 8, margin: '8px 0', border: '1px solid #ddd' }} />
                        <input placeholder="Image" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} style={{ width: '100%', padding: 8, margin: '8px 0', border: '1px solid #ddd' }} />
                        <button onClick={save} style={{ width: '100%', padding: 10, background: '#C1272D', color: '#fff', borderRadius: 6, marginTop: 8 }}>Save</button>
                        <button onClick={() => setEditing(null)} style={{ width: '100%', padding: 10, marginTop: 8 }}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}

function PublicStore({ products, addToCart, cartCount, setCartOpen }) {
    const { t, config } = useApp()
    return (
        <>
            <Header onCartClick={() => setCartOpen(true)} cartCount={cartCount} />
            <div style={{ background: '#f5f5f5', padding: '60px 20px', textAlign: 'center' }}>
                <h1 style={{ fontSize: 'clamp(24px, 5vw, 48px)', marginBottom: 16 }}>{t.heroTitle} <span style={{ color: '#C1272D' }}>{t.heroTitleHighlight}</span></h1>
                <p style={{ maxWidth: 500, margin: '0 auto 32px', color: '#666' }}>{t.heroDescription}</p>
                <a href="#products" style={{ display: 'inline-block', padding: '12px 32px', background: '#1a1a1a', color: '#fff', borderRadius: 8, fontWeight: 500 }}>{t.shopNow}</a>
            </div>

            <div id="products" style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
                <h2 style={{ textAlign: 'center', fontSize: 24, marginBottom: 40 }}>{t.featuredProducts}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
                    {products.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
                </div>
            </div>

            <div style={{ background: '#f9f9f9', padding: '40px 20px', textAlign: 'center', borderTop: '1px solid #eee' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', maxWidth: 1000, margin: '0 auto', gap: 32 }}>
                    <div><Truck size={32} style={{ margin: '0 auto 12px' }} /><p style={{ fontWeight: 600 }}>{t.freeShipping}</p></div>
                    <div><Shield size={32} style={{ margin: '0 auto 12px' }} /><p style={{ fontWeight: 600 }}>{t.securePayment}</p></div>
                    <div><Headphones size={32} style={{ margin: '0 auto 12px' }} /><p style={{ fontWeight: 600 }}>{t.support247}</p></div>
                </div>
            </div>

            <footer style={{ background: '#1a1a1a', color: '#fff', padding: 40, textAlign: 'center' }}>
                <p style={{ opacity: 0.6 }}>© 2024 {config.storeName}</p>
            </footer>
        </>
    )
}

function App() {
    const [language, setLanguage] = useState('ar')
    const [products, setProducts] = useStickyState(defaultProducts, 'store_products')
    const [orders, setOrders] = useStickyState([], 'store_orders')
    const [config, setConfig] = useStickyState(DEFAULT_CONFIG, 'store_config')
    const [cart, setCart] = useState([])
    const [cartOpen, setCartOpen] = useState(false)
    const t = translations[language]

    useEffect(() => {
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
        document.documentElement.lang = language
        document.title = config.storeName
    }, [language, config.storeName])

    const addToCart = p => setCart(prev => {
        const ex = prev.find(i => i.id === p.id)
        return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }]
    })

    return (
        <AppContext.Provider value={{ language, setLanguage, t, config, setConfig }}>
            <Router>
                <Routes>
                    <Route path={config.adminUrl} element={<Dashboard products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} config={config} setConfig={setConfig} />} />
                    <Route path="*" element={
                        <>
                            <PublicStore products={products} addToCart={addToCart} cartCount={cart.reduce((s, i) => s + i.qty, 0)} setCartOpen={setCartOpen} />
                            <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart} updateQty={(id, q) => setCart(prev => q <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty: q } : i))} remove={id => setCart(prev => prev.filter(i => i.id !== id))} clear={() => setCart([])} onOrder={o => setOrders([o, ...orders])} />
                        </>
                    } />
                </Routes>
            </Router>
        </AppContext.Provider>
    )
}

export default App
