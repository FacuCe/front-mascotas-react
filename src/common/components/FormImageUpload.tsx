import React, { useEffect, useState } from "react"
import { getImage } from "../../profile/profileService"
import { ErrorHandler } from "../utils/ErrorHandler"
import ErrorLabel from "./ErrorLabel"
import ImageUpload from "./ImageUpload"
import { useErrorHandler } from "../utils/ErrorHandler"


export default function FromImageUpload(props: {
  picture: string
  name: string
  errorHandler: ErrorHandler
  onImageChanged: (image: string) => any
}) {

  const errorHandler = useErrorHandler()
  const defaultImage = '/assets/profile.png'
  const [img, setImg] = useState('')

  const imageLoad = async (params:string) => {
    try {
      const res = await getImage(params)
      setImg(res.description)
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }

  useEffect(
    () => {imageLoad(props.picture)}
  )

  return (
    <div className="form-group">
      <label>Profile Picture</label>
      <ImageUpload
        src={ img ? img : defaultImage }
        onChange={props.onImageChanged}
      />
      <ErrorLabel message={props.errorHandler.getErrorText("image")} />
    </div>
  )
}
