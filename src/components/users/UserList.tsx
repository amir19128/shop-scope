'use client';

/**
 * UserList Component
 * 
 * Fetches list of users from the API using RTK Query.
 * Allows searching users by first name.
 * Clicking on a user navigates to their detail page via dynamic route (/users/[id]).
 */

import { useGetUsersQuery } from "@/store/services/userApi";
import { useState } from "react";
import Skeleton from "../Skeleton";
import SearchInput from "../SearchInput";
import UserItem from "./UserItem";
const UserList = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [searchTerm, setSearchTerm] = useState('');
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
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </section>
  );
};

export default UserList;