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
import ProtectedRoute from "./Frontend_Views/Routes/ProtectedRoute";
import AdminProtectedRoute from "./Frontend_Views/Routes/AdminProtectedRoute";

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
const Dashboard = lazy(() => import("./Frontend_Admin/Pages/Login/Dashboard"));
const UserAdmin = lazy(() => import("./Frontend_Admin/Pages/Auth/UserAdmin"));
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
                <Route
                  path="/admin/change_password"
                  element={<ChangePassword />}
                />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route
                  path="/admin/contactUSList"
                  element={<ContactUSAdmin />}
                />
              </Route>

              <Route element={<AdminProtectedRoute />}>
                <Route path="/admin/userAdmin" element={<UserAdmin />} />
                <Route
                  path="/admin/userPermission"
                  element={<UserPagePermission />}
                />
                <Route
                  path="/admin/adminPagesConfigurtion"
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
              <Route exact path="/categories/:id" element={<Products />} />
              <Route exact path="/products/:id/" element={<ProductDetails />} />
              <Route exact path="/services" element={<Services />} />
              <Route exact path="/services/:uid/" element={<Services />} />
              <Route exact path="/clients/clients" element={<ClientsList />} />
              <Route exact path="/profile/careers" element={<Careers />} />
              <Route
                exact
                path="/career-details/:id/"
                element={<CareerDetails />}
              />
              <Route exact path="/profile/team" element={<Team />} />
              <Route exact path="/projects/projects" element={<Projects />} />
              <Route exact path="/project-details" element={<ProjectTabs />} />
              <Route
                exact
                path="/projects/projectgallery"
                element={<ProjectsGallery />}
              />
              <Route
                exact
                path="/gallery/imagegallery"
                element={<ImagesGallery />}
              />
              <Route
                exact
                path="/gallery/videogallery"
                element={<VideosGallery />}
              />
              <Route
                exact
                path="/clients/casestudies"
                element={<CaseStudies />}
              />
              <Route
                exact
                path="/clients/casestudies-details/:id/"
                element={<CaseStudiesDetails />}
              />
              <Route exact path="/profile/news" element={<NewsAndUpdates />} />
              <Route
                exact
                path="/profile/testimonials"
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

              <Route
                exact
                path="/profile/testimonial"
                element={<AdminTestimonial />}
              />
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
        className="shadow rounded-circle scrollTop"
      />
    </>
  );
}

export default App;
