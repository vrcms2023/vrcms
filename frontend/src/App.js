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
import { AdvertiseComponentStyled } from "./Common/StyledComponents/Adv-Styles";

// CSS
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import Advertisement from "./Common/Advertisement/Advertisement";

// Lazy Loading
const PageNotFound = lazy(() => import("./Frontend/Pages/PageNotFound"));
const Home = lazy(() => import("./Frontend/Pages/Home/index"));
const About = lazy(() => import("./Frontend/Pages/About"));
const Contact = lazy(() => import("./Frontend/Pages/Contact"));
const Services = lazy(() => import("./Frontend/Pages/Services"));
const ClientsList = lazy(() => import("./Frontend/Pages/ClientsList"));
const Careers = lazy(() => import("./Frontend/Pages/Careers"));
const CareerDetails = lazy(() => import("./Frontend/Pages/career-details"));
const Team = lazy(() => import("./Frontend/Pages/Team"));
const Projects = lazy(() => import("./Frontend/Pages/Projects"));
const ProjectTabs = lazy(() =>
  import("./Frontend/Components/ProjectsTabs/ProjecTabs")
);
const ProjectGallery = lazy(() => import("./Frontend/Pages/ProjectGallery"));
const CaseStudies = lazy(() => import("./Frontend/Pages/CaseStudies"));
const CaseStudiesDetails = lazy(() =>
  import("./Frontend/Pages/caseStudies-details")
);
const NewsAndUpdates = lazy(() => import("./Frontend/Pages/NewsAndUpdates"));
const TestimonialsList = lazy(() =>
  import("./Frontend/Pages/TestimonialsList")
);

const Login = lazy(() => import("./Admin/Pages/Auth/Login"));
const Registration = lazy(() => import("./Admin/Pages/Auth/Registration"));
const ChangePassword = lazy(() => import("./Admin/Pages/Auth/ChangePassword"));
const ResetPassword = lazy(() => import("./Admin/Pages/Auth/ResetPassword"));
const ResetPasswordConfirmation = lazy(() =>
  import("./Admin/Pages/Auth/ResetPasswordConfirmation")
);
const Activation = lazy(() => import("./Admin/Pages/Auth/Activation"));
const ResendActivationEmail = lazy(() =>
  import("./Admin/Pages/Auth/ResendActivationEmail")
);
const Dashboard = lazy(() => import("./Admin/Pages/Login/Dashboard"));
const UserAdmin = lazy(() => import("./Admin/Pages/Auth/UserAdmin"));
const UnauthorizedPage = lazy(() =>
  import("./Admin/Pages/Login/UnauthorizedPage")
);
const AuthForm = lazy(() => import("./Admin/Pages/Auth/AuthForm"));
const AddProject = lazy(() => import("./Admin/Pages/Login/AddProject"));
const AdminNews = lazy(() => import("./Admin/Pages/Login/AdminNews"));
const ContactUSAdmin = lazy(() => import("./Admin/Pages/Auth/ContactUSAdmin"));
const PagesConfiguration = lazy(() =>
  import("./Admin/Pages/Auth/PagesConfiguration")
);
const UserPagePermission = lazy(() =>
  import("./Admin/Pages/Auth/UserPagePermission")
);
const AdminTestimonial = lazy(() =>
  import("./Admin/Pages/Login/AdminTestimonial")
);

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.loader);

  const isHideMenu = HideFooterForAdmin();
  const [flashAdd, setFlashAdd] = useState(false);

  useEffect(() => {
    setFlashAdd(false);
  }, []);

  // Google Language Translator

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  // End of Google Language Translator

  return (
    <>
      {/* Google Language Translator */}
      <div id="google_translate_element"></div>
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
              {/* <Route exact path="*" element={<Suspense fallback={<Loading text={lazyText} cssClasses="" />}><PageNotFound /></Suspense>} /> */}
              <Route exact path="*" element={<PageNotFound />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
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
              <Route exact path="/gallery" element={<ProjectGallery />} />
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
              <Route
                exact
                path="/change_password"
                element={
                  <ProtectedRoute>
                    {" "}
                    <ChangePassword />{" "}
                  </ProtectedRoute>
                }
              />
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
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Dashboard />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/userAdmin"
                element={
                  <ProtectedRoute>
                    {" "}
                    {userInfo?.is_admin ? (
                      <UserAdmin />
                    ) : (
                      <UnauthorizedPage />
                    )}{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/userPermission"
                element={
                  <AdminProtectedRoute>
                    <UserPagePermission />
                  </AdminProtectedRoute>
                }
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
              <Route exact path="/contactUSList" element={<ContactUSAdmin />} />
              <Route
                exact
                path="/adminPagesConfigurtion"
                element={
                  <AdminProtectedRoute>
                    <PagesConfiguration />
                  </AdminProtectedRoute>
                }
              />
              <Route exact path="/testimonial" element={<AdminTestimonial />} />
            </Routes>
          </Suspense>

          {!isHideMenu && <Footer />}
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
}

export default App;
