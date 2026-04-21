import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/HeroSlider.css';

const slides = [
  {
    badge: '✦ Bộ Sưu Tập 2025',
    title: <>Nội Thất <em>Đặc Biệt</em><br />Dành Riêng Cho Bạn</>,
    subtitle: 'Thiết kế theo yêu cầu – đúng không gian, đúng phong cách, đúng tâm hồn của bạn.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&q=60',
    action1: { link: '/products', text: 'Khám Phá', icon: 'fa-arrow-right' },
    action2: { link: '/order', text: 'Đặt Thiết Kế', icon: 'fa-pencil-ruler' }
  },
  {
    badge: '🪵 Gỗ Tự Nhiên Cao Cấp',
    title: <>Phòng Khách <em>Sang Trọng</em><br />Đẳng Cấp Mới</>,
    subtitle: 'Sofa, bàn trà, kệ trang trí – tất cả được làm từ gỗ tự nhiên chọn lọc.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=120&q=60',
    action1: { link: '/products?cat=sofa', text: 'Xem Sofa', icon: 'fa-couch' },
    action2: { link: '/contact', text: 'Tư Vấn Miễn Phí', icon: 'fa-phone' }
  },
  {
    badge: '🛏️ Phòng Ngủ Mơ Ước',
    title: <>Không Gian Ngủ <em>Thư Giãn</em><br />Hoàn Hảo</>,
    subtitle: 'Giường, tủ đầu giường, tủ quần áo thiết kế đồng bộ.',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=120&q=60',
    action1: { link: '/products?cat=giuong', text: 'Xem Giường', icon: 'fa-bed' },
    action2: { link: '/products', text: 'Tất Cả Sản Phẩm', icon: 'fa-eye' }
  }
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setCurrent(index >= 0 ? index % slides.length : (slides.length - 1));
  };

  return (
    <section className="hero" aria-label="Banner trang chủ">
      <div className="hero-slides">
        {slides.map((slide, i) => (
          <div key={i} className={`hero-slide ${i === current ? 'active' : ''}`}>
            <div className="hero-bg" style={{ backgroundImage: `url('${slide.image}')` }}></div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="hero-text">
                <span className="hero-badge">{slide.badge}</span>
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                <div className="hero-actions">
                  <Link to={slide.action1.link} className="btn btn--primary">
                    <i className={`fa ${slide.action1.icon}`}></i> {slide.action1.text}
                  </Link>
                  <Link to={slide.action2.link} className="btn btn--ghost">
                    <i className={`fa ${slide.action2.icon}`}></i> {slide.action2.text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="hero-arrow hero-arrow--prev" onClick={() => goTo(current - 1)}>
        <i className="fa fa-chevron-left"></i>
      </button>
      <button className="hero-arrow hero-arrow--next" onClick={() => goTo(current + 1)}>
        <i className="fa fa-chevron-right"></i>
      </button>

      <div className="hero-dots">
        {slides.map((_, i) => (
          <span key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)}></span>
        ))}
      </div>

      <div className="hero-thumbs">
        {slides.map((slide, i) => (
          <div key={i} className={`hero-thumb ${i === current ? 'active' : ''}`} onClick={() => goTo(i)}>
            <img src={slide.thumb} alt={`Thumb ${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
