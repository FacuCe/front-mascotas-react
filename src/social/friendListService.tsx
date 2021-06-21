import axios, { AxiosError } from "axios"
import { environment } from "../app/environment/environment"
import "../styles.css"


export interface Friend {
    id: number
    name: string
    login: string
}

export async function loadFriendList(): Promise<Friend[]> {
    try {
        return (await (axios.get(environment.backendUrl + "/v1/user/friend_list"))).data as Friend[]
    } catch (error) {
        const axiosError = error as AxiosError
        if (axiosError.response && axiosError.response.status === 401) {
            console.log("Denied access")
        }
        throw error
    }
}

export async function loadPendingList(): Promise<Friend[]> {
    try {
        return (await (axios.get(environment.backendUrl + "/v1/user/pending_solicitudes"))).data as Friend[]
    } catch (error) {
        const axiosError = error as AxiosError
        throw axiosError
    }
}

export async function deleteFriend(friendLogin:string) {
    try {
        const user = {login: friendLogin}
        return (await (axios.post(environment.backendUrl + "/v1/user/delete_friend", user)))
    } catch (error) {
        const axiosError = error as AxiosError
        throw axiosError
    }
}

export async function solicitude(friendLogin:string, myOption:boolean): Promise<void> {
    try {
        const user = {user: {login: friendLogin, option: myOption}}
        await axios.post(environment.backendUrl + "/v1/user/solicitude", user)
    } catch (error) {
        const axiosError = error as AxiosError
        throw axiosError
    }
}

export async function newFriend(newFriendLogin:string): Promise<void> {
    try {
        const user = {login: newFriendLogin}
        await axios.post(environment.backendUrl + "/v1/user/add_friend", user)
    } catch (error) {
        const axiosError = error as AxiosError
        // console.log(axiosError.response?.data.message[0].message)
        throw axiosError
    }
}