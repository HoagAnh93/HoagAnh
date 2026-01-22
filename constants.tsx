import React from 'react';
import { Category, Feature } from './types';
import { CheckCircle, Zap, ShieldCheck, Clock } from 'lucide-react';

// --- CONFIGURATION START ---

export const SITE_INFO = {
  name: "Tạp Hóa Nhỏ",
  heroTitle: "Deal ngon mỗi ngày – mua đúng giá, đúng chỗ",
  heroSubtitle: "Tổng hợp các sản phẩm chính hãng giảm giá sâu trên Shopee. Cập nhật liên tục.",
  ctaText: "Xem deal hot hôm nay",
};

// Converted from pubhtml to pub?output=csv for machine readability
export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ89iNYAfFHD7Ivltm5urcZjK0l4U2N8nqnLzVb_U1mYVjcmBSpCTBpwM5Ufh7-uF--bJ3niTnuJK1e/pub?gid=0&single=true&output=csv";

// Initial categories (will be supplemented by data)
export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Tất cả' },
];

export const FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Deal Thật 100%',
    description: 'Chỉ chọn lọc các sản phẩm giảm giá thật sự, không ảo giá.',
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    id: '2',
    title: 'Hàng Chính Hãng',
    description: 'Ưu tiên Shopee Mall và các shop uy tín được kiểm duyệt.',
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
  },
  {
    id: '3',
    title: 'Cập nhật hàng ngày',
    description: 'Đội ngũ săn deal làm việc liên tục để tìm giá tốt nhất.',
    icon: <Clock className="w-6 h-6 text-primary" />,
  },
  {
    id: '4',
    title: 'Mua giá gốc',
    description: 'Bạn mua trực tiếp tại Shopee, không qua trung gian, không chênh giá.',
    icon: <CheckCircle className="w-6 h-6 text-primary" />,
  },
];

// --- CONFIGURATION END ---