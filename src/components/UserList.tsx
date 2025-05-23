'use client';

/**
 * UserList Component
 * 
 * Fetches list of users from the API using RTK Query.
 * Allows searching users by first name.
 * Clicking on a user navigates to their detail page via dynamic route (/users/[id]).
 */

import { useGetUsersQuery } from "@/store/services/userApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchInput from "./SearchInput";
import Skeleton from "./Skeleton";
import Link from "next/link";

/**
 * User type — should match the structure from the API
 */
interface User {
  id: number;
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
}

const UserList = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [searchTerm, setSearchTerm] = useState('');
  /**
   * Navigate to user's detail page
   * @param id - User ID
   */

  /**
   * Filter users by search term (first name)
   */
  const filteredUsers = users?.filter((u) =>
    u.name.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Skeleton title="Users" />;
  if (isError)
    return <p className="text-center text-red-500">Error receiving users!</p>;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-white">Users</h2>
      <SearchInput
        placeholder="Search users..."
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <ul className="space-y-2 mt-4 max-h-[500px] overflow-y-auto pr-1">
        {filteredUsers?.map((user) => (
          <Link key={user.id} href={`/users/${user.id}`}>
            <li className="p-3 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer transition-all">
              <p className="font-medium text-white">
                {user.name.firstname} {user.name.lastname}
              </p>
              <p className="text-sm text-gray-300">{user.email}</p>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default UserList;