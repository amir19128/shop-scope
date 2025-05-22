'use client';

import { useGetUserByIdQuery } from "@/store/services/userApi";


interface Props {
    id: string;
}

export default function UserDetail({ id }: Props) {
    const { data: user, isLoading, error } = useGetUserByIdQuery(id);

    if (isLoading)
        return <p className="text-center text-gray-500">Loading user details...</p>;

    if (error)
        return <p className="text-center text-red-500">Failed to load user data.</p>;

    if (!user)
        return <p className="text-center text-gray-500">User not found.</p>;

    return (
        <div className="bg-gray-800 text-white rounded-xl p-6 shadow-lg space-y-3">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
                {user.username}
            </h2>
            <p><span className="font-semibold text-gray-300">Name:</span> {user.name.firstname} {user.name.lastname}</p>
            <p><span className="font-semibold text-gray-300">Email:</span> {user.email}</p>
            <p><span className="font-semibold text-gray-300">Phone:</span> {user.phone}</p>
            <p><span className="font-semibold text-gray-300">City:</span> {user.address.city}</p>
            <p><span className="font-semibold text-gray-300">Street:</span> {user.address.street}</p>
        </div>
    );
}
