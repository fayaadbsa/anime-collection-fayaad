import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AnimeListPage from "@/pages/AnimeListPage/AnimeListPage";
import AnimeDetailPage from "@/pages/AnimeDetailPage/AnimeDetailPage";
import CollectionListPage from "@/pages/CollectionListPage/CollectionListPage";
import CollectionDetailPage from "@/pages/CollectionDetailPage/CollectionDetailPage";
import AppLayout from "@/components/Layout/AppLayout";
import '@fontsource-variable/inter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <AnimeListPage />,
      },
      {
        path: "anime/:id",
        element: <AnimeDetailPage />,
      },
      {
        path: "collections",
        element: <CollectionListPage />,
      },
      {
        path: "collections/:id",
        element: <CollectionDetailPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
