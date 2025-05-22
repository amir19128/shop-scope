'use client';
import { useGetProductsQuery } from "@/store/services/productApi";
import { SearchInput } from "./SearchInput";
const ProductList = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <p className="text-center">در حال بارگذاری محصولات...</p>;
  if (isError) return <p className="text-center text-red-500">خطا در دریافت محصولات!</p>;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Products</h2>
      <ul className="">
        {products?.map((product) => (
          <li
            key={product.id}
          >
            <span className="">{product.title}</span>
            <span className="">${product.price}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
