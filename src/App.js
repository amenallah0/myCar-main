import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
import { UserProvider, useUser } from './contexts/userContext';
import AdminDashboard from './components/admin/AdminDashboard';
import ExpertiseRequests from './components/ExpertiseRequests';
import ExpertReport from './components/ExpertReport';
import 'bootstrap/dist/css/bootstrap.min.css';
import MySentRequests from './components/MySentRequests';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailed from './components/PaymentFailed';
import ExpertInbox from './components/ExpertInbox';
import ViewReport from './components/ViewReport';
import Login from './contexts/Login';
import SignIn from "./components/SignIn";
import { NotificationProvider } from './contexts/NotificationContext';
import setupAxiosInterceptors from './services/axiosConfig';
import ResetPassword from './components/ResetPassword';

// Composant pour les routes protégées
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();

  // Si en cours de chargement, ne rien afficher ou afficher un loader
  if (isLoading) {
    return null; // ou votre composant de chargement
  }

  // Rediriger vers signin si non authentifié
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

// Composant pour les routes publiques (inverse de PrivateRoute)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  // Rediriger vers dashboard si déjà authentifié
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const { logout, user, isAuthenticated } = useUser();

  useEffect(() => {
    setupAxiosInterceptors(logout);
  }, [logout]);

  return (
    <UserProvider>
      <NotificationProvider>
        <Router>
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
            <Route exact path="/signUp" element={<SignUpPage />} />
            <Route path="/signin" element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            } />
            <Route path="/reset-password" element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            } />
            <Route path="/profile/:username" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          <Route path="/AddCar" element={<AddCarPage />} />
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="/admin/dashboard" element={
              isAuthenticated && user && (user.role === 'ROLE_ADMIN' || user.role === 'ADMIN')
                ? <AdminDashboard />
                : <Navigate to="/signin" />
            } />
            <Route path="/expertise-requests" element={
              <PrivateRoute>
                <ExpertiseRequests />
              </PrivateRoute>
            } />
          <Route path="/expert-report/:requestId" element={<ExpertReport />} />
          <Route path="/my-sent-requests" element={<MySentRequests />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/expert-inbox" element={
              <PrivateRoute>
                <ExpertInbox />
              </PrivateRoute>
            } />
          <Route path="/view-report/:id" element={<ViewReport />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Router>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;
