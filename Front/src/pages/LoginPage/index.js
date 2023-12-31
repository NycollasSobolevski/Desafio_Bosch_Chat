import { useState } from 'react'
import './styles.scss'
import UserService from '../../services/user/userService';
import CryptoJS from 'crypto-js';
import Komponentem from '../../components/tooltipComponent'

const LoginPage = () => {
    const [subscribe, setSubscribe] = useState(false);
    const encryptPassword = process.env.REACT_APP_ENCRYPT_DATA_PASSWORD;
    const [tooltip, setTooltip] = useState(
        <Komponentem 
        function={ () => (setShowtooltip(!showTooltip))}
        message='mensagem do pai pro filho testando a funcao'
        showMore='Mostrando mais'
        />
    )
    const [showTooltip, setShowtooltip] = useState(true)

    //!functions
    const Login = async (params) => {
        try {
            const data = {
                emailUser: params.emailUser,
                password: params.password
            }
            const encryptData = CryptoJS.AES.encrypt( JSON.stringify(data), encryptPassword ).toString()
            const body = {
                data : encryptData
            }
            
            const res = await UserService.login(body);
            if (res.status == 200) {
                sessionStorage.setItem('jwt', res.data.token);
            }
            window.location.reload();

        } catch (e) {
        }
    }
    const SignUp = async (params) => {
        try {
            const { username, email, password, repassword } = params;

            if (!username || !email || !password || !repassword)
            {
                window.alert('preenche bobo');

                console.log(alert)
                return
            }

            if (password != repassword)
            {
                window.alert('senha errada bobo');

                console.log(alert)
                return
            }


            const data = {
                name: username,
                pass: password,
                photo: "photo",
                backphoto: "backphoto",
                username: username,
                email: email,
            }

            const encryptData = CryptoJS.AES.encrypt( JSON.stringify(data), encryptPassword ).toString();
            const body = {
                data: encryptData
            }

            const res = await UserService.createUser(body);
            if (res.status == 200)
                window.location.reload()

        } catch (e) {
        }
    }

    const isTooltip = () => {
        if (showTooltip)
            return tooltip
        return <></>
    }

    //!components
    const LoginComponent = () => {
        const [emailUser, setIdentify] = useState('');
        const [password, setPassword] = useState('');
        if (subscribe) return;
        const data = {
            emailUser,
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
                        <button onClick={() => SignUp(data)}>Submit</button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <LoginComponent />
            <SubscribeComponent />
            <div>
                { isTooltip() }
            </div>
        </>
    )
}


export default LoginPage;