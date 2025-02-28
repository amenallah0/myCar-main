import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import ScrollToTop from "react-scroll-to-top";
import AboutPage from "./pages/AboutPage";
import ServicePage from "./pages/ServicePage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import ProjectPage from "./pages/ProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import TeamPage from "./pages/TeamPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import ShopPage from "./pages/ShopPage";
import ShopDetailsPage from "./pages/ShopDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishlistPage from "./pages/WishlistPage";
import ContactPage from "./pages/ContactPage";
import HomePageSix from "./pages/HomePageSix";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Profile from './pages/ProfilePage';
import AddCarPage from "./pages/AddCarPage";
import { UserProvider } from './contexts/userContext';
import AdminDashboard from './components/admin/AdminDashboard';
import ExpertiseRequests from './components/ExpertiseRequests';
import ExpertReport from './components/ExpertReport';
import 'bootstrap/dist/css/bootstrap.min.css';
import MySentRequests from './components/MySentRequests';


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <RouteScrollToTop />
        <ScrollToTop smooth color="#E8092E" />
        <Routes>
          <Route exact path="/" element={<HomePageSix />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/service" element={<ServicePage />} />
          <Route exact path="/service-details" element={<ServiceDetailsPage />} />
          <Route exact path="/project" element={<ProjectPage />} />
          <Route exact path="/project-details" element={<ProjectDetailsPage />} />
          <Route exact path="/blog" element={<BlogPage />} />
          <Route exact path="/blog-details" element={<BlogDetailsPage />} />
          <Route exact path="/team" element={<TeamPage />} />
          <Route exact path="/team-details" element={<TeamDetailsPage />} />
          <Route exact path="/shop" element={<ShopPage />} />
          <Route exact path="/shop-details/:id" element={<ShopDetailsPage />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route exact path="/wishlist" element={<WishlistPage />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route exact path="/SignUp" element={<SignUpPage />} />
          <Route exact path="/SignIn" element={<SignInPage />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/AddCar" element={<AddCarPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/my-expertise-requests" element={<ExpertiseRequests />} />
          <Route path="/expert-report/:requestId" element={<ExpertReport />} />
          <Route path="/my-sent-requests" element={<MySentRequests />} />

        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
