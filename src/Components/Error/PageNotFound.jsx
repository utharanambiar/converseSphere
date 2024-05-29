import React from "react";
import notFound from "../../assets/pageNotFound.svg";

function PageNotFound() {
  return (
    <div>
      <img  className="h-[100vh] w-[100vw]" src={notFound} />
    </div>
  );
}

export default PageNotFound;
