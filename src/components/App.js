import "../styles/main.scss";
import GameList from "./gameList";
import { useTeamColors } from "../hooks/teamColors";
import useSchedule from "../hooks/schedule";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const colorsLoading = useTeamColors();
  const scheduleLoading = useSchedule();

  if (colorsLoading || scheduleLoading) return <p>Loading...</p>;

  return <GameList />;
}

export default App;
