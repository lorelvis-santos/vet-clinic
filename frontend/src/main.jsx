import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import AuthLayout from './layout/AuthLayout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import VerifyAccount from './pages/VerifyAccount.jsx';
import { StrictMode } from 'react';

const root = document.getElementById("root");

createRoot(root).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />} /> 
                    <Route path="registrar" element={<Register />} />
                    <Route path="confirmar-cuenta/:token" element={<VerifyAccount />} />
                    <Route path="recuperar-contraseña" element={<ForgotPassword />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
