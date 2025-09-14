import { lazy } from "react";

const Main = lazy(() => import("../pages/Main"));
const Emails = lazy(() => import("../components/Emails.jsx"));
const ViewEmail = lazy(() => import("../components/ViewEmail.jsx"));

const routes = {
  main: {
    path: "/",
    element: Main,
  },
  emails: {
    path: "/emails",
    element: Emails,
  },
  view: {
    path: "/view",
    element: ViewEmail,
  },
  invalid: {
    path: "/*",
    element: Emails,
  },
};

export { routes };
