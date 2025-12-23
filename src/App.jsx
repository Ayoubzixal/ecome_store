import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, Search, Menu, X, Plus, Minus, Trash2, Edit, Package, Truck, Shield, Headphones, ArrowRight, Instagram, Facebook, Twitter, Globe, Lock, ShoppingBag, Settings, LogOut, CheckCircle, AlertCircle, Percent, BarChart, Tag, MessageCircle } from 'lucide-react'

// ========================================
// CONFIG & DEFAULTS
// ========================================
const DEFAULT_CONFIG = {
    storeName: 'MarocBoutique',
    whatsappNumber: '212600000000',
    adminPassword: 'seller2024',
    adminUrl: '/manage-store-2025',
    currency: 'USD',
    announcement: 'Free Shipping on orders over $150! 🚚',
    pixelId: '',
    promoCodes: [{ code: 'WELCOME10', discount: 10, active: true }]
}

const DEFAULT_PRODUCTS = [
    { id: 1, name: { ar: "قفطان ملكي", fr: "Caftan Royal", en: "Royal Kaftan" }, category: "kaftans", price: 299, originalPrice: 399, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", badge: "hot" },
    { id: 2, name: { ar: "بلغة جلدية", fr: "Babouche Cuir", en: "Leather Babouche" }, category: "shoes", price: 89, originalPrice: null, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500", badge: "new" },
    { id: 3, name: { ar: "جلابة مطرزة", fr: "Djellaba Brodée", en: "Embroidered Djellaba" }, category: "djellabas", price: 199, originalPrice: 249, image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=500", badge: "sale" },
    { id: 4, name: { ar: "فستان مغربي", fr: "Robe Marocaine", en: "Moroccan Dress" }, category: "dresses", price: 159, originalPrice: null, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500", badge: "new" },
    { id: 5, name: { ar: "قفطان عروس", fr: "Caftan Mariée", en: "Bridal Kaftan" }, category: "kaftans", price: 599, originalPrice: null, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500", badge: "hot" },
    { id: 6, name: { ar: "صندل جلدي", fr: "Sandales Cuir", en: "Leather Sandals" }, category: "shoes", price: 75, originalPrice: 95, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500", badge: "sale" }
]

const TRANSLATIONS = {
    en: {
        home: "Home", marketing: "Marketing", promoCode: "Promo Code", apply: "Apply",
        discount: "Discount", total: "Total", subtotal: "Subtotal", checkout: "Checkout",
        announcement: "Announcement Bar", addPromo: "Add Code", active: "Active",
        orders: "Orders", products: "Products", settings: "Settings", dashboard: "Dashboard",
        logout: "Logout", save: "Save", delete: "Delete", edit: "Edit",
        heroTitle: "Discover Moroccan Elegance", heroDesc: "Handcrafted Kaftans, Djellabas & More.", shopNow: "Shop Now"
    },
    ar: {
        home: "الرئيسية", marketing: "التسويق", promoCode: "كود خصم", apply: "تطبيق",
        discount: "خصم", total: "المجموع", subtotal: "المجموع الفرعي", checkout: "إتمام الطلب",
        announcement: "شريط الإعلانات", addPromo: "إضافة كود", active: "نشط",
        orders: "الطلبات", products: "المنتجات", settings: "الإعدادات", dashboard: "الرئيسية",
        logout: "خروج", save: "حفظ", delete: "حذف", edit: "تعديل",
        heroTitle: "اكتشف الأناقة المغربية", heroDesc: "قفاطين، جلابيب، وأحذية مصنوعة يدوياً.", shopNow: "تسوق الآن"
    }
}

// ========================================
// HOOKS
// ========================================
const AppContext = createContext()
const useApp = () => useContext(AppContext)
function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
        try { return JSON.parse(window.localStorage.getItem(key)) || defaultValue }
        catch { return defaultValue }
    })
    useEffect(() => { window.localStorage.setItem(key, JSON.stringify(value)) }, [key, value])
    return [value, setValue]
}

// ========================================
// COMPONENTS
// ========================================
function Header({ onCartClick, cartCount }) {
    const { config, t } = useApp()
    return (
        <>
            {config.announcement && <div className="announcement-bar">{config.announcement}</div>}
            <header className="header">
                <div className="container flex-between" style={{ padding: '12px 16px' }}>
                    <div className="flex-center" style={{ gap: 8 }}>
                        <div className="flex-center" style={{ width: 36, height: 36, background: 'var(--primary)', borderRadius: 8, color: 'white' }}>★</div>
                        <span style={{ fontWeight: 700, fontSize: 18 }}>{config.storeName}</span>
                    </div>
                    <button onClick={onCartClick} className="btn-secondary" style={{ padding: 8, position: 'relative' }}>
                        <ShoppingCart size={20} />
                        {cartCount > 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: 'var(--primary)', color: 'white', fontSize: 10, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
                    </button>
                </div>
            </header>
        </>
    )
}

function ProductCard({ product, onAdd }) {
    const { language, config } = useApp()
    const name = product.name[language] || product.name.en
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={name} loading="lazy" />
                {product.badge && <span className="badge" style={{ background: product.badge === 'sale' ? 'var(--primary)' : '#000' }}>{product.badge}</span>}
            </div>
            <div style={{ padding: 12 }}>
                <div style={{ fontSize: 12, color: '#666', textTransform: 'uppercase' }}>{product.category}</div>
                <h3 style={{ fontSize: 15, fontWeight: 500, margin: '4px 0 8px' }}>{name}</h3>
                <div className="flex-between">
                    <span style={{ fontWeight: 700 }}>{product.price} {config.currency}</span>
                    <button onClick={() => onAdd(product)} className="btn-primary" style={{ padding: '8px 12px' }}><ShoppingCart size={16} /></button>
                </div>
            </div>
        </div>
    )
}

function CartDrawer({ isOpen, onClose, cart, updateQty, remove, config, t }) {
    const [promo, setPromo] = useState('')
    const [discount, setDiscount] = useState(0)
    const [checkout, setCheckout] = useState(false)
    const [info, setInfo] = useState({ name: '', phone: '', address: '' })

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
    const total = subtotal * (1 - discount / 100)

    const applyPromo = () => {
        const code = config.promoCodes.find(c => c.code === promo && c.active)
        if (code) { setDiscount(code.discount); alert(`Success! ${code.discount}% OFF`) }
        else alert('Invalid Code')
    }

    const sendOrder = (e) => {
        e.preventDefault()
        let msg = `🛍️ *New Order*\n\n`
        cart.forEach(i => msg += `• ${i.name.en} x${i.qty}\n`)
        msg += `\n*Subtotal:* ${subtotal} ${config.currency}`
        if (discount > 0) msg += `\n*Discount:* ${discount}%`
        msg += `\n*TOTAL:* ${total.toFixed(2)} ${config.currency}\n\n*Details:*\n${info.name}\n${info.phone}\n${info.address}`
        window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank')
        onClose()
    }

    if (!isOpen) return null
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={onClose} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: 400, background: 'white', display: 'flex', flexDirection: 'column' }}>
                <div className="flex-between" style={{ padding: 16, borderBottom: '1px solid #eee' }}>
                    <h3>{t.checkout}</h3>
                    <button onClick={onClose}><X /></button>
                </div>

                {!checkout ? (
                    <>
                        <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
                            {cart.map(i => (
                                <div key={i.id} className="flex-between" style={{ marginBottom: 16 }}>
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <img src={i.image} style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover' }} />
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{i.name.en}</div>
                                            <div style={{ color: '#666' }}>{i.price} {config.currency}</div>
                                        </div>
                                    </div>
                                    <div className="flex-center" style={{ gap: 8 }}>
                                        <button onClick={() => updateQty(i.id, i.qty - 1)}><Minus size={16} /></button>
                                        <span>{i.qty}</span>
                                        <button onClick={() => updateQty(i.id, i.qty + 1)}><Plus size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: 16, background: '#f9f9f9' }}>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                                <input className="input-field" placeholder={t.promoCode} value={promo} onChange={e => setPromo(e.target.value)} />
                                <button onClick={applyPromo} className="btn-secondary">{t.apply}</button>
                            </div>
                            <div className="flex-between" style={{ marginBottom: 8 }}><span>{t.subtotal}</span><span>{subtotal} {config.currency}</span></div>
                            {discount > 0 && <div className="flex-between" style={{ color: 'green', marginBottom: 8 }}><span>{t.discount}</span><span>-{discount}%</span></div>}
                            <div className="flex-between" style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}><span>{t.total}</span><span>{total.toFixed(2)} {config.currency}</span></div>
                            <button onClick={() => setCheckout(true)} className="btn-primary btn-block">{t.checkout}</button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={sendOrder} style={{ padding: 16 }}>
                        <input required placeholder="Name" className="input-field" style={{ marginBottom: 12 }} value={info.name} onChange={e => setInfo({ ...info, name: e.target.value })} />
                        <input required placeholder="Phone" className="input-field" style={{ marginBottom: 12 }} value={info.phone} onChange={e => setInfo({ ...info, phone: e.target.value })} />
                        <textarea required placeholder="Address" className="input-field" style={{ marginBottom: 12 }} value={info.address} onChange={e => setInfo({ ...info, address: e.target.value })} />
                        <button type="submit" className="btn-primary btn-block">Confirm via WhatsApp</button>
                        <button type="button" onClick={() => setCheckout(false)} className="btn-secondary btn-block" style={{ marginTop: 8 }}>Back</button>
                    </form>
                )}
            </div>
        </div>
    )
}

