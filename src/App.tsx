import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AnimeListPage from "./pages/AnimeListPage/AnimeListPage";
import AnimeDetailPage from "./pages/AnimeDetailPage/AnimeDetailPage";
import CollectionListPage from "./pages/CollectionListPage/CollectionListPage";
import CollectionDetailPage from "./pages/CollectionDetailPage/CollectionDetailPage";
import AppLayout from "./components/Layout/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AnimeListPage />,
  },
  {
    path: "/anime/:id",
    element: <AnimeDetailPage />,
  },
  {
    path: "/collections",
    element: <CollectionListPage />,
  },
  {
    path: "/collection/:id",
    element: <CollectionDetailPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
