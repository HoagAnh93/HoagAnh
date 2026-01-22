import { Product } from './types';

export const fetchGoogleSheetData = async (url: string): Promise<Product[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function parseCSV(csvText: string): Product[] {
  const lines = csvText.split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const products: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Handle quoted values containing commas
    const values: string[] = [];
    let current = '';
    let inQuote = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        if (j + 1 < line.length && line[j + 1] === '"') {
             current += '"';
             j++;
        } else {
            inQuote = !inQuote;
        }
      } else if (char === ',' && !inQuote) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current);

    const product: any = {};
    
    // Helper to get value by possible header names with exclusion support
    const getValue = (keys: string[], exclude: string[] = []) => {
      const index = headers.findIndex(h => {
          const matchesKey = keys.some(k => h.includes(k));
          const matchesExclude = exclude.some(e => h.includes(e));
          return matchesKey && !matchesExclude;
      });
      return index !== -1 && values[index] ? values[index].trim() : '';
    };

    product.id = getValue(['id', 'stt', 'mã']) || Math.random().toString(36).substr(2, 9);
    
    // Flexible naming for 'Name' column
    product.name = getValue(['tên', 'name', 'product', 'tiêu đề', 'sản phẩm', 'tên hàng']);
    
    // Flexible naming for 'Original Price'
    product.originalPrice = parsePrice(getValue(['giá gốc', 'original', 'giá cũ', 'giá thị trường', 'old price']));
    
    // Flexible naming for 'Sale Price' - Exclude keywords related to original price to avoid wrong column matching
    product.salePrice = parsePrice(getValue(
        ['giá bán', 'sale', 'price', 'giá', 'giá mới', 'giá km', 'giá khuyến mãi'],
        ['gốc', 'original', 'cũ', 'old', 'thị trường', 'trước']
    ));
    
    // Flexible naming for 'Image'
    product.imageUrl = getValue(['ảnh', 'image', 'img', 'hình', 'hình ảnh', 'link ảnh']);
    
    // Flexible naming for 'Link'
    product.affiliateLink = getValue(['link', 'affiliate', 'url', 'mua', 'shopee', 'lazada']);
    
    // Flexible naming for 'Category'
    product.category = getValue(['danh mục', 'category', 'loại', 'nhóm', 'ngành hàng']);
    
    // Flexible naming for 'Tags'
    const tagStr = getValue(['tag', 'nhãn', 'label', 'thẻ', 'note', 'ghi chú']);
    product.tags = tagStr ? tagStr.split(',').map(t => t.trim()).filter(Boolean) : [];
    
    // Flexible naming for 'Official' status
    const officialStr = getValue(['chính hãng', 'official', 'mall', 'shop mall', 'uy tín']);
    product.isOfficial = ['true', '1', 'có', 'yes', 'y', 'ok', 'rồi'].includes(officialStr.toLowerCase());

    // Basic validation: must have name and price
    if (product.name && product.salePrice) {
      // Normalize category for filtering
      if (!product.category) product.category = 'Khác';
      products.push(product as Product);
    }
  }
  return products;
}

function parsePrice(str: string): number {
  if (!str) return 0;
  // Remove all non-numeric characters
  return parseInt(str.replace(/[^0-9]/g, '')) || 0;
}