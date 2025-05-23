'use client';

/**
 * UserItem Component
 *
 * Displays a single user item inside a list.
 * Clicking the item navigates to user's detail page using Next.js <Link>.
 */

import Link from 'next/link';

interface User {
  id: number;
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
}

interface Props {
  user: User;
}

const UserItem = ({ user }: Props) => {
  return (
    <Link href={`/users/${user.id}`}>
      <li className="p-3 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer transition-all">
        <p className="font-medium text-white">
          {user.name.firstname} {user.name.lastname}
        </p>
        <p className="text-sm text-gray-300">{user.email}</p>
      </li>
    </Link>
  );
};

export default UserItem;
