import React, { lazy, Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import LoadingSpinner from "./Common/LoadingSpinner";
import { HideFooterForAdmin } from "./util/commonUtil";
import SkeletonPage from "./Common/Skeltons/SkeletonPage";
import Footer from "./Common/Footer/Footer";
import Header from "./Common/Header/Header";
import TopStrip from "./Common/Header/TopStrip";
import ProtectedRoute from "./Frontend_Views/Routes/ProtectedRoute";
import AdminProtectedRoute from "./Frontend_Views/Routes/AdminProtectedRoute";

// Themes
import ThemeOne from "./Common/StyledThemes/ThemeOne.json";
import { GlobalStyles } from "./Common/StyledComponents/GlobalStyles";

// CSS
import "./App.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import Advertisement from "./Common/Advertisement/Advertisement";
import ScrollToTop from "react-scroll-to-top";
import ThemeSwitcher from "./themes/ThemeSwitcher";

// Lazy Loading

const HPRHome = lazy(() => import("./Frontend_Views/Pages/HPR-Home"));

const PageNotFound = lazy(
  () => import("./Frontend_Views/Pages/404/PageNotFound")
);
const Home = lazy(() => import("./Frontend_Views/Pages/Home/index"));
const About = lazy(() => import("./Frontend_Views/Pages/About/About"));
const Contact = lazy(() => import("./Frontend_Views/Pages/Contact/Contact"));
const Services = lazy(() => import("./Frontend_Views/Pages/Services/Services"));
const Products = lazy(() => import("./Frontend_Views/Pages/Products/index"));
const ProductDetails = lazy(
  () => import("./Frontend_Views/Pages/Products/ProductDetails")
);
const ClientsList = lazy(
  () => import("./Frontend_Views/Pages/Clients/ClientsList")
);
const Careers = lazy(() => import("./Frontend_Views/Pages/Careers/Careers"));
const CareerDetails = lazy(
  () => import("./Frontend_Views/Pages/Careers/career-details")
);
const Team = lazy(() => import("./Frontend_Views/Pages/Teams/Team"));
const Projects = lazy(() => import("./Frontend_Views/Pages/Projects/Projects"));
const ProjectsGallery = lazy(
  () => import("./Frontend_Views/Pages/Projects/ProjectsGallery")
);
const ProjectTabs = lazy(
  () => import("./Frontend_Views/Components/ProjectsTabs/ProjecTabs")
);

const ImagesGallery = lazy(
  () => import("./Frontend_Views/Pages/Gallery/ImagesGallery")
);
const VideosGallery = lazy(
  () => import("./Frontend_Views/Pages/Gallery/VideosGallery")
);
const CaseStudies = lazy(
  () => import("./Frontend_Views/Pages/Casestudies/CaseStudies")
);
const CaseStudiesDetails = lazy(
  () => import("./Frontend_Views/Pages/Casestudies/caseStudies-details")
);
const NewsAndUpdates = lazy(
  () => import("./Frontend_Views/Pages/News/NewsAndUpdates")
);
const TestimonialsList = lazy(
  () => import("./Frontend_Views/Pages/Testimonials/TestimonialsList")
);

const Login = lazy(() => import("./Frontend_Admin/Pages/Auth/Login"));
const Registration = lazy(
  () => import("./Frontend_Admin/Pages/Auth/Registration")
);
const ChangePassword = lazy(
  () => import("./Frontend_Admin/Pages/Auth/ChangePassword")
);
const ResetPassword = lazy(
  () => import("./Frontend_Admin/Pages/Auth/ResetPassword")
);
const ResetPasswordConfirmation = lazy(
  () => import("./Frontend_Admin/Pages/Auth/ResetPasswordConfirmation")
);
const Activation = lazy(() => import("./Frontend_Admin/Pages/Auth/Activation"));
const ResendActivationEmail = lazy(
  () => import("./Frontend_Admin/Pages/Auth/ResendActivationEmail")
);
// const Dashboard = lazy(
//   () => import("./Frontend_Admin/Pages/Login/Dashboard_V1")
// );
const Dashboard = lazy(
  () => import("./Frontend_Admin/Pages/Login/Dashboard_V2")
);
const UserAdmin = lazy(() => import("./Frontend_Admin/Pages/Auth/UserAdmin"));
const Themes = lazy(() => import("./Frontend_Admin/Pages/Auth/Themes"));
const UnauthorizedPage = lazy(
  () => import("./Frontend_Admin/Pages/Login/UnauthorizedPage")
);
const AuthForm = lazy(() => import("./Frontend_Admin/Pages/Auth/AuthForm"));
const AddProject = lazy(
  () => import("./Frontend_Admin/Pages/Login/AddProject")
);
const AdminNews = lazy(() => import("./Frontend_Admin/Pages/Login/AdminNews"));
const ContactUSAdmin = lazy(
  () => import("./Frontend_Admin/Pages/Auth/ContactUSAdmin")
);
const PagesConfiguration = lazy(
  () => import("./Frontend_Admin/Pages/Auth/PagesConfiguration")
);
const UserPagePermission = lazy(
  () => import("./Frontend_Admin/Pages/Auth/UserPagePermission")
);
const AdminTestimonial = lazy(
  () => import("./Frontend_Admin/Pages/Login/AdminTestimonial")
);

const AdminSettings = lazy(
  () => import("./Frontend_Admin/Pages/Auth/AdminSettings")
);

function App() {
  const { isLoading } = useSelector((state) => state.loader);

  const isHideMenu = HideFooterForAdmin();
  const [flashAdd, setFlashAdd] = useState(false);

  // useEffect(() => {
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);
  // const handleContextMenu = (e) => {
  //   e.preventDefault();
  //   toast.error("Right Click is diabled");
  // };

  useEffect(() => {
    setFlashAdd(false);
  }, []);

  // Google Language Translator

  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       autoDisplay: false,
  //     },
  //     "google_translate_element"
  //   );
  // };
  // useEffect(() => {
  //   var addScript = document.createElement("script");
  //   addScript.setAttribute(
  //     "src",
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //   );
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = googleTranslateElementInit;
  // }, []);

  // End of Google Language Translator

  return (
    <>
      {/* Google Language Translator */}
      {/* <div id="google_translate_element"></div> */}
      {/* End of Google Language Translator */}

      {flashAdd && <Advertisement setFlashAdd={setFlashAdd} />}

      <GlobalStyles />
      <BrowserRouter>
        {isLoading ? <LoadingSpinner /> : ""}
        <TopStrip />
        <Header />

        <Suspense fallback={<SkeletonPage />}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/admin/change_password"
                element={<ChangePassword />}
              />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/contactUSList" element={<ContactUSAdmin />} />
            </Route>

            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin/userAdmin" element={<UserAdmin />} />
              <Route path="/admin/theme" element={<Themes />} />
              <Route
                path="/admin/userPermission"
                element={<UserPagePermission />}
              />
              <Route
                path="/admin/adminPagesConfiguration"
                element={<PagesConfiguration />}
              />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/hpr-home" element={<HPRHome />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories/:id" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:uid" element={<Services />} />
            <Route path="/clients/clients" element={<ClientsList />} />
            <Route path="/profile/careers" element={<Careers />} />
            <Route path="/career-details/:id" element={<CareerDetails />} />
            <Route path="/profile/team" element={<Team />} />
            <Route path="/projects/projects" element={<Projects />} />
            <Route path="/project-details" element={<ProjectTabs />} />
            <Route
              path="/projects/projectgallery"
              element={<ProjectsGallery />}
            />
            <Route path="/gallery/imagegallery" element={<ImagesGallery />} />
            <Route path="/gallery/videogallery" element={<VideosGallery />} />
            <Route path="/clients/casestudies" element={<CaseStudies />} />
            <Route
              path="/clients/casestudies-details/:id"
              element={<CaseStudiesDetails />}
            />
            <Route path="/profile/news" element={<NewsAndUpdates />} />
            <Route
              path="/profile/testimonials"
              element={<TestimonialsList />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route
              path="/password/reset/:uid/:token"
              element={<ResetPasswordConfirmation />}
            />
            <Route path="/activate/:uid/:token" element={<Activation />} />
            <Route
              path="/resend_activation"
              element={<ResendActivationEmail />}
            />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/authForm" element={<AuthForm />} />
            <Route path="/addproject" element={<AddProject />} />
            <Route path="/editproject/:id" element={<AddProject />} />
            <Route path="/adminNews" element={<AdminNews />} />
            <Route path="/profile/testimonial" element={<AdminTestimonial />} />
          </Routes>
        </Suspense>

        {!isHideMenu && <Footer />}
      </BrowserRouter>

      <ToastContainer autoClose={2000} theme="colored" />
      <ScrollToTop
        smooth
        color="#fff"
        height="20"
        className="shadow rounded-circle scrollTop"
      />
    </>
  );
}

export default App;
