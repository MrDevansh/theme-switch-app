// pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../styles/themeStyles';
import { ProductCard } from '../components/ProductCard';

interface Product {
  id: number;
  title: string;
  description: string;
}

const ITEMS_PER_PAGE = 12;

export const Home: React.FC = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) =>
        setProducts(
          data.products.map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
          }))
        )
      )
      .catch(() => setError('Failed to fetch products. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const currentTheme = themes[theme];
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <div className="px-4 sm:px-8 py-10 mt-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Products</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <div className={`grid gap-6 ${currentTheme.layout}`}>
            {currentProducts.map((p) => (
              <ProductCard
                key={p.id}
                title={p.title}
                description={p.description}
                className={currentTheme.cardBg}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center gap-4 text-sm font-medium">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded border bg-white dark:bg-[#27272a] disabled:opacity-50"
            >
              ← Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded border bg-white dark:bg-[#27272a] disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
};
