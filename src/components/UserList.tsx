'use client';

import { useGetUsersQuery } from "@/store/services/userApi";

const UserList = () => {
    const { data: users, isLoading, isError } = useGetUsersQuery();
    return (
        <>
            <div>UserList</div>
            <ul className="">
                {users?.map((user) => (
                    <li
                        key={user.id}
                        className="cursor-pointer"
                    >
                        {user?.name?.firstname}
                    </li>
                ))}
            </ul>
        </>
    )
}
export default UserList