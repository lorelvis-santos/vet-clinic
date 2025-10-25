import { BrowserRouter, Routes, Route } from "react-router";
import AuthLayout from './layout/AuthLayout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import VerifyAccount from './pages/VerifyAccount.jsx';
import ChangePassword from "./pages/ChangePassword.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />} /> 
                    <Route path="registrar" element={<Register />} />
                    <Route path="confirmar-cuenta/:token" element={<VerifyAccount />} />
                    <Route path="recuperar-contraseña" element={<ForgotPassword />} />
                    <Route path="recuperar-contraseña/:token" element={<ChangePassword />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
