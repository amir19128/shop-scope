import UserDetail from "@/components/UserDetail";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        User Detail
      </h1>
      <UserDetail id={id} />
    </div>
  );
}