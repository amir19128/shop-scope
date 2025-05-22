'use client';
import { RootState } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '@/store/slices/selectedProductsSlice';
import { useState } from 'react';
import SearchInput from './SearchInput';

const SelectedProducts = () => {
    const selected = useSelector((state: RootState) => state.selectedProducts.items);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filtered = selected.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <section>
            <h2 className="">Selected Products</h2>
            <SearchInput placeholder="Search selected..." value={searchTerm} onChange={setSearchTerm} />
            {selected.length === 0 && <p className="">محصولی انتخاب نشده</p>}
            <ul className="">
                {filtered.map((product) => (
                    <li
                        key={product.id}
                        className=""
                        onClick={() => dispatch(removeProduct(product.id))}
                    >
                        <h4 className="font-bold">{product.title}</h4>
                        <p className="text-sm">${product.price}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default SelectedProducts;
