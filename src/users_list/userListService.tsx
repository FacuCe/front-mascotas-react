import axios, { AxiosError } from "axios"
import { environment } from "../app/environment/environment"
import "../styles.css"


export interface Users {
    id: number
    name: string
    login: string
    enabled: boolean
    permissions: string[]
}

export async function loadUsers(): Promise<Users[]> {
    try {
        return (await (axios.get(environment.backendUrl + "/v1/users"))).data as Users[]
    } catch (error) {
        const axiosError = error as AxiosError
        throw axiosError
    }
}

export async function disableUser(userId:number): Promise<void> {
    try {
        await axios.post(environment.backendUrl + "/v1/users/" + userId + "/disable")
    } catch (error) {
        const axiosError = error as AxiosError
        throw axiosError
    }
}

export async function enableUser(userId:number): Promise<void> {
    try {
        await axios.post(environment.backendUrl + "/v1/users/" + userId + "/enable")
    } catch (error) {
        const axiosError = error as AxiosError
        throw axiosError
    }
}

export async function revokeAdmin(userId:number): Promise<void> {
    try {
        const permissions = {permissions: ["admin"]}
        await axios.post(environment.backendUrl + "/v1/users/" + userId + "/revoke", permissions)
    } catch (error) {
        const axiosError = error as AxiosError
        throw axiosError
    }
}

export async function grantAdmin(userId:number): Promise<void> {
    try {
        const permissions = {permissions: ["admin"]}
        await axios.post(environment.backendUrl + "/v1/users/" + userId + "/grant", permissions)
    } catch (error) {
        const axiosError = error as AxiosError
        throw axiosError
    }
}