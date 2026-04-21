import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import '../../css/ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card fade-in visible">
      <div className="product-card-img-wrap">
        <img className="product-card-img" src={product.image} alt={product.name} loading="lazy" />
        
        {product.badges && product.badges.length > 0 && (
          <div className="product-card-badges">
            {product.badges.map((badge, idx) => {
              let badgeClass = 'badge--hot';
              if (badge.toLowerCase().includes('mới')) badgeClass = 'badge--new';
              if (badge.includes('%')) badgeClass = 'badge--sale';
              return <span key={idx} className={`badge ${badgeClass}`}>{badge}</span>;
            })}
          </div>
        )}

        <div className="product-card-actions">
          <button className="product-action-btn wishlist-btn" aria-label="Yêu thích">
            <i className="fa fa-heart"></i>
          </button>
          <button className="product-action-btn" aria-label="Xem nhanh">
            <i className="fa fa-eye"></i>
          </button>
          <button className="product-action-btn" aria-label="So sánh">
            <i className="fa fa-code-compare"></i>
          </button>
        </div>
        <div className="product-card-overlay-btn" onClick={() => alert(`Đã thêm ${product.name} vào giỏ`)}>
          <i className="fa fa-bag-shopping"></i> Thêm Vào Giỏ
        </div>
      </div>
      <div className="product-card-body">
        <div className="product-card-category">{product.category}</div>
        <Link to={`/product/${product.id}`} className="product-card-name">
          {product.name}
        </Link>
        <div className="product-card-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <i key={star} className={`fa ${star <= product.ratingStars ? 'fa-star' : (star - 0.5 === product.ratingStars ? 'fa-star-half-stroke' : 'fa-star empty')}`}></i>
            ))}
          </div>
          <span className="rating-count">({product.ratingCount})</span>
        </div>
        <div className="price-wrapper">
          {product.priceContact ? (
            <span className="price-contact">Liên hệ</span>
          ) : (
            <>
              <span className="price-current">{product.priceCurrent}</span>
              {product.priceOriginal && <span className="price-original">{product.priceOriginal}</span>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
