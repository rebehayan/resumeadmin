import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Style from "./pages/Style";
import ProtectedRoute from "./route/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Resume from "./pages/Resume";
import Mypage from "./pages/Mypage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/styleguide",
        element: <Style />,
      },
      {
        path: "/resume",
        element: <Resume />,
      },
      {
        path: "/mypage",
        element: <Mypage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
