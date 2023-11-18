import React from "react";

const Iframe = ({src}) => {
  return (
    <>
      <div class="container relative w-full h-0 pb-[56.25%]">
        <iframe
          src={src}
          class="video absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </>
  );
};

export default Iframe;
