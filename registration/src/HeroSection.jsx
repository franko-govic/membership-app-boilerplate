import slika from "../public/Assets/random.jpg";
import { RiArrowDownLine } from "@remixicon/react";

function HeroSection() {
  const scrollToRegistration = () => {
    const registrationSection = document.getElementById("registration-section");
    if (registrationSection) {
      registrationSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={slika}
          alt="Background"
          className="w-full h-full object-scale-down md:object-fill brightness-50 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
      </div>
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center px-4 py-8">
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white 
                         tracking-tight leading-none
                         drop-shadow-2xl
                         bg-gradient-to-b from-white via-white to-orange-200
                         bg-clip-text text-transparent"
          >
            ZA RODNI GRAD
          </h1>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />

      <div
        onClick={scrollToRegistration}
        className="absolute bottom-10 left-1/2 right-1/2 transform -translate-x-1/2 w-fit h-fit rounded-full p-5 text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-orange-500/20 cursor-pointer"
      >
        <RiArrowDownLine />
      </div>
    </div>
  );
}

export default HeroSection;
