import Graphic from "./Graphic";
import RegistrationForm from "./RegistrationForm";

function App() {
  return (
    <div className="flex flex-col w-screen h-screen md:flex-row">
      <div className="w-full h-full md:w-1/2 ">
        <RegistrationForm />
      </div>
      <div className="w-full h-full  md:w-1/2">
        <Graphic />
      </div>
    </div>
  );
}

export default App;
