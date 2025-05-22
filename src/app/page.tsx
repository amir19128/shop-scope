import ProductList from "@/components/ProductList";
import SelectedProducts from "@/components/SelectedProducts";
import UserList from "@/components/UserList";
export default function Home() {
  return (
    <div className="">
      <main className="">
        <ProductList />
        <UserList />
        <SelectedProducts />
      </main>
    </div>
  );
}
