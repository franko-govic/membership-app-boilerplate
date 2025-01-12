import HeroSection from "./HeroSection";
import RegistrationSection from "./RegistrationSection";

function App() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <div className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory hide-scrollbar">
        <div className="w-full h-screen shrink-0 snap-start snap-always">
          <HeroSection />
        </div>
        <div className="w-full h-screen shrink-0 snap-start snap-always overflow-y-auto">
          <div className="min-h-full">
          <RegistrationSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;