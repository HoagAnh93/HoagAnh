import React from 'react';
import { SITE_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-bold text-white mb-4">{SITE_INFO.name}</h4>
            <p className="text-sm text-gray-400 max-w-md">
              Website chia sẻ các sản phẩm chất lượng với giá ưu đãi. 
              Chúng tôi giúp bạn tìm kiếm những deal tốt nhất mỗi ngày.
            </p>
          </div>
          <div className="md:text-right">
            <h5 className="font-semibold text-white mb-4">Thông tin</h5>
            <p className="text-sm text-gray-400 mb-2">Miễn trừ trách nhiệm: Chúng tôi không trực tiếp bán hàng.</p>
            <p className="text-sm text-gray-400">Giao dịch được thực hiện trực tiếp trên sàn TMĐT.</p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {SITE_INFO.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Không thu thập dữ liệu</span>
            <span className="hover:text-white cursor-pointer transition-colors">Không cần đăng nhập</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;