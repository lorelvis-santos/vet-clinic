import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <main className="container mx-auto grid md:grid-cols-2 mt-4 gap-10 p-5 h-full items-center">
      <Outlet />
    </main>
  )
}

export default AuthLayout