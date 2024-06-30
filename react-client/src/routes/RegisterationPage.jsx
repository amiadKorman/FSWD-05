import { Routes, Route } from "react-router-dom";
import Register from "../components/Register";
import UserDetailsForm from "../components/UserDetailsForm";

function RegistrationPage({ onRegister }) {
  return (
    <Routes>
      <Route index element={<Register />} />
      <Route
        path="/details"
        element={<UserDetailsForm onRegister={onRegister} />}
      />
    </Routes>
  );
}

export default RegistrationPage;
