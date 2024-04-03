import TeamRow from "./TeamRow";
import StatusRow from "./statusRow";
import { Link } from "react-router-dom";
import '../styles/gameScore.css';

export default function GameScore({ game }) {
  // if (game.linescore === undefined) return <>{console.log(game)}</>;
  
  // console.log(game);
  // console.log('game status', game.status);
  // console.log(game.linescore.currentInning)

  return (
    <Link 
      to={{
        pathname: `game/${game.gamePk}`,
      }}
      state= {{ gamePk: game.gamePk }}
      className="game"
    >
      <table key={game.gamePk}>
        <tbody>
          {/* Status Row */}
          <StatusRow game={game} />

          {/* Away Team Row */}
          <TeamRow game={game} homeAway="away" />

          {/* Home Team Row */}
          <TeamRow game={game} homeAway="home" />

        </tbody>
      </table>
      <br />
    </Link>
  );
}
