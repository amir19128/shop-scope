'use client';

import { useGetProductsQuery } from '@/store/services/productApi';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const pageCount: number = 10;

const ProductList = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery();
    const [displayedData, setDisplayedData] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreProducts = () => {
        if (!products) return;

        const nextPage = products.slice(
            displayedData.length,
            displayedData.length + pageCount
        );

        setDisplayedData((prev) => [...prev, ...nextPage]);

        if (displayedData.length + pageCount >= products.length)
            setHasMore(false);
    };
    useEffect(() => {
        if (products) {
            setDisplayedData(products.slice(0, pageCount));
            setHasMore(products.length > pageCount);
        }
    }, [products]);

    if (isLoading) return <p className="text-center">در حال بارگذاری محصولات...</p>;
    if (isError) return <p className="text-center text-red-500">خطا در دریافت محصولات!</p>;

    return (
        <section>
            <h2 className="text-xl font-semibold mb-2">Products</h2>
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
                            className="bg-gray-800 p-4 rounded shadow hover:bg-gray-700 cursor-pointer"
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
