import * as React from "react";

export interface LoginProps {
  setIsAuthenticated: Function;
  setUser: Function;
}

const Login: React.SFC<LoginProps> = ({ setIsAuthenticated, setUser }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response: Response = await fetch("http://localhost:3000/user/login", {
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (response.status === 200) {
      const res = await response.json();
      setUser(res);
      setIsAuthenticated(true);
    } else {
      alert("NOT VALID LOGIN");
    }
  };

  return (
    <form id="login" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        type="text"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button id="submit-login" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
