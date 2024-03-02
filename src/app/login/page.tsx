"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './LoginForm.module.css';
import { Toast } from "react-bootstrap";

const LoginPage = () => {

  const [errors, setErrors] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }
    handleShowToast();
    router.push("/dashboard");
  };

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div>
      <Toast bg='danger' onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide 
        style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '1000' // Asegura que el toast aparezca por encima de otros elementos
          }}>
            <Toast.Header>
                <strong className="me-auto">Alerta</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body><h5>Credenciales incorrectas</h5></Toast.Body>
      </Toast>
      {/*
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="form-control mb-2"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="123123"
          name="password"
          className="form-control mb-2"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
        */}
      <div className={styles.container}>
        <form  onSubmit={handleSubmit} className={styles.card}>
            <a className={styles.login}>Log in</a>
            <div className={styles.inputBox}>
                <input type="text" name="username" required={true} value={username} onChange={(event) => setUsername(event.target.value)} />
                <span className={styles.user}>Username</span>
            </div>
            <div className={styles.inputBox}>
                <input type="password" name="password" required={true} value={password} onChange={(event) => setPassword(event.target.value)} />
                <span>Password</span>
            </div>
            <button type='submit' className={styles.enter}>Enter</button>
        </form>
      </div>

      {errors.length > 0 && (
        <div className="alert alert-danger mt-2">
          <ul className="mb-0">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default LoginPage;
