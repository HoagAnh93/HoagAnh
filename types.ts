import React from 'react';

export interface Product {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  imageUrl: string;
  affiliateLink: string;
  category: string;
  tags?: ('Deal Hot' | 'Bán Chạy' | 'Giảm Sâu' | string)[];
  isOfficial?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}