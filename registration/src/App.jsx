import Graphic from "./Graphic";
import RegistrationForm from "./RegistrationForm";

function App() {
  return (
    <div className="flex flex-col w-screen h-screen md:flex-row">
      <div className="h-2/3 md:h-full md:flex-1">
        <RegistrationForm />
      </div>
      <div className="h-1/3 md:h-full md:flex-1">
        <Graphic />
      </div>
    </div>
  );
}

export default App;
