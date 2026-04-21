'use strict';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function showToast(message, icon = '', duration = 3000) {
  const toast = $('#toast');
  if (!toast) return;
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(80px)';
  }, duration);
}

let cartItems = JSON.parse(localStorage.getItem('httt_cart') || '[]');

function saveCart() {
  localStorage.setItem('httt_cart', JSON.stringify(cartItems));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = $('#cart-count');
  const total = cartItems.reduce((s, i) => s + i.qty, 0);
  if (badge) badge.textContent = total > 99 ? '99+' : total;
}

function addToCart(productId, productName, qty = 1) {
  const existing = cartItems.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cartItems.push({ id: productId, name: productName, qty });
  }
  saveCart();
  showToast(`Da them "${productName}" vao gio hang`);
}
window.addToCart = addToCart;

let wishlist = JSON.parse(localStorage.getItem('httt_wishlist') || '[]');

function saveWishlist() {
  localStorage.setItem('httt_wishlist', JSON.stringify(wishlist));
}

function toggleWishlist(productId, btn) {
  const idx = wishlist.indexOf(productId);
  if (idx === -1) {
    wishlist.push(productId);
    btn.classList.add('active');
    showToast('Da them vao yeu thich');
  } else {
    wishlist.splice(idx, 1);
    btn.classList.remove('active');
    showToast('Da xoa khoi yeu thich');
  }
  saveWishlist();
}

function initWishlistBtns() {
  $$('.wishlist-btn').forEach(btn => {
    const id = Number(btn.dataset.id);
    if (wishlist.includes(id)) btn.classList.add('active');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleWishlist(id, btn);
    });
  });
}

function initHeaderScroll() {
  const header = $('#main-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileNav() {
  const hamburger = $('#hamburger-btn');
  const mobileNav = $('#mobile-nav');
  const overlay   = $('#overlay');
  const closeBtn  = $('#mobile-nav-close');
  if (!hamburger || !mobileNav) return;

  const openNav  = () => {
    mobileNav.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeNav = () => {
    mobileNav.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (overlay)  overlay.addEventListener('click', closeNav);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
}

window.toggleMobileSub = function(el) {
  const sub = el.nextElementSibling;
  if (sub && sub.classList.contains('mobile-nav-sub')) {
    sub.classList.toggle('open');
    const icon = el.querySelector('.fa-chevron-down');
    if (icon) icon.style.transform = sub.classList.contains('open') ? 'rotate(180deg)' : '';
  }
};

function initSearch() {
  const btn      = $('#search-btn');
  const dropdown = $('#search-dropdown');
  const input    = $('#search-input');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
    if (dropdown.classList.contains('open') && input) {
      setTimeout(() => input.focus(), 50);
    }
  });

  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target) && e.target !== btn) {
      dropdown.classList.remove('open');
    }
  });

  $$('.search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      if (input) input.value = tag.textContent;
    });
  });

  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value.trim()) {
        window.location.href = `pages/products.html?q=${encodeURIComponent(input.value.trim())}`;
      }
    });
  }
}

function initLangSwitch() {
  $$('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('httt_lang', btn.dataset.lang);
    });
  });
  const saved = localStorage.getItem('httt_lang');
  if (saved) {
    $$('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === saved));
  }
}

function initHeroSlider() {
  const slides  = $$('.hero-slide');
  const dots    = $$('.hero-dot');
  const thumbs  = $$('.hero-thumb');
  const prevBtn = $('#hero-prev');
  const nextBtn = $('#hero-next');
  if (!slides.length) return;

  let current = 0;
  let timer   = null;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    thumbs[current]?.classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    thumbs[current]?.classList.add('active');
  }

  function startAuto()  { timer = setInterval(() => goTo(current + 1), 5500); }
  function resetTimer() { clearInterval(timer); startAuto(); }

  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
  dots.forEach((dot, i)  => dot.addEventListener('click', () => { goTo(i); resetTimer(); }));
  thumbs.forEach((th, i) => th.addEventListener('click',  () => { goTo(i); resetTimer(); }));

  startAuto();

  let touchStartX = 0;
  const heroEl = $('.hero');
  heroEl?.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  heroEl?.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { goTo(dx < 0 ? current + 1 : current - 1); resetTimer(); }
  }, { passive: true });
}

function initCollectionSliders() {
  const configs = [
    { sliderId: 'slider-living',  dotsId: 'dots-living',  key: 'living'  },
    { sliderId: 'slider-bedroom', dotsId: 'dots-bedroom', key: 'bedroom' },
    { sliderId: 'review-slider',  dotsId: 'dots-review',  key: 'review'  },
  ];

  configs.forEach(({ sliderId, dotsId, key }) => {
    const slider   = $(`#${sliderId}`);
    const dotsWrap = $(`#${dotsId}`);
    const prevBtn  = $(`[data-slider="${key}"].slider-btn--prev`);
    const nextBtn  = $(`[data-slider="${key}"].slider-btn--next`);
    if (!slider) return;

    const cards = slider.children;
    let current = 0;

    function getVisible() {
      const w = slider.parentElement.offsetWidth;
      if (w < 640)  return 1;
      if (w < 900)  return 2;
      if (w < 1100) return 3;
      return sliderId === 'review-slider' ? 3 : 4;
    }

    function getMaxIdx() {
      return Math.max(0, cards.length - getVisible());
    }

    function slideTo(idx) {
      current = Math.max(0, Math.min(idx, getMaxIdx()));
      const cardW = (cards[0]?.offsetWidth || 0) + 20;
      slider.style.transform = `translateX(-${current * cardW}px)`;
      if (dotsWrap) {
        const dotIdx = Math.floor(current / getVisible());
        [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === dotIdx));
      }
    }

    prevBtn?.addEventListener('click', () => slideTo(current - 1));
    nextBtn?.addEventListener('click', () => slideTo(current + 1));

    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, i) => {
        dot.addEventListener('click', () => slideTo(i * getVisible()));
      });
    }

    let touchStartX = 0;
    slider.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) slideTo(dx < 0 ? current + 1 : current - 1);
    }, { passive: true });

    window.addEventListener('resize', () => slideTo(0), { passive: true });
  });
}

function initCounters() {
  const counters = $$('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = Number(el.dataset.target);
      const step   = target / (1800 / 16);
      let current  = 0;
      const tick = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.round(current).toLocaleString('vi-VN');
          requestAnimationFrame(tick);
        } else {
          el.textContent = target.toLocaleString('vi-VN');
        }
      };
      tick();
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(el => observer.observe(el));
}

function initFadeIn() {
  const elements = $$('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

window.handleNewsletterSubmit = function(event) {
  event.preventDefault();
  const emailInput = $('#newsletter-email');
  if (!emailInput || !emailInput.value.trim()) return;
  const email = emailInput.value.trim();
  emailInput.value = '';
  showToast(`Dang ky thanh cong: ${email}`);
};

function initQuickView() {
  $$('.product-action-btn:not(.wishlist-btn)').forEach(btn => {
    const tooltip = btn.getAttribute('data-tooltip');
    if (tooltip === 'Xem nhanh') {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        showToast('Tinh nang xem nhanh se co som');
      });
    }
    if (tooltip === 'So sanh') {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        showToast('Da them vao so sanh');
      });
    }
  });
}

function initSmoothScroll() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = $(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initMarquee() {

}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initHeaderScroll();
  initMobileNav();
  initSearch();
  initLangSwitch();
  initHeroSlider();
  initCollectionSliders();
  initCounters();
  initFadeIn();
  initBackToTop();
  initWishlistBtns();
  initQuickView();
  initSmoothScroll();
  initMarquee();
});
