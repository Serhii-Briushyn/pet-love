import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Layout from "@components/Layout"
import RestrictedRoute from "@components/RestrictedRoute"
import HomePage from "@pages/HomePage/HomePage"
import NewsPage from "@pages/NewsPage/NewsPage"
import NoticesPage from "@pages/NoticesPage/NoticesPage"
import FriendsPage from "@pages/FriendsPage/FriendsPage"
import RegisterPage from "@pages/RegisterPage/RegisterPage"
import LoginPage from "@pages/LoginPage/LoginPage"
import Loader from "@components/Loader/Loader"
import { useAuthInit } from "@hooks/useAuthInit"
import ProfilePage from "@pages/ProfilePage/ProfilePage"
import PrivateRoute from "@components/PrivateRoute"

function App() {
  useAuthInit()

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="notices" element={<NoticesPage />} />
            <Route path="friends" element={<FriendsPage />} />
            <Route
              path="register"
              element={
                <RestrictedRoute redirectTo="/">
                  <RegisterPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute redirectTo="/">
                  <LoginPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute redirectTo="/">
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>
        </Routes>
      </Suspense>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
