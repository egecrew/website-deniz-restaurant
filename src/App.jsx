import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="app">
      {/* Header/Navigation */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="logo">
            <span className="logo-icon">🦞</span>
            Deniz Restaurant
          </a>
          
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü">
            {menuOpen ? '✕' : '☰'}
          </button>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <a href="#about" onClick={() => scrollToSection('about')}>Hakkımızda</a>
            <a href="#services" onClick={() => scrollToSection('services')}>Lezzetlerimiz</a>
            <a href="#gallery" onClick={() => scrollToSection('gallery')}>Galeri</a>
            <a href="#contact" onClick={() => scrollToSection('contact')} className="nav-cta">Rezervasyon</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              🌊 Bodrum'un Kalbinde, Denizin Tadında
            </div>
            
            <h1 className="hero-title">
              Deniz <span>Restaurant</span>
            </h1>
            
            <p className="hero-subtitle">
              Akdeniz'in eşsiz lezzetlerini, muhteşem Bodrum manzarasıyla buluşturuyoruz. 
              1043'ten fazla mutlu müşterimizle gurur duyuyoruz.
            </p>
            
            <div className="hero-stats">
              <div className="stat-box">
                <div className="stat-number">⭐ 4.8</div>
                <p>Google Puanı</p>
              </div>
              <div className="stat-box">
                <div className="stat-number">1043+</div>
                <p>Mutlu Müşteri</p>
              </div>
              <div className="stat-box">
                <div className="stat-number">10+</div>
                <p>Yıllık Deneyim</p>
              </div>
            </div>
            
            <button className="cta-button" onClick={() => scrollToSection('contact')}>
              Rezervasyon Yap
              <span>→</span>
            </button>
          </div>
        </div>
        
        <div className="hero-scroll">
          <span></span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Hikayemiz</span>
            <h2>Bodrum'un Vazgeçilmez Lezzet Durağı</h2>
            <div className="divider"></div>
          </div>
          
          <div className="about-content">
            <div className="about-text">
              <p>
                <strong>Deniz Restaurant</strong> olarak yıllardır Bodrum'da misafirlerimize unutulmaz lezzetler 
                sunuyoruz. Taze deniz ürünleri, yerel malzemeler ve aşçılarımızın ustalığıyla 
                hazırlanan menümüz, her ziyaretinizi özel kılıyor.
              </p>
              <p>
                <strong>4.8 yıldız</strong> Google puanımız ve <strong>1043+ olumlu yorumumuz</strong> ile 
                bölgenin en güvenilir ve sevilen restoranlarından biriyiz. Siz de bu deneyimin 
                parçası olmaya davetlisiniz.
              </p>
              
              <ul className="about-list">
                <li>Taze Deniz Ürünleri</li>
                <li>Yerel Lezzetler</li>
                <li>Şık Atmosfer</li>
                <li>Güler Yüzlü Hizmet</li>
                <li>Uygun Fiyatlar</li>
                <li>Merkezi Konum</li>
              </ul>
              
              <div className="demo-section">
                <div className="demo-box">
                  <strong>📍 Adresimiz</strong>
                  <p>Çarşı, Belediye Meydanı No 4, 48400 Bodrum/Muğla</p>
                  <strong>📞 Hemen Arayın</strong>
                  <a href="tel:+902523637674" className="demo-link">
                    +90 252 363 76 74 →
                  </a>
                </div>
              </div>
            </div>
            
            <div className="about-visual">
              <div className="about-box">
                <div className="about-number">⭐ 4.8</div>
                <p>Google Değerlendirmesi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Menümüz</span>
            <h2>Özel Lezzetlerimiz</h2>
            <div className="divider"></div>
            <p className="subtitle">Her damak zevkine uygun, özenle hazırlanmış menümüzü keşfedin</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <span className="service-icon">🦐</span>
              <h3>Deniz Ürünleri</h3>
              <p>Her gün taze yakalanan balıklar ve deniz mahsulleri ile hazırlanan enfes yemekler.</p>
            </div>
            
            <div className="service-card">
              <span className="service-icon">🥗</span>
              <h3>Meze & Salatalar</h3>
              <p>Akdeniz mutfağının en sevilen mezelerini ve taze salatalarını deneyimleyin.</p>
            </div>
            
            <div className="service-card">
              <span className="service-icon">🍷</span>
              <h3>İçecekler</h3>
              <p>Yerel şaraplardan soğuk meşrubatlara, zengin içecek seçeneklerimiz.</p>
            </div>
            
            <div className="service-card">
              <span className="service-icon">🍰</span>
              <h3>Tatlılar</h3>
              <p>Yemeklerinizi taçlandıracak ev yapımı tatlılarımızı deneyin.</p>
            </div>
            
            <div className="service-card">
              <span className="service-icon">🎂</span>
              <h3>Özel Günler</h3>
              <p>Doğum günü, evlilik yıldönümü ve kutlamalarınız için özel organizasyonlar.</p>
            </div>
            
            <div className="service-card">
              <span className="service-icon">🌅</span>
              <h3>Deniz Manzarası</h3>
              <p>Bodrum'un eşsiz manzarasını seyrederek yemek keyfi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Mekanımız</span>
            <h2>Atmosferimizi Keşfedin</h2>
            <div className="divider"></div>
          </div>
          
          <div className="gallery-grid">
            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500" 
                alt="Restaurant iç mekan" 
                loading="lazy"
              />
              <p>Şık İç Mekan</p>
            </div>
            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500" 
                alt="Lezzetli yemekler" 
                loading="lazy"
              />
              <p>Özel Lezzetler</p>
            </div>
            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1535850452425-140ee4a8dbae?w=500" 
                alt="Deniz manzarası" 
                loading="lazy"
              />
              <p>Deniz Manzarası</p>
            </div>
            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500" 
                alt="Gurme sunum" 
                loading="lazy"
              />
              <p>Gurme Sunum</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Rezervasyon</span>
            <h2>Bize Ulaşın</h2>
            <div className="divider"></div>
            <p className="subtitle">Rezervasyon için arayın veya formu doldurun, size hemen dönelim</p>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <h3>Adres</h3>
                  <p>Çarşı, Belediye Meydanı No 4<br/>48400 Bodrum/Muğla, Türkiye</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <h3>Telefon</h3>
                  <p><a href="tel:+902523637674">+90 252 363 76 74</a></p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">⏰</div>
                <div>
                  <h3>Çalışma Saatleri</h3>
                  <p>Her Gün: 08:00 - 00:00</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">⭐</div>
                <div>
                  <h3>Google Reviews</h3>
                  <p>4.8/5.0 · 1043 yorum</p>
                </div>
              </div>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              {submitted && (
                <div className="success-message">
                  ✅ Mesajınız alındı! En kısa sürede sizinle iletişime geçeceğiz.
                </div>
              )}
              
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Adınız Soyadınız"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="E-posta Adresiniz"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon Numaranız"
                  value={formData.phone}
                  onChange={handleChange}
                />
                
                <input
                  type="text"
                  name="subject"
                  placeholder="Konu (Rezervasyon, Bilgi, vb.)"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <textarea
                name="message"
                placeholder="Mesajınız... (Rezervasyon için tarih ve kişi sayısını belirtiniz)"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
              
              <button type="submit" className="submit-button">
                Mesaj Gönder
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>🦞 Deniz Restaurant</h3>
              <p>
                Bodrum'un kalbinde, denizin tadında... Akdeniz mutfağının en seçkin lezzetlerini 
                sizlerle buluşturuyoruz.
              </p>
              <p className="footer-category">📁 Yemek & İçecek</p>
            </div>
            
            <div className="footer-section">
              <h3>İletişim</h3>
              <p>
                📞 +90 252 363 76 74<br/>
                📍 Belediye Meydanı, Bodrum
              </p>
            </div>
            
            <div className="footer-section">
              <h3>Çalışma Saatleri</h3>
              <p>
                Her Gün Açık<br/>
                08:00 - 00:00
              </p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2026 Deniz Restaurant. Tüm hakları saklıdır. | Bodrum, Türkiye 🇹🇷</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
