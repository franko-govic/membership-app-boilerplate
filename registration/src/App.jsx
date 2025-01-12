import Graphic from "./Graphic";
import RegistrationForm from "./RegistrationForm";

function App() {
  return (
    <div className="w-full min-h-dvh bg-gray-900">
      <div className="flex flex-col-reverse md:flex-row w-full min-h-screen">
        <div className="flex-1 order-2 md:order-1">
          <RegistrationForm />
        </div>
        <div className="h-[50vh] md:h-screen md:w-1/2 order-1 md:order-2">
          <Graphic />
        </div>
      </div>
    </div>
  );
}

export default App;