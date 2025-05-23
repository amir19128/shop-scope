'use client';

/**
 * SelectedProductItem Component
 *
 * Displays a selected product with title and price.
 * Clicking on it removes the product from the Redux selected list.
 */

import { useDispatch } from 'react-redux';
import { removeProduct } from '@/store/slices/selectedProductsSlice';

/**
 * Product type — local definition
 */
interface Product {
    id: number;
    title: string;
    price: number;
}

interface Props {
    product: Product;
}

const SelectedProductItem = ({ product }: Props) => {
    const dispatch = useDispatch();

    return (
        <li
            onClick={() => dispatch(removeProduct(product.id))}
            className="p-3 rounded bg-blue-800 hover:bg-blue-700 cursor-pointer transition-all"
        >
            <p className="font-medium text-white">{product.title}</p>
            <p className="text-sm text-green-300">${product.price}</p>
        </li>
    );
};

export default SelectedProductItem;
