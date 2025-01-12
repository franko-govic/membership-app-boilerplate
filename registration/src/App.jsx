import Graphic from "./Graphic";
import RegistrationForm from "./RegistrationForm";

function App() {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/2 h-full">
        <RegistrationForm />
      </div>
      <div className="h-full w-1/2">
        <Graphic />
      </div>
    </div>
  );
}

export default App;
