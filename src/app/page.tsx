import ProductList from "@/components/ProductList";
import SelectedProducts from "@/components/SelectedProducts";
import UserList from "@/components/UserList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto p-4 grid gap-4 grid-cols-1 md:grid-cols-3 justify-items-center">
        <ProductList />
        <UserList />
        <SelectedProducts />
      </main>
    </div>
  );
}
