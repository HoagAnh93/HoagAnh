import React, { useState, useEffect, useMemo } from 'react';
import { SHEET_CSV_URL } from '../constants';
import { fetchGoogleSheetData } from '../utils';
import ProductCard from './ProductCard';
import { Product, Category } from '../types';
import { Loader2, AlertCircle } from 'lucide-react';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([{ id: 'all', name: 'Tất cả' }]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(false);
      try {
        const fetchedProducts = await fetchGoogleSheetData(SHEET_CSV_URL);
        
        if (fetchedProducts.length === 0) {
           console.warn("No products found or error parsing CSV");
           // Optional: setError(true) if empty state is considered an error
        }

        setProducts(fetchedProducts);

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(fetchedProducts.map(p => p.category))).filter(Boolean);
        const dynamicCategories: Category[] = [
          { id: 'all', name: 'Tất cả' },
          ...uniqueCategories.map(cat => ({
            id: cat, // Use the raw category name as ID for simplicity
            name: cat
          }))
        ];
        
        setCategories(dynamicCategories);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <section id="products" className="py-20 bg-gray-50 min-h-[500px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Săn Deal Hôm Nay</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          
          {/* Category Filter */}
          {!loading && !error && categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-md shadow-orange-500/20 transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-gray-500">Đang cập nhật deal mới nhất...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-red-500">
             <AlertCircle className="w-10 h-10 mb-2" />
             <p>Không thể tải dữ liệu. Vui lòng thử lại sau.</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Chưa có deal nào cho danh mục này.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;