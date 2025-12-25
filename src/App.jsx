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
        { id: 'shoes', label: { en: 'Shoes', ar: 'أحذية' }, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500' }
    ],
    hero: {
        title: { en: "Moroccan Elegance", ar: "أناقة مغربية" },
        subtitle: { en: "Discover the timeless beauty of handcrafted tradition.", ar: "اكتشف الجمال الخالد للتقاليد اليدوية." },
        image: ''
    },
    pages: [
        { id: 'about', title: { en: 'About Us', ar: 'من نحن' }, content: { en: 'Welcome to MarocBoutique. We provide the finest Moroccan handcrafted goods.', ar: 'مرحبًا بكم في MarocBoutique. نحن نقدم أرقى السلع المغربية المصنوعة يدويًا.' } },
        { id: 'contact', title: { en: 'Contact Us', ar: 'اتصل بنا' }, content: { en: 'Email us at support@maroc.com or WhatsApp us.', ar: 'راسلنا على support@maroc.com أو تواصل عبر واتساب.' } },
        { id: 'shipping', title: { en: 'Shipping Policy', ar: 'سياسة الشحن' }, content: { en: 'We ship worldwide within 5-10 business days.', ar: 'نشحن لجميع أنحاء العالم في غضون 5-10 أيام عمل.' } },
        { id: 'privacy', title: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' }, content: { en: 'Your data is safe with us.', ar: 'بياناتك في أمان معنا.' } }
    ]
}

