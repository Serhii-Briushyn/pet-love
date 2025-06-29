import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import { useAuthInit } from "@hooks/useAuthInit"

import Layout from "@components/Layout"
import PrivateRoute from "@components/PrivateRoute"
import RestrictedRoute from "@components/RestrictedRoute"
import Loader from "@components/Loader/Loader"

const HomePage = lazy(() => import("@pages/HomePage/HomePage"))
const NewsPage = lazy(() => import("@pages/NewsPage/NewsPage"))
const NoticesPage = lazy(() => import("@pages/NoticesPage/NoticesPage"))
const FriendsPage = lazy(() => import("@pages/FriendsPage/FriendsPage"))
const RegisterPage = lazy(() => import("@pages/RegisterPage/RegisterPage"))
const LoginPage = lazy(() => import("@pages/LoginPage/LoginPage"))
const ProfilePage = lazy(() => import("@pages/ProfilePage/ProfilePage"))
const AddPetPage = lazy(() => import("@pages/AddPetPage/AddPetPage"))
const NotFoundPage = lazy(() => import("@pages/NotFoundPage/NotFoundPage"))

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
            <Route
              path="add-pet"
              element={
                <PrivateRoute redirectTo="/">
                  <AddPetPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
