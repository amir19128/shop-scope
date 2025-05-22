'use client';

import { useGetUsersQuery } from "@/store/services/userApi";
import { useRouter } from "next/navigation";

const UserList = () => {
    const { data: users, isLoading, isError } = useGetUsersQuery();
    const router = useRouter();
    const handleClick = (id: string) => {
        router.push(`/users/${id}`);
    };
    if (isLoading) return <p className="text-center">در حال بارگذاری محصولات...</p>;
    if (isError) return <p className="text-center text-red-500">خطا در دریافت محصولات!</p>;
    return (
        <>
            <div>UserList</div>
            <ul className="">
                {users?.map((user) => (
                    <li
                        key={user.id}
                        className="cursor-pointer"
                        onClick={() => handleClick(user.id)}
                    >
                        {user?.name?.firstname}
                    </li>
                ))}
            </ul>
        </>
    )
}
export default UserList