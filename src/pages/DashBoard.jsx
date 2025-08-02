import React, { useState } from "react"
import Form from "../components/Form"
import Users from "../components/Users"

function Dashboard() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">CRUD Operation</h2>
          <button
            className="bg-black text-white px-4 py-2"
            onClick={() => setShowForm(true)}
          >
            Add User
          </button>
        </div>

        <Users />

        {showForm && (
          <Form
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard
