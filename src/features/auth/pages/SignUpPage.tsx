import { Outlet } from "react-router-dom";
import SignUpCard from "../components/SignUpCard/SignUpCard";

export default function LoginPage() {
  return (
    <SignUpCard>
      <Outlet />
    </SignUpCard>
  );
}
