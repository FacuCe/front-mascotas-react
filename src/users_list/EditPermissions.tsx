import React, { useState } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import FormTitle from "../common/components/FormTitle"
import Form from "../common/components/Form"
import GlobalContent from "../common/components/GlobalContent"
import "../styles.css"

function EditPermissions(props: RouteChildrenProps<{ id: string }>) {
    const [permissions, setPermissions] = useState([])
    
    return (
        <GlobalContent>
            <FormTitle>Editar Permisos</FormTitle>
            <Form>
                para cada permiso debo hacer un checkbox
            </Form>
        </GlobalContent>
    )
}

export default EditPermissions
