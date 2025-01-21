import '../App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../functions/authProvider';

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:4000/api/user/login`, { email, password });
            setToken(response.data.token);
            navigate("/home", { replace: true });
        } catch (error) {
          setError(error.response?.data?.error || 'Login failed');
        }
    };
  
    return (
    <div className="App h-screen flex items-center justify-center bg-gray-100">
    <div className="border-box flex items-center justify-center h-[60%] w-[40%] bg-gray-50 shadow-lg rounded-md">
      <div className="flex flex-col items-center w-full">
        <form className="loginForm bg-gray-100 p-6 rounded-md shadow-md w-full" onSubmit={handleLogin}>
          <div className="flex flex-col gap-4">
            <div className="inline-block">
              <label htmlFor="loginEmail">E-mail:</label>
            </div>
            <div className="inline-block">
              <input
                type="text"
                name="loginEmail"
                placeholder="Insira seu email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="inline-block">
              <label htmlFor="loginPassword">Senha:</label>
            </div>
            <div className="inline-block">
              <input
                type="password"
                name="loginPassword"
                placeholder="********"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white p-2 rounded hover:bg-gray-500 w-full"
          >
              Sign In
          </button>

            <div className="mt-4 relative p-2">
              <a href="#" className="text-black hover:underline">
                Forgot password?
              </a>
              <a href="/cadastro" className="text-black hover:underline absolute right-0">
                Cadastrar-se
              </a>
            </div>
          </div>
        </form>
        {/* Link para a página home */}
        <a href="/home" className="mt-4 text-blue-500 hover:underline">
          Teste
        </a>
      </div>

    </div>
  </div>
  )
  };
  
  export default Login;