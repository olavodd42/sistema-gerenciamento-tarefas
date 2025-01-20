import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './paginas/home';
import Today from './paginas/today';
import ThisWeek from './paginas/thisweek';
import ThisMonth from './paginas/thismonth';
import Cadastro from './paginas/cadastro';

function App() {
  return (
    <Router>
      {/* As rotas serão gerenciadas aqui */}
      <Routes>
        {/* Rota padrão renderiza o formulário de login */}
        <Route
          path="/"
          element={
            <div className="App h-screen flex items-center justify-center bg-gray-100">
              <div className="border-box flex items-center justify-center h-[60%] w-[40%] bg-gray-50 shadow-lg rounded-md">
                <div className="flex flex-col items-center w-full">
                  <form className="loginForm bg-gray-100 p-6 rounded-md shadow-md w-full">
                    <div className="flex flex-col gap-4">
                      <div className="inline-block">
                        <label htmlFor="loginEmail">E-mail:</label>
                      </div>
                      <div className="inline-block">
                        <input
                          type="text"
                          name="loginEmail"
                          placeholder="Insira seu email"
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
                          placeholder="Insira a senha"
                          className="border border-gray-300 p-2 rounded w-full"
                        />
                      </div>
                      <a href="/home" className="mt-4 text-blue-500 hover:underline">
                      <button
                        type="submit"
                        className="bg-black text-white p-2 rounded hover:bg-gray-500 w-full"
                      >
                        Sign In
                      </button>
                      </a>
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
          }
        />
        {/* Rota para a página home */}
        <Route path="/home" element={<Home />} />
        {/* Rota para a página today */}
        <Route path="/today" element={<Today />} />
        <Route path="/thisweek" element={<ThisWeek />} />
        <Route path="/thismonth" element={<ThisMonth />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
