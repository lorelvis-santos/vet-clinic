import { BrowserRouter, Routes, Route } from "react-router";

// Layouts
import AuthLayout from './layout/AuthLayout.jsx';
import AdminLayout from "./layout/AdminLayout.jsx";

// Authentication pages
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import VerifyAccount from './pages/auth/VerifyAccount.jsx';
import SetNewPassword from "./pages/auth/SetNewPassword.jsx";

// Admin pages
import Patients from "./pages/admin/Patients.jsx";
import Profile from "./pages/admin/Profile.jsx";
import ChangePassword from "./pages/admin/ChangePassword.jsx";

import { AuthProvider } from "./context/AuthProvider.jsx";
import { PatientsProvider } from "./context/PatientsProvider.jsx";

function App() {
    return (
        <AuthProvider>
            <PatientsProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<AuthLayout />}>
                            <Route index element={<Login />} /> 
                            <Route path="registrar" element={<Register />} />
                            <Route path="confirmar-cuenta/:token" element={<VerifyAccount />} />
                            <Route path="recuperar-contraseña" element={<ForgotPassword />} />
                            <Route path="recuperar-contraseña/:token" element={<SetNewPassword />} />
                        </Route>

                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Patients />} />
                            <Route path="perfil" element={<Profile />} />
                            <Route path="cambiar-contraseña" element={<ChangePassword />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PatientsProvider>
        </AuthProvider>
    )
}

export default App
