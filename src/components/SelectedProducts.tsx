'use client';
import { RootState } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '@/store/slices/selectedProductsSlice';

const SelectedProducts = () => {
    const selected = useSelector((state: RootState) => state.selectedProducts.items);
    const dispatch = useDispatch();

    return (
        <section>
            <h2 className="">Selected Products</h2>
            {selected.length === 0 && <p className="">محصولی انتخاب نشده</p>}
            <ul className="">
                {selected.map((product) => (
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
