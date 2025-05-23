import UserDetail from "@/components/users/UserDetail";

/**
 * UserDetailPage
 * 
 * Server component that receives user ID from route params.
 * Displays basic info about the selected user.
 * Can be extended to fetch more details using RTK Query.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Get user ID from dynamic route params
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