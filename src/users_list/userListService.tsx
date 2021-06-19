import axios, { AxiosError } from "axios"
import { environment } from "../app/environment/environment"
import { logout } from "../user/userService"
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
        if (axiosError.response && axiosError.response.status === 401) {
            console.log("Denied access")
        }
        throw error
    }
}

export async function disableUser(userId:number): Promise<void> {
    try {
        await axios.post(environment.backendUrl + "/v1/users/" + userId + "/disable")
    } catch (error) {
        const axiosError = error as AxiosError
        if (axiosError.response && axiosError.response.status === 401) {
            alert("No tienes permisos para deshabilitar a este usuario")
        }
        throw error
    }
}

export async function enableUser(userId:number): Promise<void> {
    try {
        await axios.post(environment.backendUrl + "/v1/users/" + userId + "/enable")
    } catch (error) {
        const axiosError = error as AxiosError
        if (axiosError.response && axiosError.response.status === 401) {
            alert("No tienes permisos para habilitar a este usuario")
        }
        throw error
    }
}

export async function revokeAdmin(userId:number): Promise<void> {
    try {
        const permissions = {permissions: ["admin"]}
        await axios.post(environment.backendUrl + "/v1/users/" + userId + "/revoke", permissions)
    } catch (error) {
        const axiosError = error as AxiosError
        if (axiosError.response && axiosError.response.status === 401) {
            alert("No tienes permisos para revocar el permiso de admin de este usuario")
        }
        throw error
    }
}

export async function grantAdmin(userId:number): Promise<void> {
    try {
        const permissions = {permissions: ["admin"]}
        await axios.post(environment.backendUrl + "/v1/users/" + userId + "/grant", permissions)
    } catch (error) {
        const axiosError = error as AxiosError
        if (axiosError.response && axiosError.response.status === 401) {
            alert("No tienes permisos para otorgar el permiso de admin de este usuario")
        }
        throw error
    }
}