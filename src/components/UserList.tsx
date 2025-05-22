/**
 * UserList Component
 * 
 * Fetches list of users from the API using RTK Query.
 * Allows searching users by firstname.
 * Clicking on a user navigates to their detail page via dynamic route (/users/[id]).
 */

'use client';

import { useGetUsersQuery } from "@/store/services/userApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchInput from "./SearchInput";
import Skeleton from "./Skeleton";

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
  
     if (isLoading) return <Skeleton title="Users" />;
    if (isError) return <p className="text-center text-red-500">Error receiving users!</p>;
  
    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Users</h2>
            <SearchInput placeholder="Search users..." value={searchTerm} onChange={setSearchTerm} />
            {isLoading && <p className="text-sm text-gray-400 mt-4">Loading users...</p>}
            <ul className="space-y-2 mt-4 max-h-[500px] overflow-y-auto pr-1">
                {filteredUsers?.map((user) => (
                    <li
                        key={user.id}
                        onClick={() => handleClick(user.id)}
                        className="p-3 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer transition-all"
                    >
                        <p className="font-medium text-white">
                            {user.name.firstname} {user.name.lastname}
                        </p>
                        <p className="text-sm text-gray-300">{user.email}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
export default UserList