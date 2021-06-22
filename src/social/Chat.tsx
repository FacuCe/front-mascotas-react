import React, { useEffect, useState } from 'react'
import DangerLabel from '../common/components/DangerLabel'
import Form from '../common/components/Form'
import FormAcceptButton from '../common/components/FormAcceptButton'
import FormButtonBar from '../common/components/FormButtonBar'
import FormInput from '../common/components/FormInput'
import { useErrorHandler } from '../common/utils/ErrorHandler'
import { useSessionUser } from '../store/userStore'
import { loadMessages, Message, sendMessage } from './friendListService'

function Chat(params: {friendLogin:string}) {

    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState("")
    const user = useSessionUser()
    const errorHandler = useErrorHandler()

    const loadChat = async (login:string) => {
        try {
            const res = await loadMessages(login)
            setMessages(res)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const sendMsg = async () => {
        if (!newMessage) {
            errorHandler.addError("mensaje", "No puede estar vacío")
        }

        if (errorHandler.hasErrors()) {
            return
        }

        try {
            await sendMessage(params.friendLogin, newMessage)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    // Falta implementar un useEffect para recargar el chat cada 3 segundos

    useEffect(() => {
        void loadChat(params.friendLogin)
    }, [params.friendLogin])

    useEffect(() => {
        let timerID = setInterval( () => loadChat(params.friendLogin), 3000 );
        return function cleanup() {
            clearInterval(timerID);
        };
    })

    return (
        <div>
            <DangerLabel message={errorHandler.errorMessage} />
            <div className="d-flex flex-column bg-light p-4 my-4">
                {
                    messages.map((msg, index) => {
                        if (user?.name === msg.from) {
                            return (
                                <div className="align-self-end bg-info p-3 my-2 mw-100 text-break text-wrap rounded" key={index}>
                                    <span className="font-weight-bold">{msg.from}: </span>
                                    <span>{msg.content}</span>
                                    <div className="d-flex justify-content-between text-light">
                                        <div className="mr-3">
                                            {parseInt(msg.created_at.substr(11,2))-3}{msg.created_at.substr(13,3)}
                                        </div>
                                        <div>
                                            {msg.created_at.substr(8,2)}-{msg.created_at.substr(5,2)}-{msg.created_at.substr(0,4)}
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="align-self-start bg-dark text-light p-3 my-2 mw-100 text-break text-wrap rounded" key={index}>
                                    <span className="font-weight-bold">{msg.from}: </span>
                                    <span>{msg.content}</span>
                                    <div className="d-flex justify-content-between text-light">
                                        <div className="mr-3">
                                            {parseInt(msg.created_at.substr(11,2))-3}{msg.created_at.substr(13,3)}
                                        </div>
                                        <div>
                                            {msg.created_at.substr(8,2)}-{msg.created_at.substr(5,2)}-{msg.created_at.substr(0,4)}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <Form>
                <FormInput
                    label="Nuevo Mensaje"
                    name="message"
                    errorHandler={errorHandler}
                    onChange={(event) => setNewMessage(event.target.value)}
                />

                <FormButtonBar>
                    <FormAcceptButton label="Enviar Mensaje" onClick={sendMsg} />
                </FormButtonBar>
            </Form >
        </div>
    )
}

export default Chat
