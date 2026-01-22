import React from 'react';
import { SITE_INFO } from '../constants';
import { Check, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-primary text-xs font-semibold uppercase tracking-wide mb-6 animate-fade-in-up">
          <Check className="w-3 h-3" />
          Link Sản Phẩm Chính Hãng
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
          Deal ngon mỗi ngày <br className="hidden md:block" />
          <span className="text-primary relative inline-block">
            mua đúng giá
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
          , đúng chỗ
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
          {SITE_INFO.heroSubtitle}
        </p>

        {/* CTA */}
        <button
          onClick={scrollToProducts}
          className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-primary rounded-full shadow-lg shadow-orange-500/30 hover:bg-primary-dark hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-300"
        >
          {SITE_INFO.ctaText}
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none -z-0">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[20%] w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
};

export default Hero;