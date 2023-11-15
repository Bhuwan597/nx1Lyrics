import React from "react";

const Iframe = () => {
  return (
    <>
      <div class="container relative w-full h-0 pb-[56.25%]">
        <iframe
          src="https://www.youtube.com/embed/RgKAFK5djSk?si=esEhJn8hELrMKcDG"
          class="video absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </>
  );
};

export default Iframe;
