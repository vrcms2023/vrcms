import React, { lazy, Suspense, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import _ from "lodash";
import { ThemeProvider } from "styled-components";

// Components
import LoadingSpinner from "./Common/LoadingSpinner";
import { isNotEmptyObject, NO_FOOTER_ROUTES, NO_HEADER_ROUTES } from "./util/commonUtil";
import SkeletonPage from "./Common/Skeltons/SkeletonPage";
import Footer from "./Common/Footer/Footer";
import Header from "./Common/Header/Header";
import TopStrip from "./Common/Header/TopStrip";
import ProtectedRoute from "./Frontend_Views/Routes/ProtectedRoute";
import AdminProtectedRoute from "./Frontend_Views/Routes/AdminProtectedRoute";

// Themes
import ThemeOne from "./Common/StyledThemes/ThemeOne.json";
import ThemeTwo from "./Common/StyledThemes/ThemeTwo.json";
import { GlobalStyles } from "./Common/StyledComponents/GlobalStyles";

// CSS
import "./App.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import Advertisement from "./Common/Advertisement/Advertisement";
import ScrollToTop from "react-scroll-to-top";
import ThemeSwitcher from "./themes/ThemeSwitcher";
import { getCookie } from "./util/cookieUtil";
import SEO from "./Common/SEO";
import { getAllShowHideComponentsList } from "./redux/showHideComponent/showHideActions.js";
import { getObjectsByKey } from "./util/showHideComponentUtil.js";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Lazy Loading

const HPRHome = lazy(() => import("./Frontend_Views/Pages/HPR-Home"));

const PageNotFound = lazy(() => import("./Frontend_Views/Pages/404/PageNotFound"));
const Home = lazy(() => import("./Frontend_Views/Pages/Home/index"));
const About = lazy(() => import("./Frontend_Views/Pages/About/About"));
const WhyChooseUs = lazy(() => import("./Frontend_Views/Pages/whychooseus/whychooseus.jsx"));
const Contact = lazy(() => import("./Frontend_Views/Pages/Contact/Contact"));
const Services = lazy(() => import("./Frontend_Views/Pages/Services/Services"));
const Products = lazy(() => import("./Frontend_Views/Pages/Products/index"));
const ProductDetails = lazy(() => import("./Frontend_Views/Pages/Products/ProductDetails"));
const ClientsList = lazy(() => import("./Frontend_Views/Pages/Clients/ClientsList"));
const Careers = lazy(() => import("./Frontend_Views/Pages/Careers/Careers"));
const CareerDetails = lazy(() => import("./Frontend_Views/Pages/Careers/career-details"));
const Team = lazy(() => import("./Frontend_Views/Pages/Teams/Team"));
const Projects = lazy(() => import("./Frontend_Views/Pages/Projects/Projects"));
const ProjectsGallery = lazy(() => import("./Frontend_Views/Pages/Projects/ProjectsGallery"));
const ProjectTabs = lazy(() => import("./Frontend_Views/Components/ProjectsTabs/ProjecTabs"));

const ImagesGallery = lazy(() => import("./Frontend_Views/Pages/Gallery/ImagesGallery"));
const VideosGallery = lazy(() => import("./Frontend_Views/Pages/Gallery/VideosGallery"));
const CaseStudies = lazy(() => import("./Frontend_Views/Pages/Casestudies/CaseStudies"));
const CaseStudiesDetails = lazy(
  () => import("./Frontend_Views/Pages/Casestudies/caseStudies-details")
);
const NewsAndUpdates = lazy(() => import("./Frontend_Views/Pages/News/NewsAndUpdates"));
const TestimonialsList = lazy(() => import("./Frontend_Views/Pages/Testimonials/TestimonialsList"));

const Login = lazy(() => import("./Frontend_Admin/Pages/Auth/Login"));
const Registration = lazy(() => import("./Frontend_Admin/Pages/Auth/Registration"));
const ChangePassword = lazy(() => import("./Frontend_Admin/Pages/Auth/ChangePassword"));
const ResetPassword = lazy(() => import("./Frontend_Admin/Pages/Auth/ResetPassword"));
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
const Dashboard = lazy(() => import("./Frontend_Admin/Pages/Login/Dashboard_V2"));
const UserAdmin = lazy(() => import("./Frontend_Admin/Pages/Auth/UserAdmin"));
const Themes = lazy(() => import("./Frontend_Admin/Pages/Auth/Themes"));
const UnauthorizedPage = lazy(() => import("./Frontend_Admin/Pages/Login/UnauthorizedPage"));
const AuthForm = lazy(() => import("./Frontend_Admin/Pages/Auth/AuthForm"));
const AddProject = lazy(() => import("./Frontend_Admin/Pages/Login/AddProject"));
const ProjectCategory = lazy(() => import("./Frontend_Admin/Pages/Login/ProjectCategory"));
const AdminNews = lazy(() => import("./Frontend_Admin/Pages/Login/AdminNews"));
const ContactUSAdmin = lazy(() => import("./Frontend_Admin/Pages/Auth/ContactUSAdmin"));
const PagesConfiguration = lazy(() => import("./Frontend_Admin/Pages/Auth/PagesConfiguration"));
const UserPagePermission = lazy(() => import("./Frontend_Admin/Pages/Auth/UserPagePermission"));
const AdminTestimonial = lazy(() => import("./Frontend_Admin/Pages/Login/AdminTestimonial"));

const AdminSettings = lazy(() => import("./Frontend_Admin/Pages/Auth/AdminSettings"));

const RAQAdmininistration = lazy(() => import("./Frontend_Admin/Pages/Auth/RAQAdmininistration"));
const AppliedJobAdministration = lazy(
  () => import("./Frontend_Admin/Pages/Auth/AppliedJobAdministration")
);
const HomeServices = lazy(() => import("./Frontend_Views/Components/HomeServices"));
const AllServices = lazy(() => import("./Frontend_Views/Pages/Services/allServices.jsx"));

function App() {
  const { isLoading } = useSelector((state) => state.loader);
  const location = useLocation();
  const dispatch = useDispatch();

  const isHideMenu = NO_FOOTER_ROUTES.includes(location.pathname);
  const isHideHeader = NO_HEADER_ROUTES.includes(location.pathname);
  const [flashAdd, setFlashAdd] = useState(false);
  const [counter, setCounter] = useState(0);
  const { userInfo, permissions } = useSelector((state) => state.auth);

  const { error, success, showHideList } = useSelector((state) => state.showHide);

  useEffect(() => {
    const isAdmin = Boolean(getCookie("is_admin"));
    if (showHideList.length > 0 && !isAdmin) {
      const showHideCompList = getObjectsByKey(showHideList);
      if (showHideCompList?.advertisement?.visibility) {
        setFlashAdd(true);
      }
    }
  }, [showHideList]);

  useEffect(() => {
    if (showHideList.length === 0 && counter < 3) {
      dispatch(getAllShowHideComponentsList());
      setCounter(counter + 1);
    }
  }, [showHideList]);

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
      <SEO />

      {<Advertisement setFlashAdd={setFlashAdd} flashAdd={flashAdd} />}

      <ThemeProvider theme={ThemeTwo}>
        <GlobalStyles />

        {isLoading ? <LoadingSpinner /> : ""}
        <TopStrip />
        {!isHideHeader && <Header />}

        <Suspense fallback={<SkeletonPage />}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/change_password" element={<ChangePassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addproject" element={<AddProject />} />
              <Route path="/addCategory" element={<ProjectCategory />} />
              <Route path="/contactUSList" element={<ContactUSAdmin />} />
            </Route>

            <Route element={<AdminProtectedRoute />}>
              <Route path="/useradmin" element={<UserAdmin />} />
              <Route path="/theme" element={<Themes />} />
              <Route path="/userPermission" element={<UserPagePermission />} />
              <Route path="/adminPagesConfiguration" element={<PagesConfiguration />} />
              <Route path="/raqformAdministration" element={<RAQAdmininistration />} />
              <Route path="/appliedJobsAdministration" element={<AppliedJobAdministration />} />
              <Route path="/settings" element={<AdminSettings />} />
              <Route path="/editproject/:id" element={<AddProject />} />
              <Route path="/password/reset/:uid/:token" element={<ResetPasswordConfirmation />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/hpr-home" element={<HPRHome />} />
            <Route path="/about" element={<About />} />
            <Route path="/keypoints" element={<WhyChooseUs />} />
            <Route path="/whychooseus" element={<WhyChooseUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories/:id" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:uid" element={<Services />} />
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/career-details/:id" element={<CareerDetails />} />
            <Route path="/teams" element={<Team />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project-details/:id" element={<ProjectTabs />} />
            <Route path="/projectgallery" element={<ProjectsGallery />} />
            <Route path="/imagegallery" element={<ImagesGallery />} />
            <Route path="/videogallery" element={<VideosGallery />} />
            <Route path="/casestudies" element={<CaseStudies />} />
            <Route path="/casestudies-details/:id/" element={<CaseStudiesDetails />} />
            <Route path="/news" element={<NewsAndUpdates />} />
            <Route path="/testimonials" element={<TestimonialsList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/reset_password" element={<ResetPassword />} />

            <Route path="/activate/:uid/:token" element={<Activation />} />
            <Route path="/resend_activation" element={<ResendActivationEmail />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/authForm" element={<AuthForm />} />
            <Route path="/addproject" element={<AddProject />} />
            <Route path="/addCategory" element={<ProjectCategory />} />
            {/* <Route path="/allServices" element={<HomeServices />} /> */}

            {/* <Route path="/adminNews" element={<AdminNews />} /> */}
            <Route path="/testimonial" element={<AdminTestimonial />} />
            <Route path="/all-services" element={<AllServices />} />
          </Routes>
        </Suspense>

        {!isHideMenu && <Footer />}
      </ThemeProvider>
      <ToastContainer autoClose={2000} theme="colored" />
      <ScrollToTop smooth color="#fff" height="20" className="shadow rounded-circle scrollTop" />
    </>
  );
}

export default App;
