import React from "react"
import { FaEdit, FaTrash } from "react-icons/fa"

function Users() {
  const users = [
    { id: 1, name: "Ahmed Ali", email: "ahmed@example.com", role: "Admin" },
    { id: 2, name: "Sara Mohamed", email: "sara@example.com", role: "User" },
  ]

  return (
    <table className="w-full text-center">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Role</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50">
            <td className="p-2 border">{user.id}</td>
            <td className="p-2 border">{user.name}</td>
            <td className="p-2 border">{user.email}</td>
            <td className="p-2 border">{user.role}</td>
            <td className="p-2 border space-x-2">
              <button className="bg-green-500 text-white px-2 py-1 rounded inline-flex items-center gap-1">
                <FaEdit /> Edit
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded inline-flex items-center gap-1">
                <FaTrash /> Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
