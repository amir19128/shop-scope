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
    }, [products,searchTerm]);

    if (isLoading) return <p className="text-center">در حال بارگذاری محصولات...</p>;
    if (isError) return <p className="text-center text-red-500">خطا در دریافت محصولات!</p>;

    return (
        <section>
            <h2 className="text-xl font-semibold mb-2">Products</h2>
            <SearchInput placeholder="Search products..." value={searchTerm} onChange={setSearchTerm} />
            <InfiniteScroll
                dataLength={displayedData.length}
                next={fetchMoreProducts}
                hasMore={hasMore}
                loader={<p className="text-center py-4 text-sm text-gray-400">در حال دریافت بیشتر...</p>}
                height={600}
                endMessage={
                    <p className=""></p>
                }
            >
                <ul className="space-y-2 overflow-y-auto">
                    {displayedData.map((product) => (
                        <li
                            key={product.id}
                            className="cursor-pointer"
                            onClick={() => dispatch(addProduct(product))}
                        >
                            <h3 className="text-lg font-bold">{product.title}</h3>
                            <p className="text-sm text-gray-300 truncate">{product.description}</p>
                            <p className="text-green-400 mt-1">${product.price}</p>
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
        </section>
    );
};

export default ProductList;
