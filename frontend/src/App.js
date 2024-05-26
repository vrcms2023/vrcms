import React, { lazy, Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import LoadingSpinner from "./Common/LoadingSpinner";
import { HideFooterForAdmin } from "./util/commonUtil";
import SkeletonPage from "./Common/Skeltons/SkeletonPage";
import Footer from "./Common/Footer/Footer";
import Header from "./Common/Header/Header";
import TopStrip from "./Common/Header/TopStrip";
import ProtectedRoute from "./Frontend/Routes/ProtectedRoute";
import AdminProtectedRoute from "./Frontend/Routes/AdminProtectedRoute";

// Themes
import ThemeOne from "./Common/StyledThemes/ThemeOne.json";
import { GlobalStyles } from "./Common/StyledComponents/GlobalStyles";

// CSS
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import Advertisement from "./Common/Advertisement/Advertisement";
import ScrollToTop from "react-scroll-to-top";

// Lazy Loading

const HPRHome = lazy(() => import("./Frontend/Pages/HPR-Home"));

const PageNotFound = lazy(() => import("./Frontend/Pages/404/PageNotFound"));
const Home = lazy(() => import("./Frontend/Pages/Home/index"));
const About = lazy(() => import("./Frontend/Pages/About/About"));
const Contact = lazy(() => import("./Frontend/Pages/Contact/Contact"));
const Services = lazy(() => import("./Frontend/Pages/Services/Services"));
const Products = lazy(() => import("./Frontend/Pages/Products/index"));
const ProductDetails = lazy(
  () => import("./Frontend/Pages/Products/ProductDetails")
);
const ClientsList = lazy(() => import("./Frontend/Pages/Clients/ClientsList"));
const Careers = lazy(() => import("./Frontend/Pages/Careers/Careers"));
const CareerDetails = lazy(
  () => import("./Frontend/Pages/Careers/career-details")
);
const Team = lazy(() => import("./Frontend/Pages/Teams/Team"));
const Projects = lazy(() => import("./Frontend/Pages/Projects/Projects"));
const ProjectsGallery = lazy(
  () => import("./Frontend/Pages/Projects/ProjectsGallery")
);
const ProjectTabs = lazy(
  () => import("./Frontend/Components/ProjectsTabs/ProjecTabs")
);

const ImagesGallery = lazy(
  () => import("./Frontend/Pages/Gallery/ImagesGallery")
);
const VideosGallery = lazy(
  () => import("./Frontend/Pages/Gallery/VideosGallery")
);
const CaseStudies = lazy(
  () => import("./Frontend/Pages/Casestudies/CaseStudies")
);
const CaseStudiesDetails = lazy(
  () => import("./Frontend/Pages/Casestudies/caseStudies-details")
);
const NewsAndUpdates = lazy(
  () => import("./Frontend/Pages/News/NewsAndUpdates")
);
const TestimonialsList = lazy(
  () => import("./Frontend/Pages/Testimonials/TestimonialsList")
);

const Login = lazy(() => import("./Admin/Pages/Auth/Login"));
const Registration = lazy(() => import("./Admin/Pages/Auth/Registration"));
const ChangePassword = lazy(() => import("./Admin/Pages/Auth/ChangePassword"));
const ResetPassword = lazy(() => import("./Admin/Pages/Auth/ResetPassword"));
const ResetPasswordConfirmation = lazy(
  () => import("./Admin/Pages/Auth/ResetPasswordConfirmation")
);
const Activation = lazy(() => import("./Admin/Pages/Auth/Activation"));
const ResendActivationEmail = lazy(
  () => import("./Admin/Pages/Auth/ResendActivationEmail")
);
const Dashboard = lazy(() => import("./Admin/Pages/Login/Dashboard"));
const UserAdmin = lazy(() => import("./Admin/Pages/Auth/UserAdmin"));
const UnauthorizedPage = lazy(
  () => import("./Admin/Pages/Login/UnauthorizedPage")
);
const AuthForm = lazy(() => import("./Admin/Pages/Auth/AuthForm"));
const AddProject = lazy(() => import("./Admin/Pages/Login/AddProject"));
const AdminNews = lazy(() => import("./Admin/Pages/Login/AdminNews"));
const ContactUSAdmin = lazy(() => import("./Admin/Pages/Auth/ContactUSAdmin"));
const PagesConfiguration = lazy(
  () => import("./Admin/Pages/Auth/PagesConfiguration")
);
const UserPagePermission = lazy(
  () => import("./Admin/Pages/Auth/UserPagePermission")
);
const AdminTestimonial = lazy(
  () => import("./Admin/Pages/Login/AdminTestimonial")
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
      <ThemeProvider theme={ThemeOne}>
        <GlobalStyles />
        <BrowserRouter>
          {isLoading ? <LoadingSpinner /> : ""}
          <TopStrip />
          <Header />
          <Suspense fallback={<SkeletonPage />}>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/change_password" element={<ChangePassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contactUSList" element={<ContactUSAdmin />} />
              </Route>

              <Route element={<AdminProtectedRoute />}>
                <Route path="/userAdmin" element={<UserAdmin />} />
                <Route
                  path="/userPermission"
                  element={<UserPagePermission />}
                />
                <Route
                  path="/adminPagesConfigurtion"
                  element={<PagesConfiguration />}
                />
              </Route>

              <Route exact path="*" element={<PageNotFound />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/hpr-home" element={<HPRHome />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/products" element={<Products />} />
              <Route
                exact
                path="/products/:uid/"
                element={<ProductDetails />}
              />
              <Route exact path="/services" element={<Services />} />
              <Route exact path="/services/:uid/" element={<Services />} />
              <Route exact path="/clients" element={<ClientsList />} />
              <Route exact path="/careers" element={<Careers />} />
              <Route
                exact
                path="/career-details/:id/"
                element={<CareerDetails />}
              />
              <Route exact path="/team" element={<Team />} />
              <Route exact path="/projects" element={<Projects />} />
              <Route exact path="/project-details" element={<ProjectTabs />} />
              <Route
                exact
                path="/projectgallery"
                element={<ProjectsGallery />}
              />
              <Route exact path="/imagegallery" element={<ImagesGallery />} />
              <Route exact path="/videogallery" element={<VideosGallery />} />
              <Route exact path="/casestudies" element={<CaseStudies />} />
              <Route
                exact
                path="/casestudies-details/:id/"
                element={<CaseStudiesDetails />}
              />
              <Route exact path="/news" element={<NewsAndUpdates />} />
              <Route
                exact
                path="/testimonials"
                element={<TestimonialsList />}
              />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Registration />} />

              <Route exact path="/reset_password" element={<ResetPassword />} />
              <Route
                exact
                path="/password/reset/:uid/:token"
                element={<ResetPasswordConfirmation />}
              />
              <Route
                exact
                path="/activate/:uid/:token"
                element={<Activation />}
              />
              <Route
                exact
                path="/resend_activation"
                element={<ResendActivationEmail />}
              />

              <Route
                exact
                path="/unauthorized"
                element={<UnauthorizedPage />}
              />
              <Route exact path="/authForm" element={<AuthForm />} />
              <Route exact path="/addproject" element={<AddProject />} />
              <Route exact path="/editproject/:id" element={<AddProject />} />
              <Route exact path="/adminNews" element={<AdminNews />} />

              <Route exact path="/testimonial" element={<AdminTestimonial />} />
            </Routes>
          </Suspense>

          {!isHideMenu && <Footer />}
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer autoClose={2000} theme="colored" />
      <ScrollToTop
        smooth
        color="#fff"
        height="20"
        style={{ background: "#999" }}
        className="shadow rounded-circle"
      />
    </>
  );
}

export default App;
