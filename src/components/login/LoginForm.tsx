"use client"

import { useState } from 'react';
import styles from './LoginForm.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';


import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from 'react-bootstrap/Toast';

const LoginForm = () => {

    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const toggleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3005/auth/login', {username, password});
            const token = response.data.token;
            setUserData(response.data);
            console.log(response.data);
            cleanInputs();
            router.push('/profile');
        } catch (error) {
            console.error('Error en Backend', error);
            cleanInputs();
        }
    };

    const cleanInputs = () => {
        setUsername("");
        setPassword("");
    }
    
    
    
    return (
    <div>
        <div className={styles.container}>
            <form onSubmit={toggleLogin} className={styles.card}>
                <a className={styles.login}>Log in</a>
                <div className={styles.inputBox}>
                    <input type="text" required={true} value={username} onChange={(event) => setUsername(event.target.value)} />
                    <span className={styles.user}>Username</span>
                </div>
                <div className={styles.inputBox}>
                    <input type="password" required={true} value={password} onChange={(event) => setPassword(event.target.value)} />
                    <span>Password</span>
                </div>
                <button type='submit' className={styles.enter}>Enter</button>
            </form>
        </div>

    </div>
    );
};

export default LoginForm;
