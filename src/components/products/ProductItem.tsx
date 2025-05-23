'use client';

/**
 * ProductItem Component
 *
 * Displays a single product item with title, description, and price.
 * Highlights if it's already selected.
 * Dispatches selection on click.
 */

import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '@/store/slices/selectedProductsSlice';
import { RootState } from '@/store';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  const dispatch = useDispatch();
  // Get list of selected products from Redux
  const selectedProducts = useSelector(
    (state: RootState) => state.selectedProducts.items
  );
  // Check if this product is in the selected products column
  const isSelected = selectedProducts.some((item) => item.id === product.id);

  return (
    <li
      onClick={() => dispatch(addProduct(product))}
      className={`cursor-pointer p-4 rounded-lg transition-all duration-200 shadow-sm ${
        isSelected
          ? 'bg-green-700 border border-green-400'
          : 'bg-gray-700 hover:bg-gray-600'
      }`}
    >
      <h3 className="font-bold text-base mb-1 text-blue-300">
        {product.title}
      </h3>
      <p className="text-sm text-gray-300 line-clamp-2">{product.description}</p>
      <p className="text-sm mt-2 text-green-400 font-semibold">
        ${product.price}
      </p>
    </li>
  );
};

export default ProductItem;