const DEFAULT_PRODUCTS = [
    { id: 1, name: { ar: "قفطان ملكي فاخر", en: "Royal Luxury Kaftan" }, category: "kaftans", price: 299, originalPrice: 399, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800", badge: "hot", description: "Handcrafted with premium silk and gold embroidery." },
    { id: 2, name: { ar: "بلغة فاس الجلدية", en: "Fes Leather Babouche" }, category: "shoes", price: 89, originalPrice: null, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800", badge: "new", description: "Authentic leather slippers made in Fes." },
    { id: 3, name: { ar: "جلابة شتوية", en: "Winter Djellaba" }, category: "djellabas", price: 199, originalPrice: 249, image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800", badge: "sale", description: "Warm wool djellaba perfect for cold weather." },
    { id: 4, name: { ar: "قفطان عصري", en: "Modern Chic Kaftan" }, category: "kaftans", price: 159, originalPrice: 180, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800", badge: "new", description: "Contemporary design meets traditional elegance." },
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

    const handleSave = () => {
        setConfig({ ...config, pages: config.pages.map(p => p.id === editing.id ? editing : p) })
        setEditing(null)
    }

    if (editing) {
        return (
            <div className="card" style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
                <h3 style={{ marginBottom: 20 }}>Edit Page: {editing.id}</h3>
                <div className="grid-2">
                    <div><label>Title (En)</label><input className="input" value={editing.title.en} onChange={e => setEditing({ ...editing, title: { ...editing.title, en: e.target.value } })} /></div>
                    <div><label>Title (Ar)</label><input className="input" value={editing.title.ar} onChange={e => setEditing({ ...editing, title: { ...editing.title, ar: e.target.value } })} style={{ textAlign: 'right' }} /></div>
                </div>

                <div style={{ marginTop: 16 }}>
                    <label>Content (English)</label>
                    <textarea className="input" rows={6} value={editing.content.en} onChange={e => setEditing({ ...editing, content: { ...editing.content, en: e.target.value } })} />
                </div>

                <div style={{ marginTop: 16 }}>
                    <label>Content (Arabic)</label>
                    <textarea className="input" rows={6} value={editing.content.ar} onChange={e => setEditing({ ...editing, content: { ...editing.content, ar: e.target.value } })} style={{ textAlign: 'right' }} />
                </div>

                <div className="flex-between">
                    <button onClick={() => setEditing(null)} className="btn btn-outline">Cancel</button>
                    <button onClick={handleSave} className="btn btn-primary">Save Changes</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Pages</h2>
            <div className="grid-2">
                {config.pages.map(p => (
                    <div key={p.id} className="card" style={{ padding: 24, cursor: 'pointer' }} onClick={() => setEditing(p)}>
                        <div className="flex-between">
                            <span style={{ fontWeight: 600 }}>{p.title.en}</span>
                            <Edit size={16} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


function AdminSettings({ config, setConfig }) {
    const [local, setLocal] = useState({ ...config })

    const handleSave = () => {
        setConfig(local)
        alert('Settings Saved Successfully')
    }

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 24, marginBottom: 24, fontWeight: 700 }}>Store Settings</h2>

            <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                <h3 style={{ marginBottom: 16 }}>Brand Identity</h3>
                <div className="grid-2">
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Store Name</label>
                        <input className="input" value={local.storeName} onChange={e => setLocal({ ...local, storeName: e.target.value })} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Logo URL (Optional)</label>
                        <input className="input" value={local.logoUrl} onChange={e => setLocal({ ...local, logoUrl: e.target.value })} placeholder="https://..." />
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                <h3 style={{ marginBottom: 16 }}>Homepage Content (Hero)</h3>
                <div className="grid-2">
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Headline (English)</label>
                        <input className="input" value={local.hero.title.en} onChange={e => setLocal({ ...local, hero: { ...local.hero, title: { ...local.hero.title, en: e.target.value } } })} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Headline (Arabic)</label>
                        <input className="input" value={local.hero.title.ar} onChange={e => setLocal({ ...local, hero: { ...local.hero, title: { ...local.hero.title, ar: e.target.value } } })} style={{ textAlign: 'right' }} />
                    </div>
                </div>
                <div className="grid-2" style={{ marginTop: 12 }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Subtitle (English)</label>
                        <input className="input" value={local.hero.subtitle.en} onChange={e => setLocal({ ...local, hero: { ...local.hero, subtitle: { ...local.hero.subtitle, en: e.target.value } } })} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Subtitle (Arabic)</label>
                        <input className="input" value={local.hero.subtitle.ar} onChange={e => setLocal({ ...local, hero: { ...local.hero, subtitle: { ...local.hero.subtitle, ar: e.target.value } } })} style={{ textAlign: 'right' }} />
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                <h3 style={{ marginBottom: 16 }}>Configuration</h3>
                <div className="grid-2">
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Currency</label>
                        <select className="input" value={local.currency} onChange={e => setLocal({ ...local, currency: e.target.value })}>
                            <option value="USD">USD ($)</option>
                            <option value="MAD">MAD (DH)</option>
                            <option value="EUR">EUR (€)</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>WhatsApp Number</label>
                        <input className="input" value={local.whatsappNumber} onChange={e => setLocal({ ...local, whatsappNumber: e.target.value })} />
                    </div>
                </div>
                <div style={{ marginTop: 16 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Admin URL</label>
                    <input className="input" value={local.adminUrl} onChange={e => setLocal({ ...local, adminUrl: e.target.value })} />
                </div>
                <div style={{ marginTop: 16 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>Admin Password</label>
                    <input className="input" type="text" value={local.adminPassword} onChange={e => setLocal({ ...local, adminPassword: e.target.value })} />
                </div>
            </div>

            <div style={{ marginTop: 32, textAlign: 'right' }}>
                <button className="btn btn-primary" onClick={handleSave} style={{ padding: '12px 32px', fontSize: 16 }}>Save All Changes</button>
            </div>
        </div>
    )
}

function AdminView({ config, setConfig, products, setProducts, orders, setOrders, t }) {
    const [tab, setTab] = useState('dashboard')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [newPromo, setNewPromo] = useState({ code: '', discount: '' })

    // const updateOrderStatus = (id, status) => setOrders(orders.map(o => o.id === id ? { ...o, status } : o)) // Moved to AdminOrders

    const addPromo = () => {
        if (!newPromo.code || !newPromo.discount) return alert('Please enter code and discount')
        setConfig({ ...config, promoCodes: [...config.promoCodes, { ...newPromo, active: true }] })
        setNewPromo({ code: '', discount: '' })
        alert('Promo Code Added')
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
            {mobileMenuOpen && <div className="overlay-mobile" onClick={() => setMobileMenuOpen(false)} />}

            <div className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                    <div style={{ fontSize: 20, fontWeight: 700 }}>Store Manager</div>
                    <button className="md:hidden" onClick={() => setMobileMenuOpen(false)}><X size={20} /></button>
                </div>

                {['dashboard', 'orders', 'products', 'categories', 'pages', 'marketing', 'settings'].map(item => (
                    <button key={item} onClick={() => { setTab(item); setMobileMenuOpen(false) }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', width: '100%', textAlign: 'left', borderRadius: 8, marginBottom: 4, background: tab === item ? '#000' : 'transparent', color: tab === item ? '#fff' : '#666' }}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                ))}

                <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid #eee' }}>
                    <Link to="/" className="btn btn-outline" style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', color: 'red' }}>
                        <LogOut size={18} /> Logout
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

function PageView({ config }) {
    const { id } = useParams()
    const { language } = useUser() // Will fix context usage below
    // Context fix:
    const app = useApp()
    const page = config.pages.find(p => p.id === window.location.pathname.split('/').pop()) // Simple workaround for now

    // Better way with proper route check in App
    return null
}

function Home({ products, config, onQuickView, onAdd, t }) {
    const language = useApp().language
    return (
        <>
            <div className="hero">
                <div>
                    <h1 className="animate-slide">{config.hero.title[language]}</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: 32, opacity: 0.9 }}>{config.hero.subtitle[language]}</p>
                    <a href="#shop" className="btn btn-primary" style={{ padding: '12px 32px', fontSize: 18 }}>{t.shopNow}</a>
                </div>
            </div>

            <div id="categories" className="container" style={{ margin: '60px auto' }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>{t.categories}</h2>
                <div className="grid-3">
                    {config.categories.map(cat => (
                        <div key={cat.id} className="cat-card">
                            <img src={cat.image} alt={cat.label.en} />
                            <div className="cat-overlay">
                                <span className="cat-title">{cat.label[language]}</span>
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
    const [config, setConfig] = useStickyState(DEFAULT_CONFIG, 'config_v6')
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

    const PageLayout = ({ children }) => (
        <>
            <div style={{ background: '#000', color: '#fff', textAlign: 'center', padding: 8, fontSize: 13, fontWeight: 500 }}>{config.announcement}</div>
            <nav className="header">
                <div className="container flex-between" style={{ height: 70 }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}>
                        {config.logoUrl ? <img src={config.logoUrl} alt={config.storeName} style={{ height: 40 }} /> : <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>{config.storeName}</div>}
                    </Link>

                    <div className="md:hidden flex" style={{ gap: 20, fontWeight: 500 }}>
                        <a href="/#categories" style={{ color: 'inherit', textDecoration: 'none' }}>{t.categories}</a>
                        <a href="/#shop" style={{ color: 'inherit', textDecoration: 'none' }}>{t.products}</a>
                        <Link to="/page/contact" style={{ color: 'inherit', textDecoration: 'none' }}>{t.contact}</Link>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="btn-outline" style={{ padding: '6px 12px' }}>{language.toUpperCase()}</button>
                        <button onClick={() => setCartOpen(true)} className="btn-primary" style={{ padding: '8px 16px', borderRadius: 20 }}>
                            <ShoppingCart size={18} style={{ marginRight: 8 }} /> {cart.length}
                        </button>
                    </div>
                </div>
            </nav>

            {children}

            <footer style={{ background: '#111827', color: 'white', padding: '60px 0', marginTop: 60 }}>
                <div className="container grid-3" style={{ gap: 60 }}>
                    <div>
                        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>{config.storeName}</h3>
                        <p style={{ color: '#9CA3AF', lineHeight: 1.6 }}>Authentic Moroccan craftsmanship delivered to your doorstep. Experience the luxury of tradition.</p>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 600, marginBottom: 20 }}>Customer Service</h4>
                        <p style={{ marginBottom: 8 }}><Link to="/page/contact" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Contact Us</Link></p>
                        <p style={{ marginBottom: 8 }}><Link to="/page/shipping" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Shipping Policy</Link></p>
                        <p style={{ marginBottom: 8 }}><Link to="/page/about" style={{ color: '#9CA3AF', textDecoration: 'none' }}>About Us</Link></p>
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
    )

    return (
        <AppContext.Provider value={{ language, setLanguage, config, setConfig, t }}>
            <Router>
                <Routes>
                    <Route path={config.adminUrl} element={<AdminView config={config} setConfig={setConfig} products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} t={t} />} />

                    <Route path="/page/:id" element={<PageLayout><DynamicPage /></PageLayout>} />

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
