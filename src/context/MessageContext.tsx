import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

type MessageProps = {
    show: boolean
    message: string
    duration?: number
}

type ContextProps = {
    showMessage: (message: string, duration?: number) => void;
}

const MessageContext = createContext<ContextProps>({} as ContextProps);

export const MessageProvider = ({children}: any) => {    
    const [messageConfig, setMessageConfig] = useState<MessageProps>({} as MessageProps);

    const showMessage = (message: string, duration = 3000) => {
        setMessageConfig({message, duration, show: true})
    }

    const closeMessage = () => {
        setMessageConfig({} as MessageProps);
    }

    return (
        <MessageContext.Provider value={{showMessage}}>
            {children}
            <Snackbar
                open={messageConfig.show}
                autoHideDuration={messageConfig.duration}
                onClose={closeMessage}  
            >
                <Alert
                    onClose={closeMessage}
                    severity="success"
                    variant="filled"                    
                    sx={{ width: '100%', color:'white', fontWeight: 'bold' }}
                >
                    {messageConfig.message}
                </Alert>
            </Snackbar>
        </MessageContext.Provider>
    )
}

export const useMessage = () => {
    return useContext(MessageContext);
}