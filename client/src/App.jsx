import WaitlistFormStep2 from "./components/WaitlistFormStep2";
import WaitlistFormStep1 from "./components/WaitlistFormStep1";
import { Routes, Route } from "react-router-dom";
import WaitlistFormStep3 from "./components/WaitlistFormStep3";
import WaitlistSuccessStep from "./components/WaitlistSuccessStep";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WaitlistFormStep1 />} />
      <Route path="/your-role" element={<WaitlistFormStep2 />} />
      <Route path="/profile-links" element={<WaitlistFormStep3 />} />
      <Route path="/success" element={<WaitlistSuccessStep />} />
    </Routes>
  );
};

export default App;
