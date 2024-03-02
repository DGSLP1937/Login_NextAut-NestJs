"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RegisterForm.module.css';
import { Toast } from "react-bootstrap";

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div>
      {/* 
      <h1>Register</h1>
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
          type="email"
          placeholder="email@test.com"
          name="email"
          className="form-control mb-2"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="form-control mb-2"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
        >
          Register
        </button>
      </form>
      */}
      <div className={styles.container}>
        <form  onSubmit={handleSubmit} className={styles.card}>
            <a className={styles.register}>Register</a>
            <div className={styles.inputBox}>
                <input type="text" name="username" required={true} value={username} onChange={(event) => setUsername(event.target.value)} />
                <span className={styles.user}>Username</span>
            </div>
            <div className={styles.inputBox}>
                <input type="password" name="password" required={true} value={password} onChange={(event) => setPassword(event.target.value)} />
                <span>Password</span>
            </div>
            <div className={styles.inputBox}>
                <input type="email" name="email" required={true} value={email} onChange={(event) => setEmail(event.target.value)} />
                <span>Email</span>
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
export default RegisterPage;
