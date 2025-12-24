import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, Heart, Search, Menu, X, Plus, Minus, Trash2, Edit, Package, Truck, Shield, Headphones, ArrowRight, Instagram, Facebook, Twitter, Globe, Lock, ShoppingBag, Settings, LogOut, CheckCircle, AlertCircle, Percent, BarChart, Tag, MessageCircle, Eye, Share2 } from 'lucide-react'

// ========================================
// CONFIG & CONSTANTS
// ========================================
const DEFAULT_CONFIG = {
    storeName: 'MarocBoutique',
    whatsappNumber: '212600000000',
    adminPassword: 'seller2024',
    adminUrl: '/manage-store-2025',
    currency: 'USD',
    announcement: '✨ Free Shipping on All Orders Over $150! ✨',
    pixelId: '',
    promoCodes: [{ code: 'WELCOME10', discount: 10, active: true }]
}

const CATEGORIES = [
    { id: 'kaftans', label: { en: 'Kaftans', ar: 'قفاطين' }, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500' },
    { id: 'djellabas', label: { en: 'Djellabas', ar: 'جلابيب' }, image: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=500' },
    { id: 'shoes', label: { en: 'Shoes', ar: 'أحذية' }, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500' }
]

const DEFAULT_PRODUCTS = [
    { id: 1, name: { ar: "قفطان ملكي فاخر", en: "Royal Luxury Kaftan" }, category: "kaftans", price: 299, originalPrice: 399, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800", badge: "hot", description: "Handcrafted with premium silk and gold embroidery." },
    { id: 2, name: { ar: "بلغة فاس الجلدية", en: "Fes Leather Babouche" }, category: "shoes", price: 89, originalPrice: null, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800", badge: "new", description: "Authentic leather slippers made in Fes." },
    { id: 3, name: { ar: "جلابة شتوية", en: "Winter Djellaba" }, category: "djellabas", price: 199, originalPrice: 249, image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800", badge: "sale", description: "Warm wool djellaba perfect for cold weather." },
    { id: 4, name: { ar: "قفطان عصري", en: "Modern Chic Kaftan" }, category: "kaftans", price: 159, originalPrice: 180, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800", badge: "new", description: "Contemporary design meets traditional elegance." },
]

const TRANSLATIONS = {
    en: {
        home: "Home", shop: "Shop", products: "Products", about: "About",
        heroTitle: "Moroccan Elegance", heroSubtitle: "Discover the timeless beauty of handcrafted tradition.", shopNow: "Shop Collection",
        featured: "Featured Collection", viewAll: "View All",
        quickView: "Quick View", addToCart: "Add to Cart", outOfStock: "Out of Stock",
        cart: "Shopping Cart", checkout: "Checkout", subtotal: "Subtotal", total: "Total",
        admin: "Admin", dashboard: "Dashboard", marketing: "Marketing", orders: "Orders", settings: "Settings", status: "Status",
        status_pending: "Pending", status_completed: "Completed", status_shipped: "Shipped",
        save: "Save Changes", cancel: "Cancel", delete: "Delete", edit: "Edit",
        search: "Search products...", noResults: "No products found.",
        apply: "Apply", discount: "Discount", promoCode: "Promo Code"
    },
    ar: {
        home: "الرئيسية", shop: "المتجر", products: "المنتجات", about: "من نحن",
        heroTitle: "أناقة مغربية", heroSubtitle: "اكتشف الجمال الخالد للتقاليد اليدوية.", shopNow: "تسوق المجموعة",
        featured: "مجموعة مميزة", viewAll: "عرض الكل",
        quickView: "نظرة سريعة", addToCart: "أضف للسلة", outOfStock: "نفذت الكمية",
        cart: "سلة التسوق", checkout: "إتمام الطلب", subtotal: "المجموع الفرعي", total: "المجموع",
        admin: "الإدارة", dashboard: "الرئيسية", marketing: "التسويق", orders: "الطلبات", settings: "الإعدادات", status: "الحالة",
        status_pending: "قيد الانتظار", status_completed: "مكتمل", status_shipped: "تم الشحن",
        save: "حفظ التغييرات", cancel: "إلغاء", delete: "حذف", edit: "تعديل",
        search: "بحث في المنتجات...", noResults: "لا توجد منتجات.",
        apply: "تطبيق", discount: "خصم", promoCode: "كود الخصم"
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

function ProductModal({ product, onClose, onAdd }) {
    const { config, language, t } = useApp()
    if (!product) return null
    const name = product.name[language] || product.name.en

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div style={{ background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={product.image} alt={name} style={{ maxHeight: '500px', objectFit: 'contain' }} />
                </div>
                <div style={{ padding: 40, display: 'flex', flexDirection: 'column' }}>
                    <div className="flex-between" style={{ marginBottom: 16 }}>
                        <span className="badge" style={{ background: '#000', position: 'static' }}>{product.badge || 'NEW'}</span>
                        <button onClick={onClose}><X size={24} /></button>
                    </div>
                    <h2 style={{ fontSize: 32, marginBottom: 12 }}>{name}</h2>
                    <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: 'var(--primary)' }}>
                        {product.price} {config.currency}
                        {product.originalPrice && <span style={{ fontSize: 16, color: '#999', textDecoration: 'line-through', marginLeft: 12 }}>{product.originalPrice} {config.currency}</span>}
                    </div>
                    <p style={{ color: '#666', lineHeight: 1.6, marginBottom: 32 }}>{product.description || 'No description available.'}</p>

                    <div style={{ marginTop: 'auto' }}>
                        <button onClick={() => { onAdd(product); onClose() }} className="btn btn-primary" style={{ width: '100%', padding: 16, fontSize: 18 }}>
                            {t.addToCart} - {product.price} {config.currency}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProductCard({ product, onQuickView, onAdd }) {
    const { language, config } = useApp()
    const name = product.name[language] || product.name.en
    return (
        <div className="prod-card group">
            <div className="prod-img-wrap">
                <img src={product.image} alt={name} className="prod-img" />
                {product.badge && <span className="badge" style={{ background: 'var(--primary)', position: 'absolute', top: 10, left: 10 }}>{product.badge}</span>}
                <div className="prod-actions">
                    <button onClick={() => onQuickView(product)} className="icon-btn"><Eye size={18} /></button>
                    <button onClick={() => onAdd(product)} className="icon-btn"><ShoppingCart size={18} /></button>
                </div>
            </div>
            <div style={{ padding: 16 }}>
                <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>{product.category}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</h3>
                <div style={{ fontWeight: 700 }}>{product.price} {config.currency}</div>
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
        const code = config.promoCodes.find(c => c.code === promo.toUpperCase() && c.active)
        if (code) { setDiscount(code.discount); alert(`Success! ${code.discount}% OFF`) } else alert('Invalid Code')
    }

    const sendOrder = (e) => {
        e.preventDefault()
        let msg = `🛍️ *New Order*\n\n`
        cart.forEach(i => msg += `• ${i.name.en} x${i.qty}\n`)
        msg += `\n*Total:* ${total.toFixed(2)} ${config.currency}\n\n*Details:*\n${info.name}\n${info.phone}\n${info.address}`
        window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank')
        onClose()
    }

    if (!isOpen) return null
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={onClose} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: 450, background: 'white', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }}>
                <div className="flex-between" style={{ padding: 20, borderBottom: '1px solid #eee' }}>
                    <h2 style={{ fontSize: 20 }}>{t.cart} ({cart.length})</h2>
                    <button onClick={onClose}><X /></button>
                </div>

                {!checkout ? (
                    <>
                        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
                            {cart.length === 0 ? <div style={{ textAlign: 'center', marginTop: 100, color: '#999' }}>Empty Cart</div> : cart.map(i => (
                                <div key={i.id} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                                    <img src={i.image} style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <div className="flex-between">
                                            <h4 style={{ fontSize: 15 }}>{i.name.en}</h4>
                                            <button onClick={() => remove(i.id)} style={{ color: '#999' }}><X size={16} /></button>
                                        </div>
                                        <p style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>{i.price} {config.currency}</p>
                                        <div className="flex-center" style={{ width: 'fit-content', border: '1px solid #eee', borderRadius: 4 }}>
                                            <button onClick={() => updateQty(i.id, i.qty - 1)} style={{ padding: '4px 8px' }}><Minus size={14} /></button>
                                            <span style={{ padding: '0 8px', fontSize: 13 }}>{i.qty}</span>
                                            <button onClick={() => updateQty(i.id, i.qty + 1)} style={{ padding: '4px 8px' }}><Plus size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: 20, background: '#f9fafb', borderTop: '1px solid #eee' }}>
                            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                                <input className="input" placeholder={t.promoCode} value={promo} onChange={e => setPromo(e.target.value)} style={{ marginBottom: 0 }} />
                                <button onClick={applyPromo} className="btn btn-outline">{t.apply}</button>
                            </div>
                            <div className="flex-between" style={{ marginBottom: 8 }}><span>{t.subtotal}</span><span>{subtotal} {config.currency}</span></div>
                            {discount > 0 && <div className="flex-between" style={{ color: 'green', marginBottom: 8 }}><span>{t.discount}</span><span>-{discount}%</span></div>}
                            <div className="flex-between" style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}><span>{t.total}</span><span>{total.toFixed(2)} {config.currency}</span></div>
                            <button onClick={() => setCheckout(true)} className="btn btn-primary" style={{ width: '100%', padding: 14 }}>{t.checkout}</button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={sendOrder} style={{ padding: 20 }}>
                        <h3 style={{ marginBottom: 20 }}>Shipping Details</h3>
                        <div style={{ marginBottom: 16 }}><label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Full Name</label><input required className="input" value={info.name} onChange={e => setInfo({ ...info, name: e.target.value })} /></div>
                        <div style={{ marginBottom: 16 }}><label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Phone Number</label><input required className="input" value={info.phone} onChange={e => setInfo({ ...info, phone: e.target.value })} /></div>
                        <div style={{ marginBottom: 24 }}><label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>City & Address</label><textarea required className="input" rows={3} value={info.address} onChange={e => setInfo({ ...info, address: e.target.value })} /></div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 14 }}>Complete Order</button>
                        <button type="button" onClick={() => setCheckout(false)} style={{ width: '100%', marginTop: 12, padding: 12 }}>Back to Cart</button>
                    </form>
                )}
            </div>
        </div>
    )
}

function AdminView({ config, setConfig, products, setProducts, orders, setOrders, t }) {
    const [tab, setTab] = useState('orders')
    const [newPromo, setNewPromo] = useState({ code: '', discount: '' })

    const updateOrderStatus = (id, status) => setOrders(orders.map(o => o.id === id ? { ...o, status } : o))

    const addPromo = () => {
        if (!newPromo.code || !newPromo.discount) return alert('Please enter code and discount')
        setConfig({ ...config, promoCodes: [...config.promoCodes, { ...newPromo, active: true }] })
        setNewPromo({ code: '', discount: '' })
        alert('Promo Code Added')
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
            <div className="admin-sidebar hidden-mobile">
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 40 }}>Store Manager</div>
                {['dashboard', 'orders', 'products', 'marketing', 'settings'].map(item => (
                    <button key={item} onClick={() => setTab(item)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', width: '100%', textAlign: 'left', borderRadius: 8, marginBottom: 4, background: tab === item ? '#000' : 'transparent', color: tab === item ? '#fff' : '#666' }}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                ))}
            </div>
            <div className="admin-main" style={{ flex: 1, marginLeft: 260 }}>
                {tab === 'orders' && (
                    <div>
                        <h2 style={{ fontSize: 24, marginBottom: 24 }}>Recent Orders</h2>
                        <div className="card">
                            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                <thead style={{ background: '#f9fafb', borderBottom: '1px solid #eee' }}>
                                    <tr><th style={{ padding: 16 }}>Order ID</th><th style={{ padding: 16 }}>Customer</th><th style={{ padding: 16 }}>Total</th><th style={{ padding: 16 }}>Status</th></tr>
                                </thead>
                                <tbody>
                                    {orders.map(o => (
                                        <tr key={o.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: 16 }}>{o.id}</td>
                                            <td style={{ padding: 16 }}>{o.customer.name}</td>
                                            <td style={{ padding: 16 }}>{o.total} {config.currency}</td>
                                            <td style={{ padding: 16 }}>
                                                <select value={o.status || 'pending'} onChange={(e) => updateOrderStatus(o.id, e.target.value)} style={{ padding: 6, borderRadius: 4, border: '1px solid #ddd' }}>
                                                    <option value="pending">Pending</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {tab === 'marketing' && (
                    <div>
                        <h2 style={{ fontSize: 24, marginBottom: 24 }}>Marketing Tools</h2>
                        <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                            <h3 style={{ marginBottom: 16 }}>Announcement Bar</h3>
                            <input className="input" value={config.announcement} onChange={e => setConfig({ ...config, announcement: e.target.value })} placeholder="Enter top banner text..." />
                        </div>
                        <div className="card" style={{ padding: 24 }}>
                            <h3>Promo Codes</h3>
                            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                                <input className="input" placeholder="Code (e.g. SALE50)" value={newPromo.code} onChange={e => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })} style={{ marginBottom: 0 }} />
                                <input className="input" type="number" placeholder="%" value={newPromo.discount} onChange={e => setNewPromo({ ...newPromo, discount: e.target.value })} style={{ width: 80, marginBottom: 0 }} />
                                <button className="btn btn-primary" onClick={addPromo}>Add</button>
                            </div>
                            {config.promoCodes.map((c, i) => (
                                <div key={i} className="flex-between" style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
                                    <code>{c.code}</code>
                                    <span>{c.discount}% OFF</span>
                                    <button onClick={() => {
                                        const updated = [...config.promoCodes]; updated.splice(i, 1);
                                        setConfig({ ...config, promoCodes: updated })
                                    }}><Trash2 size={16} color="red" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* Add other tabs simplified */}
                {tab === 'products' && <h2>Products Management (Coming Soon)</h2>}
                {tab === 'dashboard' && <h2>Dashboard Overview (Coming Soon)</h2>}
                {tab === 'settings' && <h2>Settings (Coming Soon)</h2>}
            </div>
        </div>
    )
}

function Home({ products, onQuickView, onAdd, t }) {
    return (
        <>
            <div className="hero">
                <div>
                    <h1 className="animate-slide">{t.heroTitle}</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: 32, opacity: 0.9 }}>{t.heroSubtitle}</p>
                    <a href="#shop" className="btn btn-primary" style={{ padding: '12px 32px', fontSize: 18 }}>{t.shopNow}</a>
                </div>
            </div>

            <div className="container" style={{ margin: '60px auto' }}>
                <div className="grid-3">
                    {CATEGORIES.map(cat => (
                        <div key={cat.id} className="cat-card">
                            <img src={cat.image} alt={cat.label.en} />
                            <div className="cat-overlay">
                                <span className="cat-title">{cat.label.en}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id="shop" className="container" style={{ marginBottom: 100 }}>
                <div className="flex-between" style={{ marginBottom: 32 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700 }}>{t.featured}</h2>
                    <button className="btn btn-outline">{t.viewAll}</button>
                </div>
                <div className="grid-products">
                    {products.map(p => <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAdd={onAdd} />)}
                </div>
            </div>
        </>
    )
}

// ========================================
// APP ROUTER
// ========================================
function App() {
    const [language, setLanguage] = useState('en')
    const [config, setConfig] = useStickyState(DEFAULT_CONFIG, 'config_v3')
    const [products, setProducts] = useStickyState(DEFAULT_PRODUCTS, 'products_v3')
    const [orders, setOrders] = useStickyState([], 'orders_v3')
    const [cart, setCart] = useState([])
    const [cartOpen, setCartOpen] = useState(false)
    const [viewProduct, setViewProduct] = useState(null)

    const t = TRANSLATIONS[language]

    const addToCart = (p) => {
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
                    <Route path={config.adminUrl} element={<AdminView config={config} setConfig={setConfig} products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} t={t} />} />
                    <Route path="*" element={
                        <>
                            <div style={{ background: '#000', color: '#fff', textAlign: 'center', padding: 8, fontSize: 13, fontWeight: 500 }}>{config.announcement}</div>
                            <nav className="header">
                                <div className="container flex-between" style={{ height: 70 }}>
                                    <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>{config.storeName}</div>
                                    <div style={{ display: 'flex', gap: 16 }}>
                                        <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="btn-outline" style={{ padding: '6px 12px' }}>{language.toUpperCase()}</button>
                                        <button onClick={() => setCartOpen(true)} className="btn-primary" style={{ padding: '8px 16px', borderRadius: 20 }}>
                                            <ShoppingCart size={18} style={{ marginRight: 8 }} /> {cart.length}
                                        </button>
                                    </div>
                                </div>
                            </nav>

                            <Home products={products} onQuickView={setViewProduct} onAdd={addToCart} t={t} />

                            <footer style={{ background: '#111827', color: 'white', padding: '60px 0', marginTop: 60 }}>
                                <div className="container grid-3" style={{ gap: 60 }}>
                                    <div>
                                        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>{config.storeName}</h3>
                                        <p style={{ color: '#9CA3AF', lineHeight: 1.6 }}>Authentic Moroccan craftsmanship delivered to your doorstep. Experience the luxury of tradition.</p>
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 600, marginBottom: 20 }}>Customer Service</h4>
                                        <p style={{ color: '#9CA3AF', marginBottom: 8 }}>Contact Us</p>
                                        <p style={{ color: '#9CA3AF', marginBottom: 8 }}>Shipping Policy</p>
                                        <p style={{ color: '#9CA3AF' }}>Returns & Exchanges</p>
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 600, marginBottom: 20 }}>Follow Us</h4>
                                        <div style={{ display: 'flex', gap: 16 }}>
                                            <Instagram /> <Facebook /> <Twitter />
                                        </div>
                                    </div>
                                </div>
                            </footer>

                            <ProductModal product={viewProduct} onClose={() => setViewProduct(null)} onAdd={addToCart} />
                            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart} updateQty={(id, q) => setCart(prev => q <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty: q } : i))} remove={id => setCart(prev => prev.filter(i => i.id !== id))} config={config} t={t} />

                            <a href={`https://wa.me/${config.whatsappNumber}`} target="_blank" style={{ position: 'fixed', bottom: 30, right: 30, background: '#25D366', padding: 16, borderRadius: '50%', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', zIndex: 90 }}>
                                <MessageCircle size={32} color="white" fill="white" />
                            </a>
                        </>
                    } />
                </Routes>
            </Router>
        </AppContext.Provider>
    )
}

export default App
