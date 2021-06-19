import React, { useEffect, useState } from 'react'
import { useErrorHandler } from '../common/utils/ErrorHandler'
import { disableUser, enableUser, grantAdmin, loadUsers, revokeAdmin, Users } from './userListService'
import GlobalContent from "../common/components/GlobalContent"
import FormTitle from "../common/components/FormTitle"
import { RouteComponentProps } from 'react-router-dom'

import "./usersListStyle.css"

function UsersList(props: RouteComponentProps) {

    const [usersList, setUsersList] = useState<Users[]>([])
    const [permitted, setPermitted] = useState(false)
    const errorHandler = useErrorHandler()

    const loadUsersList = async () => {
        try {
            const res = await loadUsers()
            setUsersList(res)
            setPermitted(true)
        } catch (error) {
            errorHandler.processRestValidations(error)
            setPermitted(false)
        }
    }

    const toggleStatus = async (userSelected:Users) => {
        if (userSelected.enabled) {
            try {
                await disableUser(userSelected.id)
                void loadUsersList()
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        } else {
            try {
                await enableUser(userSelected.id)
                void loadUsersList()
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }

    const toggleAdmin = async (userSelected:Users) => {
        if (userSelected.permissions.includes('admin')) {
            try {
                await revokeAdmin(userSelected.id)
                void loadUsersList()
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        } else {
            try {
                await grantAdmin(userSelected.id)
                void loadUsersList()
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }

    useEffect(() => {
        void loadUsersList()
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Lista de Usuarios</FormTitle>
            {permitted ? 
                <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>login</th>
                        <th>status</th>
                        <th colSpan={3}>permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.login}</td>
                                <td>
                                    <button className={user.enabled ? "enabledButton" : "disabledButton"} type="button" onClick={() => toggleStatus(user)}>
                                        {user.enabled ? "enabled" : "disabled"}
                                    </button>
                                </td>
                                <td>
                                    {user.permissions.includes('user') ? <button>user</button> : null}
                                </td>
                                <td>
                                    <button type="button" onClick={() => toggleAdmin(user)}>
                                        {user.permissions.includes('admin') ? "admin" : "not admin"}
                                    </button>
                                </td>
                                <td>
                                    {user.permissions.includes('god') ? <button>god</button> : <button>not god</button>}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        : <h3>No tienes permiso para ver los usuarios</h3>}
        </GlobalContent>
    )
}

export default UsersList
