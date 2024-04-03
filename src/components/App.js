import "../styles/main.scss";
import GameList from "./gameList";
import useSchedule from "../hooks/schedule";
// import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "../routes";

const router = createBrowserRouter(routes);

function App() {
  const scheduleLoading = useSchedule();

  if (scheduleLoading) return <p>Loading...</p>;

  return <RouterProvider router={router} />;
}

export default App;
