// components/ProductCard.tsx
import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  title: string;
  description: string;
  className?: string;
};

export const ProductCard: React.FC<Props> = ({ title, description, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`rounded-xl shadow-md p-5 bg-white dark:bg-[#1e1e1e] transition hover:shadow-lg ${className}`}
    >
      <h2 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
        {description}
      </p>
      <button className="px-4 py-1.5 text-sm font-medium bg-[#0D9488] text-white rounded hover:bg-[#0b7e75] transition">
        Read More
      </button>
    </motion.div>
  );
};
