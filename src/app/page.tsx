import ProductList from "@/components/products/ProductList";
import SelectedProducts from "@/components/products/SelectedProducts";
import UserList from "@/components/users/UserList";

export default function Home() {
  return (
    <main className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
        <ProductList />
      </div>
      <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
        <UserList />
      </div>
      <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
        <SelectedProducts />
      </div>
    </main>
  );
}
