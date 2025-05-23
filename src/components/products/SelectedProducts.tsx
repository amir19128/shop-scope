'use client';

/**
 * SelectedProducts Component
 *
 * Displays a list of products the user has selected.
 * Allows removing items by clicking on them.
 * Includes a search input to filter selected products by title.
 */

import { RootState } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import SearchInput from '../SearchInput';
import SelectedProductItem from './SelectedProductItem';

/**
 * Product type — matches product slice structure
 */
interface Product {
  id: number;
  title: string;
  price: number;
}

const SelectedProducts = () => {
  // Get selected product list from Redux state
  const selected: Product[] = useSelector(
    (state: RootState) => state.selectedProducts.items
  );

  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter selected products by search term (title match)
  const filtered = selected.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-white">Selected Products</h2>
      <SearchInput
        placeholder="Search selected..."
        value={searchTerm}
        onChange={setSearchTerm}
      />
      {filtered.length === 0 && (
        <p className="text-sm text-gray-400 mt-4">No products selected.</p>
      )}
      <ul className="space-y-2 mt-4 max-h-[500px] overflow-y-auto pr-1">
        {filtered.map((product) => (
          <SelectedProductItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
};

export default SelectedProducts;