import React, { useState } from "react";


export const AlertContext = React.createContext();
AlertContext.displayName = 'Alert';


export const AlertProvider = ({ children }) => {
    const [show, setShow] = useState(false);

    return (
        <AlertContext.Provider
            value={{
                show,
                setShow
            }}
        >
            {children}
        </AlertContext.Provider>
    )
}