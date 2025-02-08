import { useState, useEffect } from 'react'
import {U401} from '../401'

const API = import.meta.env.VITE_REACT_APP_API || 'http://localhost:5000'

export const UserList = () => {
    const [users, setUsers] = useState([])
    const fetchUsers = async () => {
        try {
          const response = await fetch(`${API}/users/get`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
          })
    
          if (response.ok) {
            const data = await response.json()
            setUsers(data)
          } else {
            console.error("Failed to fetch users")
          }
        } catch (err) {
          console.error("Error fetching users:", err.message)
        }
      }
    
      useEffect(() => {
        fetchUsers()
      }, [])

      return (
        <div>
          <h1 className="text-2xl font-bold mb-4">Users</h1>
          <div className="border rounded">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Id</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Password</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map(user => (
                    <tr key={user.IdAccesoUsuario}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.IdAccesoUsuario}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.Email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.Password}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                      No users registered yet
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      )
}



