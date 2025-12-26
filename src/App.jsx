import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, Heart, Search, Menu, X, Plus, Minus, Trash2, Edit, Package, Truck, Shield, Headphones, ArrowRight, Instagram, Facebook, Twitter, Globe, Lock, ShoppingBag, Settings, LogOut, CheckCircle, AlertCircle, Percent, BarChart, Tag, MessageCircle, Eye, Share2, DollarSign, Users, Calendar, FileText, Printer, ChevronRight, XCircle, Image as ImageIcon, Save, Key, Grid, Layout } from 'lucide-react'

// ========================================
// CONFIG & CONSTANTS
// ========================================
const DEFAULT_CONFIG = {
    storeName: 'MarocBoutique',
    logoUrl: '',
    whatsappNumber: '212600000000',
    adminPassword: 'seller2024',
    adminUrl: '/Ayoub',
    currency: 'USD',
    announcement: '✨ Free Shipping on All Orders Over $150! ✨',
    pixelId: '',
    promoCodes: [{ code: 'WELCOME10', discount: 10, active: true }],
    categories: [
        { id: 'kaftans', label: { en: 'Kaftans', ar: 'قفاطين' }, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500' },
        { id: 'djellabas', label: { en: 'Djellabas', ar: 'جلابيب' }, image: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=500' },
        { id: 'shoes', label: { en: 'Shoes', ar: 'أحذية' }, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500' },
        { id: 'accessories', label: { en: 'Accessories', ar: 'إكسسوارات' }, image: 'https://images.unsplash.com/photo-1605701250441-2bfa95839417?w=500' }
    ],
    hero: {
        title: { en: "Moroccan Elegance", ar: "أناقة مغربية" },
        subtitle: { en: "Discover the timeless beauty of handcrafted tradition.", ar: "اكتشف الجمال الخالد للتقاليد اليدوية." },
        image: ''
    },
    socials: { instagram: '', facebook: '', twitter: '', tiktok: '' },
    pages: [
        { id: 'about', title: { en: 'About Us', ar: 'من نحن' }, content: { en: 'Welcome to MarocBoutique. We provide the finest Moroccan handcrafted goods.', ar: 'مرحبًا بكم في MarocBoutique. نحن نقدم أرقى السلع المغربية المصنوعة يدويًا.' }, header: true, footer: true },
        { id: 'contact', title: { en: 'Contact Us', ar: 'اتصل بنا' }, content: { en: 'Email us at support@maroc.com or WhatsApp us.', ar: 'راسلنا على support@maroc.com أو تواصل عبر واتساب.' }, header: true, footer: true },
        { id: 'shipping', title: { en: 'Shipping Policy', ar: 'سياسة الشحن' }, content: { en: 'We ship worldwide within 5-10 business days.', ar: 'نشحن لجميع أنحاء العالم في غضون 5-10 أيام عمل.' }, header: false, footer: true },
        { id: 'privacy', title: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' }, content: { en: 'Your data is safe with us.', ar: 'بياناتك في أمان معنا.' }, header: false, footer: true }
    ]
}

const DEFAULT_PRODUCTS = [
    { id: 1, name: { ar: "قفطان ملكي فاخر", en: "Royal Luxury Kaftan" }, category: "kaftans", price: 299, originalPrice: 399, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800", badge: "hot", description: "Handcrafted with premium silk and gold embroidery." },
    { id: 2, name: { ar: "بلغة فاس الجلدية", en: "Fes Leather Babouche" }, category: "shoes", price: 89, originalPrice: null, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800", badge: "new", description: "Authentic leather slippers made in Fes." },
    { id: 3, name: { ar: "جلابة شتوية", en: "Winter Djellaba" }, category: "djellabas", price: 199, originalPrice: 249, image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800", badge: "sale", description: "Warm wool djellaba perfect for cold weather." },
    { id: 4, name: { ar: "قفطان عصري", en: "Modern Chic Kaftan" }, category: "kaftans", price: 159, originalPrice: 180, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800", badge: "new", description: "Contemporary design meets traditional elegance." },
    { id: 5, name: { ar: "قلادة أمازيغية", en: "Berber Necklace" }, category: "accessories", price: 129, originalPrice: 150, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800", badge: "", description: "Vintage silver Berber necklace." },
    { id: 6, name: { ar: "حقيبة جلدية", en: "Handmade Leather Bag" }, category: "accessories", price: 79, originalPrice: null, image: "https://images.unsplash.com/photo-1590874102051-b54886d9d4e9?w=800", badge: "hot", description: "Classic Moroccan leather satchel." },
    { id: 7, name: { ar: "طقم شاي", en: "Mint Tea Set" }, category: "accessories", price: 49, originalPrice: 65, image: "https://images.unsplash.com/photo-1577987258079-24709d736440?w=800", badge: "sale", description: "Traditional silver teapot with glasses." },
    { id: 8, name: { ar: "زربية مغربية", en: "Berber Rug" }, category: "accessories", price: 450, originalPrice: 600, image: "https://images.unsplash.com/photo-1599692484666-62ce98b8c74e?w=800", badge: "premium", description: "Authentic hand-woven wool rug." },
    { id: 9, name: { ar: "شبشب نسائي", en: "Women's Slippers" }, category: "shoes", price: 45, originalPrice: 55, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800", badge: "", description: "Comfortable embroidered slippers." },
]

const TRANSLATIONS = {
    en: {
        home: "Home", shop: "Shop", products: "Products", about: "About",
        shopNow: "Shop Collection", featured: "Featured Collection", viewAll: "View All",
        quickView: "Quick View", addToCart: "Add to Cart", outOfStock: "Out of Stock",
        cart: "Shopping Cart", checkout: "Checkout", subtotal: "Subtotal", total: "Total",
        admin: "Admin", dashboard: "Dashboard", marketing: "Marketing", orders: "Orders", settings: "Settings", status: "Status",
        status_pending: "Pending", status_completed: "Completed", status_shipped: "Shipped",
        save: "Save Changes", cancel: "Cancel", delete: "Delete", edit: "Edit",
        search: "Search products...", noResults: "No products found.",
        apply: "Apply", discount: "Discount", promoCode: "Promo Code",
        logout: "Log Out", categories: "Categories", contact: "Contact", pages: "Pages"
    },
    ar: {
        home: "الرئيسية", shop: "المتجر", products: "المنتجات", about: "من نحن",
        shopNow: "تسوق المجموعة", featured: "مجموعة مميزة", viewAll: "عرض الكل",
        quickView: "نظرة سريعة", addToCart: "أضف للسلة", outOfStock: "نفذت الكمية",
        cart: "سلة التسوق", checkout: "إتمام الطلب", subtotal: "المجموع الفرعي", total: "المجموع",
        admin: "الإدارة", dashboard: "الرئيسية", marketing: "التسويق", orders: "الطلبات", settings: "الإعدادات", status: "الحالة",
        status_pending: "قيد الانتظار", status_completed: "مكتمل", status_shipped: "تم الشحن",
        save: "حفظ التغييرات", cancel: "إلغاء", delete: "حذف", edit: "تعديل",
        search: "بحث في المنتجات...", noResults: "لا توجد منتجات.",
        apply: "تطبيق", discount: "خصم", promoCode: "كود الخصم",
        logout: "تسجيل الخروج", categories: "التصنيفات", contact: "اتصل بنا", pages: "الصفحات"
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
// UI COMPONENTS
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

// ========================================
// ADMIN COMPONENTS
// ========================================

function AdminDashboard({ orders, products, config, t }) {
    const totalSales = orders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0)
    const avgOrder = orders.length ? (totalSales / orders.length).toFixed(2) : 0

    const stats = [
        { label: 'Total Revenue', value: `${totalSales} ${config.currency}`, icon: <DollarSign size={24} color="#10B981" />, change: '+12%' },
        { label: 'Total Orders', value: orders.length, icon: <ShoppingBag size={24} color="#3B82F6" />, change: '+5%' },
        { label: 'Avg Order Value', value: `${avgOrder} ${config.currency}`, icon: <BarChart size={24} color="#F59E0B" />, change: '+2%' },
        { label: 'Products', value: products.length, icon: <Package size={24} color="#EC4899" />, change: '0%' }
    ]

    return (
        <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Dashboard Overview</h2>
            <div className="grid-products" style={{ marginBottom: 32 }}>
                {stats.map((s, i) => (
                    <div key={i} className="card" style={{ padding: 24 }}>
                        <div className="flex-between" style={{ marginBottom: 16 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
                            <span style={{ fontSize: 13, color: 'green', background: '#DCFCE7', padding: '4px 8px', borderRadius: 20 }}>{s.change}</span>
                        </div>
                        <p style={{ color: '#666', fontSize: 13, fontWeight: 500 }}>{s.label}</p>
                        <h3 style={{ fontSize: 24, fontWeight: 700 }}>{s.value}</h3>
                    </div>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
                <div className="card" style={{ padding: 24 }}>
                    <h3 style={{ marginBottom: 20 }}>Sales Overview</h3>
                    <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                        {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} style={{ flex: 1, background: i === 6 ? 'var(--primary)' : '#E5E7EB', height: `${h}%`, borderRadius: 4, transition: '0.3s' }} title={`Day ${i + 1}`} />
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, color: '#999', fontSize: 12 }}>
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>
                <div className="card" style={{ padding: 24 }}>
                    <h3 style={{ marginBottom: 20 }}>Recent Orders</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {orders.slice(0, 5).map(o => (
                            <div key={o.id} className="flex-between">
                                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <ShoppingBag size={18} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600, fontSize: 14 }}>{o.customer.name}</p>
                                        <p style={{ fontSize: 12, color: '#888' }}>{o.id}</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontWeight: 600, fontSize: 14 }}>{o.total} {config.currency}</p>
                                    <span style={{ fontSize: 11, color: o.status === 'completed' ? 'green' : 'orange' }}>{o.status}</span>
                                </div>
                            </div>
                        ))}
                        {orders.length === 0 && <p style={{ color: '#999', fontSize: 13 }}>No recent orders.</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

function AdminOrders({ orders, setOrders, config }) {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const [selectedOrder, setSelectedOrder] = useState(null)

    const filtered = orders.filter(o =>
        (filter === 'all' || (o.status || 'pending') === filter) &&
        (o.customer.name.toLowerCase().includes(search.toLowerCase()) || o.id.toString().includes(search))
    )

    const updateStatus = (id, status) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status } : o))
        if (selectedOrder && selectedOrder.id === id) setSelectedOrder({ ...selectedOrder, status })
    }

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 28, fontWeight: 700 }}>Orders</h2>
                <div style={{ display: 'flex', gap: 12 }}>
                    <select className="input" value={filter} onChange={e => setFilter(e.target.value)} style={{ width: 150, marginBottom: 0 }}>
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                    </select>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: 10, top: 12, color: '#999' }} />
                        <input className="input" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: 250, paddingLeft: 36, marginBottom: 0 }} />
                    </div>
                </div>
            </div>

            <div className="card">
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f9fafb', borderBottom: '1px solid #eee' }}>
                        <tr><th style={{ padding: 16 }}>Order ID</th><th style={{ padding: 16 }}>Customer</th><th style={{ padding: 16 }}>Date</th><th style={{ padding: 16 }}>Total</th><th style={{ padding: 16 }}>Status</th><th style={{ padding: 16 }}>Action</th></tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? <tr><td colSpan={6} style={{ padding: 24, textAlign: 'center', color: '#888' }}>No orders found</td></tr> : filtered.map(o => (
                            <tr key={o.id} style={{ borderBottom: '1px solid #eee', cursor: 'pointer' }} onClick={() => setSelectedOrder(o)} className="hover:bg-gray-50">
                                <td style={{ padding: 16, fontWeight: 500 }}>#{o.id}</td>
                                <td style={{ padding: 16 }}>
                                    <div style={{ fontWeight: 500 }}>{o.customer.name}</div>
                                    <div style={{ fontSize: 12, color: '#888' }}>{o.customer.phone}</div>
                                </td>
                                <td style={{ padding: 16, color: '#666' }}>{new Date().toLocaleDateString()}</td>
                                <td style={{ padding: 16, fontWeight: 600 }}>{o.total} {config.currency}</td>
                                <td style={{ padding: 16 }}>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
                                        background: o.status === 'completed' ? '#DCFCE7' : o.status === 'shipped' ? '#DBEAFE' : '#FEF3C7',
                                        color: o.status === 'completed' ? '#166534' : o.status === 'shipped' ? '#1E40AF' : '#92400E'
                                    }}>{o.status || 'Pending'}</span>
                                </td>
                                <td style={{ padding: 16 }}>
                                    <button className="icon-btn" style={{ width: 32, height: 32 }}><ChevronRight size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedOrder && (
                <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 600, display: 'block' }}>
                        <div className="flex-between" style={{ padding: 20, borderBottom: '1px solid #eee' }}>
                            <h3 style={{ fontSize: 20 }}>Order #{selectedOrder.id}</h3>
                            <button onClick={() => setSelectedOrder(null)}><X /></button>
                        </div>
                        <div style={{ padding: 24 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                                <div>
                                    <h4 style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>Customer</h4>
                                    <p style={{ fontWeight: 600 }}>{selectedOrder.customer.name}</p>
                                    <p>{selectedOrder.customer.phone}</p>
                                    <p style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{selectedOrder.customer.address}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <h4 style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>Order Status</h4>
                                    <select className="input" value={selectedOrder.status || 'pending'} onChange={e => updateStatus(selectedOrder.id, e.target.value)} style={{ width: 'auto', display: 'inline-block' }}>
                                        <option value="pending">Pending</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ background: '#F9FAFB', borderRadius: 8, padding: 16, marginBottom: 24 }}>
                                {selectedOrder.items && selectedOrder.items.map((item, i) => (
                                    <div key={i} className="flex-between" style={{ marginBottom: 8, fontSize: 14 }}>
                                        <span>{item.name.en || item.name} (x{item.qty})</span>
                                        <span>{(item.price * item.qty).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className="flex-between" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px dashed #ddd', fontWeight: 700, fontSize: 18 }}>
                                    <span>Total</span>
                                    <span>{selectedOrder.total} {config.currency}</span>
                                </div>
                            </div>

                            <div className="flex-between">
                                <button className="btn btn-outline" style={{ gap: 8 }} onClick={() => alert('Printing Invoice...')}>
                                    <Printer size={18} /> Print Invoice
                                </button>
                                <button className="btn btn-primary" style={{ background: '#25D366', border: 'none', gap: 8 }} onClick={() => window.open(`https://wa.me/${selectedOrder.customer.phone}`, '_blank')}>
                                    <MessageCircle size={18} /> Contact Customer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function AdminProducts({ products, setProducts, config }) {
    const [search, setSearch] = useState('')
    const [editing, setEditing] = useState(null)

    const filtered = products.filter(p => (p.name.en.toLowerCase().includes(search.toLowerCase()) || p.name.ar.includes(search)))

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id))
        }
    }

    const handleSave = (e) => {
        e.preventDefault()
        if (!editing.name.en || !editing.price) return alert('Please fill required fields')

        if (editing.id) {
            setProducts(products.map(p => p.id === editing.id ? editing : p))
        } else {
            setProducts([...products, { ...editing, id: Date.now() }])
        }
        setEditing(null)
    }

    const openEdit = (p) => setEditing({ ...p })
    const openNew = () => setEditing({ id: null, name: { en: '', ar: '' }, price: '', originalPrice: '', category: 'kaftans', image: '', description: '', badge: '' })

    if (editing) {
        return (
            <div className="card" style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
                <h3 style={{ fontSize: 24, marginBottom: 24 }}>{editing.id ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleSave}>
                    <div className="grid-2">
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Name (English)</label>
                            <input className="input" required value={editing.name.en} onChange={e => setEditing({ ...editing, name: { ...editing.name, en: e.target.value } })} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Name (Arabic)</label>
                            <input className="input" required value={editing.name.ar} onChange={e => setEditing({ ...editing, name: { ...editing.name, ar: e.target.value } })} style={{ textAlign: 'right' }} />
                        </div>
                    </div>

                    <div className="grid-2">
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Price ({config.currency})</label>
                            <input className="input" type="number" required value={editing.price} onChange={e => setEditing({ ...editing, price: e.target.value })} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Original Price (Optional)</label>
                            <input className="input" type="number" value={editing.originalPrice} onChange={e => setEditing({ ...editing, originalPrice: e.target.value })} />
                        </div>
                    </div>

                    <div className="grid-2">
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Category</label>
                            <select className="input" value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })}>
                                {config.categories.map(c => <option key={c.id} value={c.id}>{c.label.en}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Badge (e.g. New, Sale)</label>
                            <input className="input" value={editing.badge} onChange={e => setEditing({ ...editing, badge: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Image URL</label>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <input className="input" required value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} style={{ marginBottom: 0 }} />
                            {editing.image && <img src={editing.image} style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} />}
                        </div>
                        <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Paste a URL from Unsplash or your hosting.</p>
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Description</label>
                        <textarea className="input" rows={4} value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} />
                    </div>

                    <div className="flex-between" style={{ marginTop: 24 }}>
                        <button type="button" onClick={() => setEditing(null)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary" style={{ gap: 8 }}><Save size={18} /> Save Product</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 28, fontWeight: 700 }}>Products</h2>
                <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: 10, top: 12, color: '#999' }} />
                        <input className="input" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: 250, paddingLeft: 36, marginBottom: 0 }} />
                    </div>
                    <button onClick={openNew} className="btn btn-primary" style={{ gap: 8 }}><Plus size={18} /> Add Product</button>
                </div>
            </div>

            <div className="card">
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f9fafb', borderBottom: '1px solid #eee' }}>
                        <tr><th style={{ padding: 16 }}>Product</th><th style={{ padding: 16 }}>Category</th><th style={{ padding: 16 }}>Price</th><th style={{ padding: 16 }}>Status</th><th style={{ padding: 16 }}>Actions</th></tr>
                    </thead>
                    <tbody>
                        {filtered.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid #eee' }} className="hover:bg-gray-50">
                                <td style={{ padding: 16 }}>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        <img src={p.image} style={{ width: 48, height: 48, borderRadius: 6, objectFit: 'cover' }} />
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{p.name.en}</div>
                                            <div style={{ fontSize: 12, color: '#888' }}>{p.name.ar}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: 16, textTransform: 'capitalize' }}>{p.category}</td>
                                <td style={{ padding: 16, fontWeight: 600 }}>{p.price} {config.currency}</td>
                                <td style={{ padding: 16 }}>{p.badge ? <span className="badge" style={{ background: '#000', position: 'static' }}>{p.badge}</span> : <span style={{ color: '#888' }}>-</span>}</td>
                                <td style={{ padding: 16 }}>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button onClick={() => openEdit(p)} className="icon-btn" style={{ width: 32, height: 32 }}><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(p.id)} className="icon-btn" style={{ width: 32, height: 32, color: 'red' }}><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function AdminCategories({ config, setConfig }) {
    const [editing, setEditing] = useState(null)

    const handleSave = (e) => {
        e.preventDefault()
        const newCats = editing.isNew ? [...config.categories, { ...editing, isNew: undefined }] : config.categories.map(c => c.id === editing.id ? editing : c)
        setConfig({ ...config, categories: newCats })
        setEditing(null)
    }

    const handleDelete = (id) => {
        if (confirm('Delete this category?')) {
            setConfig({ ...config, categories: config.categories.filter(c => c.id !== id) })
        }
    }

    if (editing) {
        return (
            <div className="card" style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
                <h3 style={{ marginBottom: 20 }}>{editing.isNew ? 'Add Category' : 'Edit Category'}</h3>
                <form onSubmit={handleSave}>
                    {!editing.isNew && <div style={{ marginBottom: 16, fontWeight: 600 }}>ID: {editing.id}</div>}
                    {editing.isNew && <div style={{ marginBottom: 16 }}><label>ID (unique, lowercase)</label><input className="input" required value={editing.id} onChange={e => setEditing({ ...editing, id: e.target.value.toLowerCase().replace(/\s/g, '-') })} /></div>}

                    <div className="grid-2">
                        <div><label>Name (En)</label><input className="input" required value={editing.label.en} onChange={e => setEditing({ ...editing, label: { ...editing.label, en: e.target.value } })} /></div>
                        <div><label>Name (Ar)</label><input className="input" required value={editing.label.ar} onChange={e => setEditing({ ...editing, label: { ...editing.label, ar: e.target.value } })} style={{ textAlign: 'right' }} /></div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label>Image URL</label>
                        <input className="input" required value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} />
                        {editing.image && <img src={editing.image} style={{ height: 100, borderRadius: 8 }} />}
                    </div>

                    <div className="flex-between">
                        <button type="button" onClick={() => setEditing(null)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Category</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 28, fontWeight: 700 }}>Categories</h2>
                <button onClick={() => setEditing({ isNew: true, id: '', label: { en: '', ar: '' }, image: '' })} className="btn btn-primary" style={{ gap: 8 }}><Plus size={18} /> Add Category</button>
            </div>
            <div className="grid-3">
                {config.categories.map(c => (
                    <div key={c.id} className="cat-card" style={{ height: 200 }}>
                        <img src={c.image} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                        <div className="cat-overlay" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(0,0,0,0.6)' }}>
                            <div style={{ color: 'white', fontWeight: 700, fontSize: 20 }}>{c.label.en}</div>
                            <div style={{ color: '#ddd', fontSize: 14 }}>{c.label.ar}</div>
                            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                                <button onClick={() => setEditing(c)} className="icon-btn" style={{ background: 'white', color: 'black' }}><Edit size={16} /></button>
                                <button onClick={() => handleDelete(c.id)} className="icon-btn" style={{ background: 'white', color: 'red' }}><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function AdminPages({ config, setConfig }) {
    const [editing, setEditing] = useState(null)

    const handleSave = (e) => {
        e.preventDefault()
        const newPages = editing.isNew
            ? [...config.pages, { ...editing, isNew: undefined }]
            : config.pages.map(p => p.id === editing.id ? editing : p)
        setConfig({ ...config, pages: newPages })
        setEditing(null)
    }

    const handleDelete = (id) => {
        if (confirm('Delete this page?')) {
            setConfig({ ...config, pages: config.pages.filter(p => p.id !== id) })
        }
    }

    if (editing) {
        return (
            <div className="card" style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
                <h3 style={{ marginBottom: 20 }}>{editing.isNew ? 'Create Page' : `Edit Page: ${editing.id}`}</h3>
                <form onSubmit={handleSave}>
                    {editing.isNew && <div style={{ marginBottom: 16 }}><label>Page ID (URL slug)</label><input className="input" required value={editing.id} onChange={e => setEditing({ ...editing, id: e.target.value.toLowerCase().replace(/\s/g, '-') })} placeholder="e.g. return-policy" /></div>}

                    <div className="grid-2">
                        <div><label>Title (En)</label><input className="input" required value={editing.title.en} onChange={e => setEditing({ ...editing, title: { ...editing.title, en: e.target.value } })} /></div>
                        <div><label>Title (Ar)</label><input className="input" required value={editing.title.ar} onChange={e => setEditing({ ...editing, title: { ...editing.title, ar: e.target.value } })} style={{ textAlign: 'right' }} /></div>
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <label>Content (English)</label>
                        <textarea className="input" rows={6} value={editing.content.en} onChange={e => setEditing({ ...editing, content: { ...editing.content, en: e.target.value } })} />
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <label>Content (Arabic)</label>
                        <textarea className="input" rows={6} value={editing.content.ar} onChange={e => setEditing({ ...editing, content: { ...editing.content, ar: e.target.value } })} style={{ textAlign: 'right' }} />
                    </div>

                    <div style={{ marginTop: 24, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
                        <h4 style={{ fontSize: 14, marginBottom: 12 }}>Placement Settings</h4>
                        <div style={{ display: 'flex', gap: 24 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                <input type="checkbox" checked={editing.header} onChange={e => setEditing({ ...editing, header: e.target.checked })} /> Show in Header
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                <input type="checkbox" checked={editing.footer} onChange={e => setEditing({ ...editing, footer: e.target.checked })} /> Show in Footer
                            </label>
                        </div>
                    </div>

                    <div className="flex-between" style={{ marginTop: 24 }}>
                        <button type="button" onClick={() => setEditing(null)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 28, fontWeight: 700 }}>Pages</h2>
                <button onClick={() => setEditing({ isNew: true, id: '', title: { en: '', ar: '' }, content: { en: '', ar: '' }, header: false, footer: true })} className="btn btn-primary" style={{ gap: 8 }}><Plus size={18} /> Create Page</button>
            </div>
            <div className="grid-2">
                {config.pages.map(p => (
                    <div key={p.id} className="card" style={{ padding: 24 }}>
                        <div className="flex-between" style={{ marginBottom: 12 }}>
                            <span style={{ fontWeight: 600, fontSize: 18 }}>{p.title.en}</span>
                            <div style={{ display: 'flex', gap: 4 }}>
                                {p.header && <span className="badge" style={{ background: '#DBEAFE', color: '#1E40AF' }}>Header</span>}
                                {p.footer && <span className="badge" style={{ background: '#F3F4F6', color: '#374151' }}>Footer</span>}
                            </div>
                        </div>
                        <div className="flex-between" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #eee' }}>
                            <a href={`/page/${p.id}`} target="_blank" style={{ fontSize: 13, color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}><Globe size={14} /> View</a>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button onClick={() => setEditing(p)} className="icon-btn" style={{ width: 32, height: 32 }}><Edit size={16} /></button>
                                <button onClick={() => handleDelete(p.id)} className="icon-btn" style={{ width: 32, height: 32, color: 'red' }}><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



function AdminSettings({ config, setConfig }) {
    const [local, setLocal] = useState({ ...config })
    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        setConfig(local)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    const ImagePreview = ({ url, label, height = 120 }) => (
        <div style={{
            width: '100%',
            height,
            background: '#f5f5f5',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '2px dashed #ddd',
            marginTop: 8
        }}>
            {url ? (
                <img src={url} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
                <div style={{ textAlign: 'center', color: '#999' }}>
                    <ImageIcon size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
                    <div style={{ fontSize: 12 }}>No image set</div>
                </div>
            )}
        </div>
    )

    return (
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="flex-between" style={{ marginBottom: 32 }}>
                <div>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Store Settings</h2>
                    <p style={{ color: '#666' }}>Customize your store's appearance and configuration</p>
                </div>
                {saved && (
                    <div style={{
                        background: '#10b981',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        <CheckCircle size={18} /> Saved Successfully!
                    </div>
                )}
            </div>

            {/* Brand Identity */}
            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #e94560, #1a1a2e)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Settings size={20} color="white" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Brand Identity</h3>
                        <p style={{ fontSize: 13, color: '#666' }}>Your store's name and logo</p>
                    </div>
                </div>

                <div className="grid-2">
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>Store Name *</label>
                        <input className="input" value={local.storeName} onChange={e => setLocal({ ...local, storeName: e.target.value })} />

                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, marginTop: 8 }}>Tagline (English)</label>
                        <input className="input" value={local.tagline?.en || ''} onChange={e => setLocal({ ...local, tagline: { ...local.tagline, en: e.target.value } })} placeholder="e.g., Authentic Moroccan Fashion" />

                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, marginTop: 8 }}>Tagline (Arabic)</label>
                        <input className="input" value={local.tagline?.ar || ''} onChange={e => setLocal({ ...local, tagline: { ...local.tagline, ar: e.target.value } })} placeholder="e.g., أزياء مغربية أصيلة" style={{ textAlign: 'right' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>Logo URL</label>
                        <input className="input" value={local.logoUrl} onChange={e => setLocal({ ...local, logoUrl: e.target.value })} placeholder="https://your-logo-url.com/logo.png" />
                        <ImagePreview url={local.logoUrl} label="Logo" height={150} />
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #f59e0b, #ef4444)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Layout size={20} color="white" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Hero Section</h3>
                        <p style={{ fontSize: 13, color: '#666' }}>Customize your homepage banner</p>
                    </div>
                </div>

                <div className="grid-2">
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>Headline (English) *</label>
                        <input className="input" value={local.hero?.title?.en || ''} onChange={e => setLocal({ ...local, hero: { ...local.hero, title: { ...local.hero?.title, en: e.target.value } } })} />

                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, marginTop: 8 }}>Headline (Arabic) *</label>
                        <input className="input" value={local.hero?.title?.ar || ''} onChange={e => setLocal({ ...local, hero: { ...local.hero, title: { ...local.hero?.title, ar: e.target.value } } })} style={{ textAlign: 'right' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>Subtitle (English)</label>
                        <input className="input" value={local.hero?.subtitle?.en || ''} onChange={e => setLocal({ ...local, hero: { ...local.hero, subtitle: { ...local.hero?.subtitle, en: e.target.value } } })} />

                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, marginTop: 8 }}>Subtitle (Arabic)</label>
                        <input className="input" value={local.hero?.subtitle?.ar || ''} onChange={e => setLocal({ ...local, hero: { ...local.hero, subtitle: { ...local.hero?.subtitle, ar: e.target.value } } })} style={{ textAlign: 'right' }} />
                    </div>
                </div>

                <div className="grid-2" style={{ marginTop: 16 }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>Hero Badge Text</label>
                        <input className="input" value={local.hero?.badge || ''} onChange={e => setLocal({ ...local, hero: { ...local.hero, badge: e.target.value } })} placeholder="e.g., ✨ New Collection 2024" />
                        <p style={{ fontSize: 11, color: '#888', marginTop: -8 }}>Appears above the headline</p>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>Hero Background Image URL</label>
                        <input className="input" value={local.hero?.image || ''} onChange={e => setLocal({ ...local, hero: { ...local.hero, image: e.target.value } })} placeholder="https://images.unsplash.com/..." />
                        <ImagePreview url={local.hero?.image} label="Hero Background" height={100} />
                    </div>
                </div>
            </div>

            {/* Configuration */}
            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Key size={20} color="white" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Configuration</h3>
                        <p style={{ fontSize: 13, color: '#666' }}>Store settings and access</p>
                    </div>
                </div>

                <div className="grid-2">
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>Currency</label>
                        <select className="input" value={local.currency} onChange={e => setLocal({ ...local, currency: e.target.value })}>
                            <option value="USD">USD ($)</option>
                            <option value="MAD">MAD (DH)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="SAR">SAR (ر.س)</option>
                            <option value="AED">AED (د.إ)</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>WhatsApp Number</label>
                        <input className="input" value={local.whatsappNumber} onChange={e => setLocal({ ...local, whatsappNumber: e.target.value })} placeholder="212600000000" />
                        <p style={{ fontSize: 11, color: '#888', marginTop: -8 }}>Without + or spaces</p>
                    </div>
                </div>
                <div className="grid-2" style={{ marginTop: 8 }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>Admin Panel URL</label>
                        <input className="input" value={local.adminUrl} onChange={e => setLocal({ ...local, adminUrl: e.target.value })} />
                        <p style={{ fontSize: 11, color: '#888', marginTop: -8 }}>e.g., /admin or /secret-panel</p>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>Admin Password</label>
                        <input className="input" type="password" value={local.adminPassword} onChange={e => setLocal({ ...local, adminPassword: e.target.value })} />
                    </div>
                </div>
            </div>

            {/* Social Media */}
            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #ec4899, #f43f5e)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Share2 size={20} color="white" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Social Media</h3>
                        <p style={{ fontSize: 13, color: '#666' }}>Connect your social accounts</p>
                    </div>
                </div>

                <div className="grid-2">
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13, fontWeight: 600 }}><Instagram size={16} /> Instagram</label>
                        <input className="input" value={local.socials?.instagram || ''} onChange={e => setLocal({ ...local, socials: { ...local.socials, instagram: e.target.value } })} placeholder="https://instagram.com/..." />
                    </div>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13, fontWeight: 600 }}><Facebook size={16} /> Facebook</label>
                        <input className="input" value={local.socials?.facebook || ''} onChange={e => setLocal({ ...local, socials: { ...local.socials, facebook: e.target.value } })} placeholder="https://facebook.com/..." />
                    </div>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13, fontWeight: 600 }}><Twitter size={16} /> Twitter/X</label>
                        <input className="input" value={local.socials?.twitter || ''} onChange={e => setLocal({ ...local, socials: { ...local.socials, twitter: e.target.value } })} placeholder="https://x.com/..." />
                    </div>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13, fontWeight: 600 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg> TikTok
                        </label>
                        <input className="input" value={local.socials?.tiktok || ''} onChange={e => setLocal({ ...local, socials: { ...local.socials, tiktok: e.target.value } })} placeholder="https://tiktok.com/@..." />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div style={{
                position: 'sticky',
                bottom: 20,
                background: 'white',
                padding: 20,
                borderRadius: 12,
                boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 12
            }}>
                <button onClick={() => setLocal({ ...config })} className="btn btn-outline">Reset Changes</button>
                <button className="btn btn-primary" onClick={handleSave} style={{ padding: '14px 40px', fontSize: 16 }}>
                    <Save size={18} /> Save All Changes
                </button>
            </div>
        </div>
    )
}


function AdminView({ config, setConfig, products, setProducts, orders, setOrders, t }) {
    const [tab, setTab] = useState('dashboard')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [newPromo, setNewPromo] = useState({ code: '', discount: '' })

    // const updateOrderStatus = (id, status) => setOrders(orders.map(o => o.id === id ? {...o, status} : o)) // Moved to AdminOrders

    const addPromo = () => {
        if (!newPromo.code || !newPromo.discount) return alert('Please enter code and discount')
        setConfig({ ...config, promoCodes: [...config.promoCodes, { ...newPromo, active: true }] })
        setNewPromo({ code: '', discount: '' })
        alert('Promo Code Added')
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
            {mobileMenuOpen && <div className="overlay-mobile" onClick={() => setMobileMenuOpen(false)} />}

            <div className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`} style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>🏪 Store Manager</div>
                    <button className="mobile-only" onClick={() => setMobileMenuOpen(false)} style={{ color: 'white' }}><X size={20} /></button>
                </div>

                {[
                    { id: 'dashboard', icon: <BarChart size={18} />, label: 'Dashboard' },
                    { id: 'orders', icon: <Package size={18} />, label: 'Orders' },
                    { id: 'products', icon: <ShoppingBag size={18} />, label: 'Products' },
                    { id: 'categories', icon: <Grid size={18} />, label: 'Categories' },
                    { id: 'pages', icon: <FileText size={18} />, label: 'Pages' },
                    { id: 'marketing', icon: <Tag size={18} />, label: 'Marketing' },
                    { id: 'settings', icon: <Settings size={18} />, label: 'Settings' }
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => { setTab(item.id); setMobileMenuOpen(false) }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '14px 16px',
                            width: '100%',
                            textAlign: 'left',
                            borderRadius: 10,
                            marginBottom: 4,
                            background: tab === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
                            color: tab === item.id ? '#fff' : 'rgba(255,255,255,0.6)',
                            fontWeight: tab === item.id ? 600 : 400,
                            border: tab === item.id ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                            transition: 'all 0.2s'
                        }}
                    >
                        {item.icon} {item.label}
                    </button>
                ))}

                <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <Link to="/" className="btn" style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: 8, padding: '12px' }}>
                        <LogOut size={18} /> Exit Admin
                    </Link>
                </div>
            </div>

            <div className="admin-main" style={{ flex: 1, marginLeft: 260 }}>
                <div className="md:hidden" style={{ marginBottom: 20 }}>
                    <button onClick={() => setMobileMenuOpen(true)} className="btn btn-outline" style={{ padding: '8px 12px' }}><Menu size={20} /> Menu</button>
                </div>

                {tab === 'dashboard' && <AdminDashboard orders={orders} products={products} config={config} t={t} />}

                {tab === 'orders' && <AdminOrders orders={orders} setOrders={setOrders} config={config} />}

                {tab === 'products' && <AdminProducts products={products} setProducts={setProducts} config={config} />}

                {tab === 'categories' && <AdminCategories config={config} setConfig={setConfig} />}

                {tab === 'pages' && <AdminPages config={config} setConfig={setConfig} />}

                {tab === 'settings' && <AdminSettings config={config} setConfig={setConfig} />}

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
            </div>
        </div>
    )
}




function ShopPage({ products, config, onQuickView, onAdd, t }) {
    const { language } = useApp()
    const [filterCat, setFilterCat] = useState('all')
    const [priceRange, setPriceRange] = useState(1000)
    const [sort, setSort] = useState('newest')
    const [searchQuery, setSearchQuery] = useState('')

    const filtered = products.filter(p => {
        const matchesCat = filterCat === 'all' || p.category === filterCat
        const matchesPrice = p.price <= priceRange
        const matchesSearch = searchQuery === '' ||
            p.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCat && matchesPrice && matchesSearch
    }).sort((a, b) => {
        if (sort === 'price_asc') return a.price - b.price
        if (sort === 'price_desc') return b.price - a.price
        if (sort === 'name') return a.name[language].localeCompare(b.name[language])
        return b.id - a.id
    })

    const maxPrice = Math.max(...products.map(p => p.price), 1000)
    const categoryCount = (catId) => products.filter(p => catId === 'all' ? true : p.category === catId).length

    return (
        <div className="shop-layout">
            {/* Sidebar Filters */}
            <aside className="shop-sidebar">
                <div className="filter-card">
                    <h3 className="filter-title">
                        <Grid size={20} /> Filters
                    </h3>

                    {/* Search */}
                    <div className="filter-section">
                        <h4>Search</h4>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                            <input
                                className="input"
                                style={{ paddingLeft: 44, marginBottom: 0 }}
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="filter-section">
                        <h4>Categories</h4>
                        <label className="filter-option">
                            <input
                                type="radio"
                                name="category"
                                checked={filterCat === 'all'}
                                onChange={() => setFilterCat('all')}
                            />
                            <span>All Products</span>
                            <span style={{ marginLeft: 'auto', fontSize: 12, color: '#999' }}>({categoryCount('all')})</span>
                        </label>
                        {config.categories.map(c => (
                            <label key={c.id} className="filter-option">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={filterCat === c.id}
                                    onChange={() => setFilterCat(c.id)}
                                />
                                <span>{c.label[language]}</span>
                                <span style={{ marginLeft: 'auto', fontSize: 12, color: '#999' }}>({categoryCount(c.id)})</span>
                            </label>
                        ))}
                    </div>

                    {/* Price Range */}
                    <div className="filter-section">
                        <h4>Price Range</h4>
                        <div className="price-range-label">
                            <span style={{ color: '#666', fontSize: 13 }}>Max Price</span>
                            <span>{priceRange} {config.currency}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            value={priceRange}
                            onChange={e => setPriceRange(Number(e.target.value))}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: '#999' }}>
                            <span>0 {config.currency}</span>
                            <span>{maxPrice} {config.currency}</span>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {(filterCat !== 'all' || priceRange < maxPrice || searchQuery) && (
                        <button
                            onClick={() => { setFilterCat('all'); setPriceRange(maxPrice); setSearchQuery('') }}
                            className="btn btn-ghost"
                            style={{ width: '100%', marginTop: 16, color: '#666', fontSize: 14 }}
                        >
                            <X size={16} /> Clear All Filters
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1 }}>
                <div className="shop-header">
                    <div>
                        <h1 className="shop-title">{t.shop}</h1>
                        <p className="shop-count">
                            {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
                            {filterCat !== 'all' && ` in "${config.categories.find(c => c.id === filterCat)?.label[language]}"`}
                        </p>
                    </div>
                    <select
                        className="sort-select"
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                    >
                        <option value="newest">Newest Arrivals</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="name">Name: A to Z</option>
                    </select>
                </div>

                {filtered.length === 0 ? (
                    <div className="no-products">
                        <Package size={48} style={{ color: '#ddd', margin: '0 auto 20px' }} />
                        <h3>No products found</h3>
                        <p>Try adjusting your filters or search query.</p>
                        <button
                            onClick={() => { setFilterCat('all'); setPriceRange(maxPrice); setSearchQuery('') }}
                            className="btn btn-primary"
                        >
                            View All Products
                        </button>
                    </div>
                ) : (
                    <div className="grid-products animate-fade">
                        {filtered.map(p => (
                            <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAdd={onAdd} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}


function Home({ products, config, onQuickView, onAdd, t }) {
    const { language } = useApp()

    const features = [
        { icon: <Truck size={24} />, title: 'Free Shipping', text: 'On orders over $150' },
        { icon: <Shield size={24} />, title: 'Secure Checkout', text: '100% protected payments' },
        { icon: <Package size={24} />, title: 'Quality Guarantee', text: 'Handcrafted with care' },
        { icon: <Headphones size={24} />, title: '24/7 Support', text: 'Here to help anytime' }
    ]

    return (
        <>
            {/* Hero Section */}
            <section className="hero" style={{
                background: config.hero?.image
                    ? `linear-gradient(135deg, rgba(26, 26, 46, 0.85) 0%, rgba(22, 33, 62, 0.9) 100%), url('${config.hero.image}') center/cover no-repeat`
                    : 'linear-gradient(135deg, rgba(26, 26, 46, 0.85) 0%, rgba(22, 33, 62, 0.9) 100%), url("https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1920") center/cover no-repeat'
            }}>
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
                    {(config.hero?.badge || 'New Collection 2024') && (
                        <span style={{
                            display: 'inline-block',
                            background: 'rgba(233, 69, 96, 0.2)',
                            color: '#e94560',
                            padding: '8px 20px',
                            borderRadius: 30,
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: 24,
                            backdropFilter: 'blur(10px)'
                        }}>
                            {config.hero?.badge || '✨ New Collection 2024'}
                        </span>
                    )}
                    <h1 className="animate-slide">{config.hero?.title?.[language] || 'Welcome'}</h1>
                    <p>{config.hero?.subtitle?.[language] || 'Discover amazing products'}</p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/shop" className="btn btn-accent" style={{ textDecoration: 'none' }}>
                            <ShoppingBag size={20} /> Explore Collection
                        </Link>
                        <a href="#featured" className="btn btn-ghost" style={{ color: 'white', border: '2px solid rgba(255,255,255,0.3)' }}>
                            View Bestsellers
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '60px 0', background: 'white', marginTop: -40, position: 'relative', zIndex: 10 }}>
                <div className="container">
                    <div className="features-grid">
                        {features.map((f, i) => (
                            <div key={i} className="feature-card">
                                <div className="feature-icon">{f.icon}</div>
                                <h4 className="feature-title">{f.title}</h4>
                                <p className="feature-text">{f.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="section" id="categories">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">{t.categories}</h2>
                        <p className="section-subtitle">Explore our carefully curated collections of authentic Moroccan craftsmanship</p>
                    </div>
                    <div className="grid-4">
                        {config.categories.map(cat => (
                            <Link to={`/shop?category=${cat.id}`} key={cat.id} className="cat-card" style={{ textDecoration: 'none' }}>
                                <img src={cat.image} alt={cat.label[language]} />
                                <div className="cat-overlay">
                                    <span className="cat-title">{cat.label[language]}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Promo Banner */}
            <section style={{ padding: '0 24px' }}>
                <div className="container">
                    <div className="promo-banner">
                        <h2>Exclusive Artisan Collection</h2>
                        <p>Handpicked pieces crafted by Moroccan artisans with generations of expertise</p>
                        <Link to="/shop" className="btn btn-accent" style={{ textDecoration: 'none' }}>
                            Shop Now <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Visual Showcase */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                        <div className="group" style={{ position: 'relative', height: 450, borderRadius: 16, overflow: 'hidden' }}>
                            <img
                                src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800"
                                alt="Artisan Crafts"
                                className="group-hover:scale-105"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div className="cat-overlay" style={{ padding: 32 }}>
                                <div>
                                    <h3 style={{ color: 'white', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Artisan Crafts</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Handwoven traditions passed through generations</p>
                                    <Link to="/shop" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                                        Discover More
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="group" style={{ position: 'relative', height: 450, borderRadius: 16, overflow: 'hidden' }}>
                            <img
                                src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800"
                                alt="Modern Elegance"
                                className="group-hover:scale-105"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div className="cat-overlay" style={{ padding: 32 }}>
                                <div>
                                    <h3 style={{ color: 'white', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Modern Elegance</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Contemporary designs with traditional roots</p>
                                    <Link to="/shop" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                                        Discover More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section" id="featured" style={{ background: '#fafafa' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">{t.featured}</h2>
                        <p className="section-subtitle">Our most loved pieces, handpicked for their exceptional quality and design</p>
                    </div>
                    <div className="grid-products">
                        {products.slice(0, 8).map(p => (
                            <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAdd={onAdd} />
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 48 }}>
                        <Link to="/shop" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                            View All Products <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="section" style={{ background: 'white' }}>
                <div className="container" style={{ maxWidth: 600, textAlign: 'center' }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Stay Updated</h2>
                    <p style={{ color: '#666', marginBottom: 32 }}>Subscribe to receive exclusive offers, new arrivals, and styling tips</p>
                    <form style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }} onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing!') }}>
                        <input
                            type="email"
                            className="input"
                            placeholder="Enter your email"
                            style={{ flex: 1, minWidth: 250, marginBottom: 0 }}
                            required
                        />
                        <button type="submit" className="btn btn-primary">Subscribe</button>
                    </form>
                </div>
            </section>
        </>
    )
}


function DynamicPage() {
    const loc = useLocation()
    const { config, language } = useApp()
    const pageId = loc.pathname.split('/')[2]
    const page = config.pages.find(p => p.id === pageId)

    if (!page) return <div style={{ padding: 60, textAlign: 'center' }}>Page Not Found</div>

    return (
        <div className="container" style={{ maxWidth: 800, margin: '60px auto', minHeight: '60vh' }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>{page.title[language]}</h1>
            <div style={{ lineHeight: 1.8, color: '#4b5563', whiteSpace: 'pre-line' }}>
                {page.content[language]}
            </div>
        </div>
    )
}


function App() {
    const [language, setLanguage] = useState('en')
    const [config, setConfig] = useStickyState(DEFAULT_CONFIG, 'config_v8')
    const [products, setProducts] = useStickyState(DEFAULT_PRODUCTS, 'products_v4')
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

    const PageLayout = ({ children }) => (
        <>
            <div className="announcement-bar">{config.announcement}</div>
            <nav className="header">
                <div className="container flex-between" style={{ height: 72 }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}>
                        {config.logoUrl ? (
                            <img src={config.logoUrl} alt={config.storeName} style={{ height: 44 }} />
                        ) : (
                            <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: -0.5 }}>{config.storeName}</div>
                        )}
                    </Link>

                    <div className="desktop-nav" style={{ gap: 32 }}>
                        <Link to="/" className="nav-link">{t.home}</Link>
                        <Link to="/shop" className="nav-link">{t.shop}</Link>
                        <a href="/#categories" className="nav-link">{t.categories}</a>
                        {config.pages?.filter(p => p.header).map(p => (
                            <Link key={p.id} to={`/page/${p.id}`} className="nav-link">{p.title[language]}</Link>
                        ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                            className="btn btn-ghost"
                            style={{ padding: '8px 12px', fontSize: 13, fontWeight: 600 }}
                        >
                            <Globe size={16} /> {language.toUpperCase()}
                        </button>
                        <button
                            onClick={() => setCartOpen(true)}
                            className="btn btn-primary"
                            style={{ padding: '10px 20px', borderRadius: 30, gap: 8 }}
                        >
                            <ShoppingCart size={18} />
                            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 12, fontSize: 12 }}>{cart.length}</span>
                        </button>
                    </div>
                </div>
            </nav>

            {children}

            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            {config.logoUrl ? (
                                <img src={config.logoUrl} alt={config.storeName} style={{ height: 50, marginBottom: 16 }} />
                            ) : (
                                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>{config.storeName}</h3>
                            )}
                            <p>Authentic Moroccan craftsmanship delivered to your doorstep. Experience the luxury of tradition with every piece.</p>
                        </div>
                        <div>
                            <h4 className="footer-title">Quick Links</h4>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Link to="/" className="social-item">Home</Link>
                                <Link to="/shop" className="social-item">Shop</Link>
                                {config.pages?.filter(p => p.footer).map(p => (
                                    <Link key={p.id} to={`/page/${p.id}`} className="social-item">{p.title[language]}</Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="footer-title">Connect With Us</h4>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {config.socials?.instagram && <a href={config.socials.instagram} target="_blank" rel="noopener noreferrer" className="social-item"><Instagram size={18} /> Instagram</a>}
                                {config.socials?.facebook && <a href={config.socials.facebook} target="_blank" rel="noopener noreferrer" className="social-item"><Facebook size={18} /> Facebook</a>}
                                {config.socials?.twitter && <a href={config.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-item"><Twitter size={18} /> Twitter</a>}
                                {config.socials?.tiktok && <a href={config.socials.tiktok} target="_blank" rel="noopener noreferrer" className="social-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg> TikTok
                                </a>}
                            </div>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 48, paddingTop: 24, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                        © {new Date().getFullYear()} {config.storeName}. All rights reserved.
                    </div>
                </div>
            </footer>

            <ProductModal product={viewProduct} onClose={() => setViewProduct(null)} onAdd={addToCart} />
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart} updateQty={(id, q) => setCart(prev => q <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty: q } : i))} remove={id => setCart(prev => prev.filter(i => i.id !== id))} config={config} t={t} />
            <a href={`https://wa.me/${config.whatsappNumber}`} target="_blank" style={{ position: 'fixed', bottom: 30, right: 30, background: '#25D366', padding: 16, borderRadius: '50%', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', zIndex: 90 }}>
                <MessageCircle size={32} color="white" fill="white" />
            </a>
        </>
    )

    return (
        <AppContext.Provider value={{ language, setLanguage, config, setConfig, t }}>
            <Router>
                <Routes>
                    <Route path={config.adminUrl} element={<AdminView config={config} setConfig={setConfig} products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} t={t} />} />

                    <Route path="/page/:id" element={<PageLayout><DynamicPage /></PageLayout>} />

                    <Route path="/shop" element={
                        <PageLayout>
                            <ShopPage products={products} config={config} onQuickView={setViewProduct} onAdd={addToCart} t={t} />
                        </PageLayout>
                    } />

                    <Route path="/" element={
                        <PageLayout>
                            <Home products={products} config={config} onQuickView={setViewProduct} onAdd={addToCart} t={t} />
                        </PageLayout>
                    } />
                </Routes>
            </Router>
        </AppContext.Provider>
    )
}

export default App
