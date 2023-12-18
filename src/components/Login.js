// Login.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import users from "../utils/users";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      onLogin(user);
    } else {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="w-screen flex flex-col justify-center items-center">
     <div className="flex flex-col justify-center items-center space-y-4">
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-lg"
          />
          <button onClick={handleLogin}
          className="gbutton textbutton">Login</button>
        </div>
    </div>
  );
}

export default Login;
