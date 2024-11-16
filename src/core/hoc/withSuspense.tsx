import { ReactNode, Suspense } from "react";
import Loader from "../components/Loader/Loader";

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<Loader message="Loading..." />}>{element}</Suspense>
);

export default withSuspense;
