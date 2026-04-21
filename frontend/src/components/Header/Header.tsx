import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Header.css';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('vi');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-left">
            <a href="tel:0901234567" className="topbar-info">
              <i className="fa fa-phone"></i>
              <span>0901 234 567</span>
            </a>
            <a href="mailto:info@htttshop.vn" className="topbar-info">
              <i className="fa fa-envelope"></i>
              <span>info@htttshop.vn</span>
            </a>
          </div>
          <div className="topbar-center">
            🎁 Miễn phí vận chuyển cho đơn hàng từ 5 triệu đồng &nbsp;|&nbsp; Bảo hành 5 năm cho toàn bộ sản phẩm
          </div>
          <div className="topbar-right">
            <span className="topbar-location">
              <i className="fa fa-location-dot"></i>
              <span>TP. Hồ Chí Minh</span>
            </span>
            <div className="topbar-lang">
              <span className={`lang-btn ${lang === 'vi' ? 'active' : ''}`} onClick={() => setLang('vi')}>VI</span>
              <span className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</span>
            </div>
          </div>
        </div>
      </div>

      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <nav className="header-nav-left" aria-label="Menu trái">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link active">Trang chủ</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">Giới thiệu</Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Sản phẩm <i className="fa fa-chevron-down chevron"></i>
                </Link>
                <div className="dropdown">
                  <div className="dropdown-header">Danh mục nội thất</div>
                  <div className="dropdown-grid">
                    <Link to="/products?cat=sofa" className="dropdown-item"><i className="fa fa-couch"></i> Sofa & Ghế</Link>
                    <Link to="/products?cat=ban-ghe" className="dropdown-item"><i className="fa fa-chair"></i> Bàn Ghế</Link>
                    <Link to="/products?cat=tu-ke" className="dropdown-item"><i className="fa fa-box-open"></i> Tủ & Kệ</Link>
                    <Link to="/products?cat=giuong" className="dropdown-item"><i className="fa fa-bed"></i> Giường Ngủ</Link>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          <Link to="/" className="header-logo" aria-label="HTTTSHOP Trang Chủ">
            <div className="logo-icon">
              <i className="fa fa-house-chimney"></i>
            </div>
            <div className="logo-texts">
              <span className="logo-name">HTTTSHOP</span>
              <span className="logo-sub">Nội Thất Theo Yêu Cầu</span>
            </div>
          </Link>

          <div className="header-nav-right">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/order" className="nav-link">Đặt Hàng</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Liên Hệ</Link>
              </li>
            </ul>
            
            <div style={{ position: 'relative' }}>
              <button className="header-action-btn" onClick={() => setSearchOpen(!searchOpen)}>
                <i className="fa fa-magnifying-glass"></i>
              </button>
              <div className={`search-dropdown ${searchOpen ? 'open' : ''}`}>
                <div className="search-input-wrap">
                  <i className="fa fa-magnifying-glass"></i>
                  <input type="text" placeholder="Tìm sofa, bàn ghế, tủ kệ..." />
                </div>
              </div>
            </div>

            <Link to="/cart" className="header-action-btn">
              <i className="fa fa-bag-shopping"></i>
              <span className="cart-badge">3</span>
            </Link>
          </div>

          <button className={`hamburger-btn ${mobileNavOpen ? 'open' : ''}`} onClick={() => setMobileNavOpen(true)}>
            <div className="hamburger-lines">
              <span></span><span></span><span></span>
            </div>
          </button>
        </div>
      </header>

      <div className={`overlay ${mobileNavOpen ? 'active' : ''}`} onClick={() => setMobileNavOpen(false)}></div>
      <nav className={`mobile-nav ${mobileNavOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700 }}>HTTTSHOP</span>
          <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)}>
            <i className="fa fa-xmark"></i>
          </button>
        </div>
        <div className="mobile-nav-body">
          <Link to="/" className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>Trang Chủ</Link>
          <div className="mobile-nav-link" onClick={() => setMobileSubOpen(!mobileSubOpen)}>
            Sản Phẩm <i className="fa fa-chevron-down" style={{ transform: mobileSubOpen ? 'rotate(180deg)' : 'none' }}></i>
          </div>
          <div className={`mobile-nav-sub ${mobileSubOpen ? 'open' : ''}`}>
            <Link to="/products?cat=sofa" className="mobile-nav-sub-link"><i className="fa fa-couch"></i> Sofa & Ghế</Link>
            <Link to="/products?cat=ban-ghe" className="mobile-nav-sub-link"><i className="fa fa-chair"></i> Bàn Ghế</Link>
          </div>
          <Link to="/contact" className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>Liên Hệ</Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
