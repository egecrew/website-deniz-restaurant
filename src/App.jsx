import { useState } from 'react'
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
      <header className="header">
        <div className="container">
          <div className="logo">🏢 Deniz Restaurant</div>
          
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <a href="#about" onClick={() => scrollToSection('about')}>Hakkında</a>
            <a href="#services" onClick={() => scrollToSection('services')}>Hizmetler</a>
            <a href="#gallery" onClick={() => scrollToSection('gallery')}>Galeri</a>
            <a href="#contact" onClick={() => scrollToSection('contact')}>İletişim</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Hoşgeldiniz</h1>
            <p>Profesyonel hizmetlerimiz ile işletmenizi bir üst seviyeye çıkarın</p>
            <div className="hero-buttons">
              <button 
                className="cta-button primary" 
                onClick={() => scrollToSection('contact')}
              >
                İletişim Kurun
              </button>
              <button 
                className="cta-button secondary"
                onClick={() => scrollToSection('services')}
              >
                Hizmetler →
              </button>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Müşteri</div>
            </div>
            <div className="stat">
              <div className="stat-number">15+</div>
              <div className="stat-label">Yıl Tecrübe</div>
            </div>
            <div className="stat">
              <div className="stat-number">99%</div>
              <div className="stat-label">Memnuniyet</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2>Hakkımızda</h2>
            <div className="divider"></div>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                Yıllardır endüstride lider konumdayız. Müşteri memnuniyeti ve kalite 
                bizim en önemli değerlerimizdir. Profesyonel ekibimiz her zaman 
                en iyi hizmeti sunmak için hazırdır.
              </p>
              <ul className="about-list">
                <li>✓ Deneyimli profesyonel ekip</li>
                <li>✓ Son teknoloji ve ekipman</li>
                <li>✓ Müşteri odaklı yaklaşım</li>
                <li>✓ Gücendirilmiş süreler</li>
              </ul>
            <div className="demo-section">
                <div className="demo-box">
                  <strong>🌐 Demo Web Sitesi:</strong>
                  <a 
                    href="https://deniz-restaurant.egecrew.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="demo-link"
                  >
                    deniz-restaurant.egecrew.com
                  </a>
                </div>
              </div>
              </div>
            <div className="about-visual">
              <div className="about-box">
                <div className="about-number">15+</div>
                <p>Yıl Deneyim</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2>Hizmetlerimiz</h2>
            <div className="divider"></div>
            <p className="subtitle">En iyi kalitede hizmetler sunuyoruz</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Hızlı Hizmet</h3>
              <p>Zamanında ve verimli hizmet alımı. İşletmenizin ihtiyaçlarına hızlı yanıt.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎯</div>
              <h3>Hedefli Çözümler</h3>
              <p>Sizin ihtiyaçlarınıza özel tasarlanan çözümler. Tam uyum ve verimlilik.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">💎</div>
              <h3>Premium Kalite</h3>
              <p>En yüksek kalite standartlarında hizmet. Her detayda mükemmellik.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">🤝</div>
              <h3>Güvenilir Ortaklık</h3>
              <p>Uzun vadeli, güvenilir iş ortaklığı. Daima yanınızdayız.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>24/7 Destek</h3>
              <p>Gün içi her saatinde destek ve danışmanlık. Sorunlar hemen çözülür.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">🚀</div>
              <h3>İşletme Büyütme</h3>
              <p>Deniz Restaurantin büyümesine katkı sağlayacak stratejiler ve çözümler.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="section-header">
            <h2>Çalışmalarımız</h2>
            <div className="divider"></div>
          </div>
          
          <div className="gallery-grid">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="gallery-item">
                <div className="gallery-placeholder">
                  <span>Proje {num}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>İletişim</h2>
            <div className="divider"></div>
            <p className="subtitle">Bize yazın, en kısa sürede yanıt vereceğiz</p>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <div className="info-item">
                <span className="icon">📞</span>
                <div>
                  <h3>Telefon</h3>
                  <p>+902523637674</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="icon">📧</span>
                <div>
                  <h3>Email</h3>
                  <p>denizrestaurant1@hotmail.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="icon">📍</span>
                <div>
                  <h3>Adres</h3>
                  <p>Çarşı, Belediye Meydanı no 4Bodrum, 48400 Bodrum/Muğla, Türkiye</p>
                </div>
              </div>

              <div className="info-item">
                <span className="icon">🕐</span>
                <div>
                  <h3>Çalışma Saatleri</h3>
                  <p>Pazartesi-Cuma: 09:00-18:00</p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Adınız"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Adresiniz"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefon Numarası"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="subject"
                placeholder="Konu"
                value={formData.subject}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Mesajınız"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
              <button type="submit" className="submit-button">Gönder</button>
              {submitted && (
                <div className="success-message">
                  ✓ Mesajınız başarıyla gönderildi! En kısa sürede döneceğiz.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Hakkımızda</h4>
              <p>Profesyonel hizmetler sunmakta uzmanlaşmış bir kuruluş.</p>
            </div>
            <div className="footer-section">
              <h4>Hızlı Linkler</h4>
              <ul>
                <li><a href="#about">Hakkımızda</a></li>
                <li><a href="#services">Hizmetler</a></li>
                <li><a href="#contact">İletişim</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>İletişim</h4>
              <p>+902523637674<br/>denizrestaurant1@hotmail.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Deniz Restaurant. Tüm hakları saklıdır.</p>
            <p className="footer-credit">Vite + React ile oluşturuldu</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
