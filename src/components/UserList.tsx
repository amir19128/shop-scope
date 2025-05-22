'use client';

import { useGetUsersQuery } from "@/store/services/userApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchInput from "./SearchInput";

const UserList = () => {
    const { data: users, isLoading, isError } = useGetUsersQuery();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = (id: string) => {
        router.push(`/users/${id}`);
    };
    const filteredUsers = users?.filter((u) =>
        u.name.firstname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (isLoading) return <p className="text-center">در حال بارگذاری محصولات...</p>;
    if (isError) return <p className="text-center text-red-500">خطا در دریافت محصولات!</p>;
    return (
        <>
            <div>UserList</div>
            <SearchInput placeholder="Search users..." value={searchTerm} onChange={setSearchTerm} />
            <ul className="">
                {filteredUsers?.map((user) => (
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