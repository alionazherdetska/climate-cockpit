import { BrowserRouter, Route, Routes } from "react-router-dom";
import CongratsSection from "../components/AuthComp/CongratsSection.jsx";
import SignInSection from "../components/AuthComp/SignInSection.jsx";
import SignUpSection from "../components/AuthComp/SignUpSection.jsx";
import VerificationSection from "../components/AuthComp/VerificationSection.jsx";
import Layout from "../components/Layout/Layout.jsx";
import EditProfile from "../components/UserProfile/EditProfile/EditProfile.jsx";
import FindFriends from "../pages/FindFriends.jsx";
import HeroPage from "../pages/HeroPage.jsx";
import NotFound from "../pages/NotFound.jsx";
import PostsPage from "../pages/PostsPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import SolutionsPage from "../pages/SolutionsPage.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import PasswordReset from "../components/AuthComp/PasswordReset.jsx";
import PasswordResetValidation from "../components/AuthComp/PasswordResetValidation.jsx";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HeroPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="signin" element={<SignInSection />} />
          <Route path="signup" element={<SignUpSection />} />
          <Route path="password-reset" element={<PasswordReset />} />
          <Route
            path="password-reset-validation"
            element={<PasswordResetValidation />}
          />
          <Route path="congratulations" element={<CongratsSection />} />
          <Route path="verification" element={<VerificationSection />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/find-friends" element={<FindFriends />} />
          <Route path="/profile/:profileId?" element={<ProfilePage />} />
          <Route path="profile/edit" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
