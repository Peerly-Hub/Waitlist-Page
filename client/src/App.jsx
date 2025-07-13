import WaitlistFormStep2 from "./components/WaitlistFormStep2";
import WaitlistFormStep1 from "./components/WaitlistFormStep1";
import { Routes, Route } from "react-router-dom";
import WaitlistFormStep3 from "./components/WaitlistFormStep3";
import WaitlistSuccessStep from "./components/WaitlistSuccessStep";
import { useFavicon } from "./hooks/useFavicon";
import CollegeFormPage from "./components/CollegeFormPage";
import AlumniFormPage from "./components/AlumniFormPage";
import ApirantFormPage from "./components/ApirantFormPage";
import { Toaster } from "sonner";

const App = () => {
  useFavicon();

  return (
    <>
      <Routes>
        <Route path="/" element={<WaitlistFormStep1 />} />
        <Route path="/role-selection" element={<WaitlistFormStep2 />} />
        <Route path="/college-details" element={<CollegeFormPage />} />
        <Route path="/alumni-details" element={<AlumniFormPage />} />
        <Route path="/aspirant-details" element={<ApirantFormPage />} />
        <Route path="/profile-links" element={<WaitlistFormStep3 />} />
        <Route path="/waitlist-success" element={<WaitlistSuccessStep />} />
      </Routes>
      <Toaster richColors position="top-center" />
    </>
  );
};

export default App;
