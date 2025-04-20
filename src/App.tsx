import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "components/Layout";
import RestrictedRoute from "components/RestrictedRoute";
// import { RestrictedRoute } from "components/RestrictedRoute"
import LoginPage from "pages/LoginPage/LoginPage";
import MainPage from "pages/MainPage/MainPage";
import RegisterPage from "pages/RegisterPage/RegisterPage";
import HomePage from "pages/HomePage/HomePage";
import { useAuthInit } from "hooks/useAuthInit";
import Loader from "components/Loader/Loader";
import NewsPage from "pages/NewsPage/NewsPage";

function App() {
  useAuthInit();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            {/* <Route path="notices" element={<NoticesPage />} /> */}
            {/* <Route path="friends" element={<FriendsPage />} /> */}
            {/* Restricted routes for unauthorized only */}
            {/* <Route element={<RestrictedRoute redirectTo="/profile" />}>
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
            </Route> */}
            <Route
              path="register"
              element={
                <RestrictedRoute redirectTo="/home">
                  <RegisterPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute redirectTo="/home">
                  <LoginPage />
                </RestrictedRoute>
              }
            />
            ы
            {/* <Route element={<PrivateRoute redirectTo="/login" />}>
              <Route path="profile" element={<ProfilePage />} />
            </Route> */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>
        </Routes>
      </Suspense>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
