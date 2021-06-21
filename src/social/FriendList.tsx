import React, { useEffect, useState } from 'react'
import { useErrorHandler } from '../common/utils/ErrorHandler'
import { newFriend, deleteFriend, loadFriendList, Friend, solicitude, loadPendingList } from './friendListService'
import GlobalContent from "../common/components/GlobalContent"
import FormTitle from "../common/components/FormTitle"
import { RouteComponentProps } from 'react-router-dom'

import "../users_list/usersListStyle.css"
import Form from '../common/components/Form'
import FormInput from '../common/components/FormInput'
import DangerLabel from '../common/components/DangerLabel'
import FormButtonBar from '../common/components/FormButtonBar'
import FormAcceptButton from '../common/components/FormAcceptButton'

function FriendList(props: RouteComponentProps) {

    const [friendList, setFriendList] = useState<Friend[]>([])
    const [friendLogin, setFriendLogin] = useState("")
    const [pendingList, setPendingList] = useState<Friend[]>([])
    const errorHandler = useErrorHandler()

    const getFriendList = async () => {
        try {
            const res = await loadFriendList()
            setFriendList(res)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const getPendingList = async () => {
        try {
            const res = await loadPendingList()
            setPendingList(res)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const addFriend = async () => {
        if (!friendLogin) {
            errorHandler.addError("login", "No puede estar vacío")
        }

        if (errorHandler.hasErrors()) {
            return
        }

        try {
            await newFriend(friendLogin)
            alert("Solicitud Enviada")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const removeFriend = async (userSelected:Friend) => {
        try {
            await deleteFriend(userSelected.login)
            void getFriendList()
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
        
    }

    const chooseOption = async (userSelected:Friend, option: boolean) => {
        try {
            await solicitude(userSelected.login, option)
            void getFriendList()
            void getPendingList()
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
        
    }

    const refreshData = () => {
        void getFriendList()
        void getPendingList()
    }

    useEffect(() => {
        void getFriendList()
        void getPendingList()
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Amigos</FormTitle>
            
            <DangerLabel message={errorHandler.errorMessage} />
            
            <div className="text-center">
                <button type="button" className="btn btn-success my-4" onClick={() => refreshData()}>
                    Actualizar todo
                </button>
            </div>

            <div className="bg-light py-3 px-3 text-center">
                <h4>Agregar Amigos</h4>
                <Form>
                    <FormInput
                        label="Buscar por login"
                        name="login"
                        errorHandler={errorHandler}
                        onChange={(event) => setFriendLogin(event.target.value)}
                    />

                    <FormButtonBar>
                        <FormAcceptButton label="Enviar solicitud" onClick={addFriend} />
                    </FormButtonBar>
                </Form >
            </div><br/><br/>

            <div>
                {pendingList.length !== 0 ? 
                    <div className="my-4">
                        <h4>Solicitudes Pendientes</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th>login</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingList.map((user, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.login}</td>
                                            <td>
                                                <button type="button" className="btn btn-primary btn-sm" onClick={() => chooseOption(user, true)}>
                                                    Acceptar solicitud
                                                </button>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => chooseOption(user, false)}>
                                                    Rechazar solicitud
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                : <h4 className="my-2 py-4 bg-light text-center">No hay solicitudes de amistad pendientes</h4>
                }
            </div>

            <div>
                {friendList.length !== 0 ?
                    <div className="my-4">
                        <h4>Lista de Amigos</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th>login</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {friendList.map((friend, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{friend.id}</td>
                                            <td>{friend.name}</td>
                                            <td>{friend.login}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => removeFriend(friend)}>
                                                    Eliminar Amigo
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                : <h4 className="my-2 py-4 bg-light text-center">No tienes amigos :c</h4>
                }
            </div>
        </GlobalContent>
    )
}

export default FriendList
