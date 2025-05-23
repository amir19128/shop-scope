'use client';

/**
 * ProductList Component
 *
 * Fetches product list from API using RTK Query,
 * Displays 10 items initially, loads more on scroll (infinite scroll),
 * Allows search filtering, and dispatches selected product to Redux state.
 */

import { useGetProductsQuery } from '@/store/services/productApi';
import { addProduct } from '@/store/slices/selectedProductsSlice';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from './SearchInput';
import Skeleton from './Skeleton';
import { RootState } from '@/store';

/**
 * Product type — ideally should be imported from productApi or types.ts
 */
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const PAGE_COUNT = 10;

const ProductList = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [displayedData, setDisplayedData] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  // Get list of selected products from Redux
  const selectedProducts = useSelector((state: RootState) => state.selectedProducts.items);
  console.log(selectedProducts);
  /**
   * Fetch next set of products for infinite scroll
   */
  const fetchMoreProducts = () => {
    if (!products) return;

    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const nextPage = filtered.slice(
      displayedData.length,
      displayedData.length + PAGE_COUNT
    );

    setDisplayedData((prev) => [...prev, ...nextPage]);

    if (displayedData.length + PAGE_COUNT >= filtered.length) {
      setHasMore(false);
    }
  };

  /**
   * Reset and filter products when `products` or `searchTerm` changes
   */
  useEffect(() => {
    if (products) {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedData(filtered.slice(0, PAGE_COUNT));
      setHasMore(filtered.length > PAGE_COUNT);
    }
  }, [products, searchTerm]);

  if (isLoading) return <Skeleton title="Products" />;
  if (isError)
    return <p className="text-center text-red-500">Error receiving products!</p>;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-white">Products</h2>
      <SearchInput
        placeholder="Search products..."
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <InfiniteScroll
        dataLength={displayedData.length}
        next={fetchMoreProducts}
        hasMore={hasMore}
        height={500}
        loader={
          <div className="flex justify-center my-4">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          </div>
        }
        endMessage={
          <p className="text-sm text-center text-green-500 my-4">All products loaded.</p>
        }
      >
        <ul className="space-y-3 mt-4">
          {displayedData.map((product) => (
            <li
              key={product.id}
              onClick={() => dispatch(addProduct(product))}
              className="cursor-pointer p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200 shadow-sm"
            >
              <h3 className="font-bold text-base mb-1 text-blue-300">
                {product.title}
              </h3>
              <p className="text-sm text-gray-300 line-clamp-2">
                {product.description}
              </p>
              <p className="text-sm mt-2 text-green-400 font-semibold">
                ${product.price}
              </p>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </section>
  );
};

export default ProductList;