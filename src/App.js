import AuthRouter from './Router'
import AuthProvider from "./functions/authProvider";

const App = ()=> {

  return (
    <AuthProvider>
      <AuthRouter />
    </AuthProvider>
  );
}

export default App;
