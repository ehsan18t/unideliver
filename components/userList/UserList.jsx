'use client'

import './userList.css'
import { useEffect, useState } from 'react'
import { db } from '@/config/firebase'
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [searchText, setSearchText] = useState('')
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const usersCollection = collection(db, 'users')
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const allUsers = snapshot.docs.map((doc) => doc.data())
      setUsers(allUsers)
      setUserList(allUsers)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      return user.displayName.toLowerCase().includes(searchText.toLowerCase())
    })
    setUserList(filteredUsers)
  }, [searchText, users])

  const handleToggleAdmin = async (user) => {
    try {
      const userRef = doc(collection(db, 'users'), user.uid)
      await updateDoc(userRef, {
        isAdmin: !user.isAdmin,
      })

      toast.success('User admin status updated successfully!', {
        position: 'bottom-left',
        autoClose: 2000,
      })

      // Update the user's 'isAdmin' status locally
      const updatedUsers = users.map((u) => {
        if (u.uid === user.uid) {
          return { ...u, isAdmin: !user.isAdmin }
        }
        return u
      })
      setUsers(updatedUsers)
    } catch (error) {
      toast.error(`Error updating user admin status: ${error}`, {
        position: 'bottom-left',
        autoClose: 2000,
      })
    }
  }

  const handleToggleBan = async (user) => {
    try {
      const userRef = doc(collection(db, 'users'), user.uid)
      await updateDoc(userRef, {
        isBanned: !user.isBanned,
      })

      toast.success('User has been banned successfully!', {
        position: 'bottom-left',
        autoClose: 2000,
      })

      // Update the user's 'isBanned' status locally
      const updatedUsers = users.map((u) => {
        if (u.uid === user.uid) {
          return { ...u, isBanned: !user.isBanned }
        }
        return u
      })
      setUsers(updatedUsers)
    } catch (error) {
      toast.error(`Error updating user ban status: ${error}`, {
        position: 'bottom-left',
        autoClose: 2000,
      })
    }
  }

  const handleToggleType = async (user) => {
    try {
      const userRef = doc(collection(db, 'users'), user.uid)
      await updateDoc(userRef, {
        isDeliveryMan: !user.isDeliveryMan,
      })

      toast.success('User has been designated as Delivery Man successfully!', {
        position: 'bottom-left',
        autoClose: 2000,
      })

      // Update the user's 'isBanned' status locally
      const updatedUsers = users.map((u) => {
        if (u.uid === user.uid) {
          return { ...u, isDeliveryMan: !user.isDeliveryMan }
        }
        return u
      })
      setUsers(updatedUsers)
    } catch (error) {
      toast.error(`Error updating user Delivery Man status: ${error}`, {
        position: 'bottom-left',
        autoClose: 2000,
      })
    }
  }

  return (
    <div className="user-list">
      <div className="flex w-full justify-center items-center py-4">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search User"
          className="border border-gray-300 rounded-md p-2 w-4/5"
        />
      </div>
      <h2>User List</h2>
      <ul>
        {userList.map((user) => (
          <li key={user.uid}>
            <div className="user">
              <div className="primary">
                <h3>{user.displayName}</h3>
                <p>{user.email}</p>
              </div>
              <div className="secondary">
                <h4>{user.lastLogin.toDate().toString()}</h4>
                <p>{user.uid}</p>
              </div>
              <div className="action">
                <div className="space-x-2">
                  <button
                    className="btn-blue"
                    onClick={() => handleToggleType(user)}
                  >
                    {user.isDeliveryMan
                      ? 'Remove Delivery Man'
                      : 'Make Delivery Man'}
                  </button>
                  <button
                    className="btn-blue"
                    onClick={() => handleToggleAdmin(user)}
                  >
                    {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                  </button>
                </div>
                <button
                  className="btn-red"
                  onClick={() => handleToggleBan(user)}
                >
                  {user.isBanned ? 'Unban' : 'Ban'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
