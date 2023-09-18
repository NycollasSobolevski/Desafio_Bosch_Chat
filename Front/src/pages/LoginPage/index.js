import { useCallback, useState } from 'react'
import './styles.scss'
import UserService from '../../services/user/user.service';
import CryptoJS from 'crypto-js';
import axios from "axios";

const LoginPage = () => {
    const [subscribe, setSubscribe] = useState(false);

    //!functions
    const Login = async (params) => {
        const sla = await UserService.login(params);
        console.log(sla);

        if (sla.status == 200) {
            sessionStorage.setItem('jwt', sla.data);
        }
        window.location.reload();
    }
    const SignUp = async (params) => {
        const { username, email, password, repassword } = params;
        if (password != repassword) return;
        const data = {
            name: username,
            pass: password,
            photo: "photo",
            backphoto: "backphoto",
            username: username,
            email: email,
            //!test area 
            verbose: true
        }
        const encryptPassword = process.env.REACT_APP_ENCRYPT_DATA_PASSWORD;
        const encryptData = CryptoJS.AES.encrypt( JSON.stringify(data), encryptPassword ).toString();
        const body = {
            data: encryptData
        }
        try {
            const res = await UserService.createUser(body);
            console.log(res);

        }
        catch (exp) {
            console.log(exp);
        }
    }


    //!components
    const LoginComponent = () => {
        const [identify, setIdentify] = useState('');
        const [password, setPassword] = useState('');
        if (subscribe) return;
        const data = {
            identify,
            password
        }
        return (
            <>
                <div className={"Container"}>
                    <span className={"input_container"}>
                        <label htmlFor="user-login">Login *</label>
                        <input type="text" id='user-login' onChange={(e) => setIdentify(e.target.value)} className={"input"} />
                    </span>
                    <span className={"input_container"}>
                        <label htmlFor="user-password">Password *</label>
                        <input type="password" id='user-password' onChange={(e) => setPassword(e.target.value)} className={"input"} />
                    </span>
                    <div className={"ButtonSession"}>
                        <button onClick={() => Login(data)}>Login</button>
                        <button onClick={() => setSubscribe(true)}>Subscribe</button>
                    </div >
                </div>
            </>
        )
    }

    const SubscribeComponent = () => {
        const [username, setUser] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [repassword, setRepassword] = useState('');

        const data = {
            username,
            email,
            password,
            repassword
        }

        if (!subscribe) return
        return (
            <>
                <div className={"Container"}>
                    <span className={"input_container"}>
                        <label htmlFor="subscribe-username">Username *</label>
                        <input type="text" id='subscribe-username' className={"input"} onChange={(e) => setUser(e.target.value)} />
                    </span>
                    <span className={"input_container"}>
                        <label htmlFor="subscribe-email">Email *</label>
                        <input type="email" id='subscribe-email' className={"input"} onChange={(e) => setEmail(e.target.value)} />
                    </span>
                    <span className={"input_container"}>
                        <label htmlFor="subscribe-password ">Password  *</label>
                        <input type="password" id='subscribe-password' className={"input"} onChange={(e) => setPassword(e.target.value)} />
                    </span>
                    <span className={"input_container"}>
                        <label htmlFor="subscribe-repassword">Password *</label>
                        <input type="password" id='subscribe-repassword' className={"input"} onChange={(e) => setRepassword(e.target.value)} />
                    </span>
                    <div className={"ButtonSession"}>
                        <button onClick={() => setSubscribe(false)}>Login</button>
                        <button type="submit" onClick={() => SignUp(data)}>Submit</button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <LoginComponent />
            <SubscribeComponent />
        </>
    )
}


export default LoginPage;