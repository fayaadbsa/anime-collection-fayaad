import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AnimeListPage from "@/pages/AnimeListPage/AnimeListPage";
import AnimeDetailPage from "@/pages/AnimeDetailPage/AnimeDetailPage";
import CollectionListPage from "@/pages/CollectionListPage/CollectionListPage";
import CollectionDetailPage from "@/pages/CollectionDetailPage/CollectionDetailPage";
import AppLayout from "@/components/Layout/AppLayout";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
        path: "collection",
        element: <CollectionListPage />,
      },
      {
        path: "collection/:name",
        element: <CollectionDetailPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
