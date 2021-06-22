import axios, { AxiosError } from "axios"
import { environment } from "../app/environment/environment"
import "../styles.css"


export interface Friend {
    id: number
    name: string
    login: string
}

export interface Message {
    from: string
    content: string
    created_at: string
}

export async function sendMessage(friendLogin:string, content:string): Promise<void> {
    try {
        const friendToChat = {message: {login:friendLogin, content: content}}
        await axios.post(environment.backendUrl + "/v1/user/send_message", friendToChat)
    } catch (error) {
        const axiosError = error as AxiosError
        throw axiosError
    }
}

export async function loadMessages(friendLogin:string): Promise<Message[]> {
    try {
        const msg = {message: {login:friendLogin, content: ""}}
        return (await axios.post(environment.backendUrl + "/v1/user/load_messages/", msg)).data as Message[]
    } catch (error) {
        const axiosError = error as AxiosError
        throw axiosError
    }
}

export async function loadFriendList(): Promise<Friend[]> {
    try {
        return (await (axios.get(environment.backendUrl + "/v1/user/friend_list"))).data as Friend[]
    } catch (error) {
        const axiosError = error as AxiosError
        throw axiosError
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