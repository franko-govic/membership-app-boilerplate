import React from "react";
import slika from "./Assets/grafika.png";

function Graphic() {
  return (
    <div className="w-full h-full relative">
      <div
        className="w-full h-full bg-cover bg-center brightness-50  filter blur-sm backdrop-blur-0"
        style={{ backgroundImage: `url(${slika})` }}
      ></div>
      <p className="absolute top-20 left-1/2 text-5xl md:text-7xl transform -translate-x-1/2  text-center font-bold text-white ">
        ZA RODNI GRAD
      </p>
    </div>
  );
}

export default Graphic;
