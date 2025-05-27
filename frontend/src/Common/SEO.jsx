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
  );
};

export default SEO;
