import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Title from "../../Common/Title";

// Styles
import { axiosClientServiceApi } from "../../util/axiosUtil";

const JobCurrentOpenings = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getCareerData = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/careers/clientCareersList/`,
        );
        let keys = Object.keys(response.data);
        if (keys.length > 1) {
          setPosts(response.data.results);
        } else {
          setPosts(response.data.careers);
        }
      } catch (error) {
        console.log("Unable to get the Career data");
      }
    };
    getCareerData();
  }, []);

  return (
    <div className="py-4 px-3 bg-white currentOpenings">
      <Title title="CURRENT OPENINGS" cssClass="mb-3 fw-bold fs-5" />
      <ul>
        {posts.map((item) => (
          <li className="" key={item.id}>
            <Link to={`/career-details/${item.id}/`}>{item.job_title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobCurrentOpenings;
