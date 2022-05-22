import React, { useEffect } from "react";
import Carousel from "../components/Carousel";

import FeaturingJob from "features/job/FeaturingJob";
import Welcome from "components/Welcome";
import Join from "components/Join";

const HomePage = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Carousel />
      <Welcome />
      <Join />
      <FeaturingJob />
    </div>
  );
};

export default HomePage;
