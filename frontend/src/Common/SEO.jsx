<<<<<<< HEAD
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title ? title : "EZI Press - Custom CMS"}</title>
      <meta
        name="description"
        content={description ? description : "EZI Press - Custom CMS"}
      />
    </Helmet>
=======
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getClientProjects } from "../redux/project/clientProjectActions";
import { getCookie } from "../util/cookieUtil";

const SEO = () => {
  const { menuRawList } = useSelector((state) => state.auth);
  const { clientProjects } = useSelector((state) => state.clientProjects);
  const dispatch = useDispatch();
  const pathname = window?.location?.pathname;
  const [seoObject, setSeoObject] = useState([]);
  const projectid = getCookie("projectid");

  useEffect(() => {
    if (menuRawList.length > 0 && pathname !== "/project-details") {
      let seoMenu = _.filter(menuRawList, (item) => {
        return item.page_url.toLowerCase() === pathname.toLowerCase();
      })[0];
      if (seoMenu) {
        setSeoObject(seoMenu);
      }
    }
  }, [pathname, menuRawList]);

  useEffect(() => {
    if (clientProjects.length === 0) {
      dispatch(getClientProjects());
    }
  }, [dispatch, clientProjects]);

  useEffect(() => {
    if (clientProjects?.projectList?.length > 0) {
      const seoProject = _.filter(clientProjects?.projectList, (item) => {
        return item.id === projectid;
      })[0];
      setSeoObject(seoProject);
    }
  }, [clientProjects, projectid]);

  useEffect(() => {
    console.log("seoObject?.seo_title", seoObject?.seo_title);
  }, [seoObject]);
  return (
    <>
      <Helmet>
        <title>
          {seoObject?.seo_title
            ? seoObject?.seo_title
            : "EZI defautl - Custom CMS"}
        </title>
        <meta
          name="description"
          content={
            seoObject?.seo_description
              ? seoObject?.seo_description
              : "EZI Press - Custom CMS"
          }
        />
        <meta
          name="link"
          content={
            seoObject?.seo_link ? seoObject?.seo_link : "EZI Press - Custom CMS"
          }
        />
        <meta
          name="keywords"
          content={
            seoObject?.seo_keywords
              ? seoObject?.seo_keywords
              : "EZI Press - Custom CMS"
          }
        />
        <meta
          name="author"
          content={
            seoObject?.seo_author
              ? seoObject?.seo_author
              : "EZI Press - Custom CMS"
          }
        />
      </Helmet>
    </>
>>>>>>> 61c085425b2c959715d4d1d0f28dc5d33887daa1
  );
};

export default SEO;
