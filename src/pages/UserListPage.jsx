import { useEffect } from "react"
import { useState } from "react"
import useUsers from "../hooks/useUsers"

const UserList = () => {
    const [users, loading, error] = useUsers

    if(loading) return <div>Loading...</div>
    if(error) return <div>Error {error}</div>
    if(!users.length) return <div>'No hay usuarios'</div>

    return <>
        <h1>Lista usuarios  ({users.length})</h1>
        {users.map(user => 
            <div key={user._id}>{user.email}</div>
        )}
    </>
}

export default UserList