import React, { useEffect, useState } from "react";

import Title from "./Title";
import { axiosClientServiceApi } from "../util/axiosUtil";
import SkeletonImage from "./Skeltons/SkeletonImage";
import CountUp from "react-countup";

const CounterCompnentView = ({ getDataAPIURL, componentState }) => {
  const [counterData, setCounterData] = useState([]);

  useEffect(() => {
    const getCounterData = async () => {
      try {
        const response = await axiosClientServiceApi.get(getDataAPIURL);
        if (response?.status === 200) {
          setCounterData(response?.data ? response.data[0] : []);
        } else {
          setCounterData([]);
        }
      } catch (error) {
        setCounterData([]);
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentState) {
      getCounterData();
    }
  }, [componentState, getDataAPIURL]);

  return (
    <div className="counterComponentView d-flex flex-column align-items-center justify-content-between">
      {!counterData && <SkeletonImage />}
      {counterData?.title !== "" && <Title title={counterData?.title} cssClass="counterTitle" />}
      <div className="counterComponentViewContainer d-flex flex-wrap justify-content-center">
        {counterData?.counters &&
          counterData.counters.map((counter, index) => (
            <div
              key={index}
              className="counterItem text-center d-flex align-items-center justify-content-center m-md-2"
            >
              <h3 className="counterLabel">{counter.label}</h3>
              <p className="counterValue">
                <CountUp end={counter.counter} delay={2} />
              </p>
              <span className="counterSymbol">{counter.symbol}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
export default CounterCompnentView;
