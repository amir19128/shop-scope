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
            <h2 className="text-2xl font-semibold mb-4">Selected Products</h2>
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
                    <li
                        key={product.id}
                        onClick={() => dispatch(removeProduct(product.id))}
                        className="p-3 rounded bg-blue-800 hover:bg-blue-700 cursor-pointer transition-all"
                    >
                        <p className="font-medium text-white">{product.title}</p>
                        <p className="text-sm text-green-300">${product.price}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default SelectedProducts;
