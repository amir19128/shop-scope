// ✅ Server Component — Recommended
// src/app/users/[id]/page.tsx

type Props = {
    params: { id: string };
};

const UserDetailPage = ({ params }: Props) => {
    const { id } = params;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Detail</h1>
            <p>{id}</p>
        </div>
    );
};

export default UserDetailPage;