// ========================================
// ADMIN MARKETING TAB
// ========================================
function MarketingView({ config, setConfig, t }) {
    const [newCode, Code] = useState({ code: '', discount: 10 })
    const addCode = () => {
        setConfig({ ...config, promoCodes: [...(config.promoCodes || []), { ...newCode, active: true }] })
        alert('Code Added!')
    }
    return (
        <div>
            <h2 style={{ fontSize: 24, marginBottom: 24 }}>{t.marketing}</h2>

            <div style={{ background: 'white', padding: 24, borderRadius: 8, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ marginBottom: 16 }}>{t.announcement}</h3>
                <input className="input-field" value={config.announcement} onChange={e => setConfig({ ...config, announcement: e.target.value })} />
                <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>Top banner text</p>
            </div>

            <div style={{ background: 'white', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ marginBottom: 16 }}>Promo Codes</h3>
                <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                    <input className="input-field" placeholder="Code (e.g. SALE50)" value={newCode.code} onChange={e => Code({ ...newCode, code: e.target.value.toUpperCase() })} />
                    <input className="input-field" type="number" placeholder="%" style={{ width: 80 }} value={newCode.discount} onChange={e => Code({ ...newCode, discount: e.target.value })} />
                    <button onClick={addCode} className="btn-primary">{t.addPromo}</button>
                </div>

                <table style={{ width: '100%', borderRadius: 8, overflow: 'hidden' }}>
                    <thead style={{ background: '#f5f5f5' }}>
                        <tr><th style={{ padding: 12, textAlign: 'left' }}>Code</th><th style={{ padding: 12 }}>%</th><th style={{ padding: 12 }}>Active</th><th style={{ padding: 12 }}>Action</th></tr>
                    </thead>
                    <tbody>
                        {(config.promoCodes || []).map((c, i) => (
                            <tr key={i} style={{ borderTop: '1px solid #eee' }}>
                                <td style={{ padding: 12, fontWeight: 600 }}>{c.code}</td>
                                <td style={{ padding: 12, textAlign: 'center' }}>{c.discount}%</td>
                                <td style={{ padding: 12, textAlign: 'center' }}>{c.active ? '✅' : '❌'}</td>
                                <td style={{ padding: 12, textAlign: 'center' }}>
                                    <button onClick={() => {
                                        const updated = [...config.promoCodes]; updated.splice(i, 1);
                                        setConfig({ ...config, promoCodes: updated })
                                    }}><Trash2 size={16} color="red" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// ========================================
// MAIN APP
// ========================================
function App() {
    const [language, setLanguage] = useState('en')
    const [config, setConfig] = useStickyState(DEFAULT_CONFIG, 'store_config_v2')
    const [products, setProducts] = useStickyState(DEFAULT_PRODUCTS, 'store_products_v2')
    const [orders, setOrders] = useStickyState([], 'store_orders_v2')
    const [cart, setCart] = useState([])
    const [isCartOpen, setCartOpen] = useState(false)
    const t = TRANSLATIONS[language] || TRANSLATIONS.en

    const [activeTab, setTab] = useState('dashboard')

    const addToCart = p => {
        setCart(prev => {
            const ex = prev.find(i => i.id === p.id)
            return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }]
        })
        setCartOpen(true)
    }

    return (
        <AppContext.Provider value={{ language, setLanguage, config, setConfig, t }}>
            <Router>
                <Routes>
                    {/* ADMIN */}
                    <Route path={config.adminUrl} element={
                        <div className="admin-layout">
                            <div className="sidebar">
                                <div style={{ padding: 24, fontSize: 20, fontWeight: 700 }}>Admin Panel</div>
                                <nav>
                                    {['dashboard', 'orders', 'products', 'marketing', 'settings'].map(tab => (
                                        <button key={tab} onClick={() => setTab(tab)} className={`sidebar-link ${activeTab === tab ? 'active' : ''}`} style={{ width: '100%' }}>
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                            <div className="admin-content">
                                {activeTab === 'marketing' && <MarketingView config={config} setConfig={setConfig} t={t} />}
                                {/* Other tabs can be implemented similarly to previous version but with new styling */}
                                {activeTab === 'dashboard' && <h2>Dashboard Overview</h2>}
                                {activeTab === 'products' && <h2>Product Management</h2>}
                                {activeTab === 'orders' && <h2>Order History</h2>}
                            </div>
                        </div>
                    } />

                    {/* STOREFRONT */}
                    <Route path="*" element={
                        <>
                            <Header onCartClick={() => setCartOpen(true)} cartCount={cart.reduce((a, c) => a + c.qty, 0)} />

                            {/* HERO */}
                            <div style={{ padding: '80px 16px', textAlign: 'center', background: '#F3F4F6' }}>
                                <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 800, color: '#1F2937', lineHeight: 1.1, marginBottom: 24 }}>
                                    {t.heroTitle}
                                </h1>
                                <p style={{ fontSize: 18, color: '#4B5563', marginBottom: 32 }}>{t.heroDesc}</p>
                                <a href="#shop" className="btn-primary" style={{ fontSize: 18, padding: '12px 32px' }}>{t.shopNow}</a>
                            </div>

                            {/* PRODUCTS */}
                            <div id="shop" className="container" style={{ padding: '60px 16px' }}>
                                <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>{t.products}</h2>
                                <div className="grid-4">
                                    {products.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
                                </div>
                            </div>

                            {/* FLOATING WHATSAPP */}
                            <a href={`https://wa.me/${config.whatsappNumber}`} target="_blank" style={{ position: 'fixed', bottom: 24, right: 24, background: '#25D366', color: 'white', padding: 16, borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 90 }}>
                                <MessageCircle size={32} fill="white" />
                            </a>

                            <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} cart={cart} updateQty={(id, q) => setCart(prev => q <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty: q } : i))} remove={id => setCart(prev => prev.filter(i => i.id !== id))} config={config} t={t} />
                        </>
                    } />
                </Routes>
            </Router>
        </AppContext.Provider>
    )
}

export default App
