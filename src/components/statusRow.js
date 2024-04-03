import GameStatus from "./gameStatus";
import { DateTime } from "luxon";

export default function StatusRow({ game }) {
  let numInnings = 9
  if (game.linescore !== undefined) {
    numInnings = game.linescore.currentInning > 9 ? game.linescore.currentInning : 9;
  }
  const timeZone = DateTime.local().zoneName;
  const dateString =
    game.gameDate.substring(0, game.gameDate.length - 1) + "+00";
    let datetime = DateTime.fromISO(dateString, { setZone: true });
      datetime = datetime.setZone(timeZone).toLocaleString(DateTime.TIME_SIMPLE);

  return <>
    <tr className="statusRow">
        {/* Game Status Column */}
        <td className="gameStatus" colSpan={2}>
          <GameStatus game={game} datetime={datetime} />
        </td>

        {/* Inning Columns */}
        <td>&nbsp;</td>
        {new Array(numInnings).fill(0).map((_, inning) => {
          if (game.linescore !== undefined && inning < game.linescore.currentInning) {
            // console.log(inning);
            // console.log(game.linescore.innings[inning]);
            return (
              <td key={"inning-" + inning} className="inningCol">
                {game.linescore.innings[inning].num}
              </td>
            );
          } else {
            return (
              <td key={"inning-" + inning} className="inningCol">
                {inning + 1}
              </td>
            );
          }
        })}

        {/* Game Summary Columns */}
        <td>&nbsp;</td>
        <td className="summaryCol">R</td>
        <td className="summaryCol">H</td>
        <td className="summaryCol">E</td>
        <td className="summaryCol">LOB</td>
      </tr>
  </>
}