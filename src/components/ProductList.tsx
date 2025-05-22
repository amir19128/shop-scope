/**
 * ProductList Component
 * 
 * Fetches product list from API using RTK Query,
 * displays 10 products initially and loads more as user scrolls (infinite scroll).
 * Allows users to search products by title.
 * Clicking on a product adds it to the selected product list via Redux.
 */
'use client';

import { useGetProductsQuery } from '@/store/services/productApi';
import { addProduct } from '@/store/slices/selectedProductsSlice';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import SearchInput from './SearchInput';

const pageCount: number = 10;

const ProductList = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery();
    const [displayedData, setDisplayedData] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const fetchMoreProducts = () => {
        if (!products) return;
        const filtered = products.filter((p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const nextPage = filtered.slice(
            displayedData.length,
            displayedData.length + pageCount
        );

        setDisplayedData((prev) => [...prev, ...nextPage]);

        if (displayedData.length + pageCount >= filtered.length)
            setHasMore(false);
    };
    useEffect(() => {
        if (products) {
            const filtered = products.filter((p) =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setDisplayedData(filtered.slice(0, pageCount));
            setHasMore(filtered.length > pageCount);
        }
    }, [products, searchTerm]);

    if (isLoading) return <p className="text-center text-white">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Error receiving products!</p>;

    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Products</h2>
            <SearchInput placeholder="Search products..." value={searchTerm} onChange={setSearchTerm} />
            <InfiniteScroll
                dataLength={displayedData.length}
                next={fetchMoreProducts}
                hasMore={hasMore}
                height={500}
                loader={<p className="text-sm text-center text-gray-500 my-2">Loading more...</p>}
                endMessage={
                    <p className="text-sm text-center text-green-500 my-4">All products loaded.</p>
                }
            >
                <ul className="space-y-3 mt-4">
                    {displayedData.map((product) => (
                        <li
                            key={product.id}
                            onClick={() => dispatch(addProduct(product))} // Add selected product to Redux state (selectedProducts slice)
                            className="cursor-pointer p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200 shadow-sm"
                        >
                            <h3 className="font-bold text-base mb-1 text-blue-300">{product.title}</h3>
                            <p className="text-sm text-gray-300 line-clamp-2">{product.description}</p>
                            <p className="text-sm mt-2 text-green-400 font-semibold">${product.price}</p>
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
        </section>
    );
};

export default ProductList;
