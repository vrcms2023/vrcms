import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import _ from "lodash";

const SEO = ({ seoObject }) => {
  const { menuRawList } = useSelector((state) => state.auth);
  const pathname = window?.location?.pathname;
  const [menuItem, setMenuItem] = useState([]);

  useEffect(() => {
    if (menuRawList.length > 0 && pathname !== "/project-details") {
      let menu = _.filter(menuRawList, (item) => {
        return item.page_url.toLowerCase() === pathname.toLowerCase();
      })[0];
      if (menu) {
        setMenuItem(menu);
      }
    }
    if (pathname === "/project-details" && seoObject) {
      setMenuItem(seoObject);
    }
  }, [pathname, menuRawList, seoObject]);

  useEffect(() => {
    console.log("menuItem?.seo_title", menuItem?.seo_title);
  }, [menuItem]);
  return (
    <>
      <Helmet>
        <title>
          {menuItem?.seo_title
            ? menuItem?.seo_title
            : "EZI defautl - Custom CMS"}
        </title>
        <meta
          name="description"
          content={
            menuItem?.seo_description
              ? menuItem?.seo_description
              : "EZI Press - Custom CMS"
          }
        />
        <meta
          name="link"
          content={
            menuItem?.seo_link ? menuItem?.seo_link : "EZI Press - Custom CMS"
          }
        />
        <meta
          name="keywords"
          content={
            menuItem?.seo_keywords
              ? menuItem?.seo_keywords
              : "EZI Press - Custom CMS"
          }
        />
        <meta
          name="author"
          content={
            menuItem?.seo_author
              ? menuItem?.seo_author
              : "EZI Press - Custom CMS"
          }
        />
      </Helmet>
    </>
  );
};

export default SEO;
