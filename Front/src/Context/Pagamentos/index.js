import React, {Children, useState} from "react";

export const PaymentContext = React.createContext();
PaymentContext.displayName = 'Payment';

class payment {
    constructor (carteira, data, value, saldo) {
        this.Carteira = carteira,
        this.Data = data,
        this.Value = value,
        this.Saldo = saldo
    }
}

export const PaymentProvider = ({ children }) => {
    const [history, setHistory] = useState([payment]);

    function addPayment(params) {
        setHistory(
            [
                ...history,
                new payment(
                    params.carteira,
                    params.data, 
                    params.value,
                    params.saldo
                ) 
            ]
        )
    }

    return (
        <PaymentContext.Provider
            value={{
                history,
                setHistory,
                addPayment
            }}
        >
            {children}
        </PaymentContext.Provider>
    )
}