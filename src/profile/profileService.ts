import axios, { AxiosError } from "axios"
import { environment } from "../app/environment/environment"
import { logout } from "../user/userService"

interface Profile {
  name: string
  phone: string
  email: string
  address: string
  province: string
  picture: string
}

export async function updateBasicInfo(params: {
  name: string
  phone: string
  email: string
  address: string
  province: string
}): Promise<Profile> {
  try {
    const res = (
      await axios.post(environment.backendUrl + "/v1/profile", params)
    ).data as Profile
    return res
  } catch (err) {
    if ((err as AxiosError).code === "401") {
      void logout()
    }
    throw err
  }
}

interface UpdateProfileImageId {
  id: string
}

export async function updateProfilePicture(params: {
  image: string
}): Promise<UpdateProfileImageId> {
  return (
    await axios.post(environment.backendUrl + "/v1/profile/picture", params)
  ).data as UpdateProfileImageId
}

export async function getCurrentProfile(): Promise<Profile> {
  try {
    return (await axios.get(environment.backendUrl + "/v1/profile"))
      .data as Profile
  } catch (err) {
    const axiosError = err as AxiosError
    if (axiosError.response && axiosError.response.status === 401) {
      void logout()
    }
    throw err
  }
}

export interface Image {
  name: string
  type: string
  description: string //image base64
}

export async function getImage(id:string): Promise<Image> {
  try {
    return (await axios.get(environment.backendUrl + "/v1/image/" + id)).data as Image
  } catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response && axiosError.response.status === 401) {
      void logout()
    }
    throw error
  }
}