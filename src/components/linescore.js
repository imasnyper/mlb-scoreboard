import { DateTime } from "luxon";
import { useRecoilState } from "recoil";
import { teamColorsAtom } from "../atoms/teamColorsAtom";
import {
  getTeamColors,
  generateInningKeys,
  hexToHSL,
  images,
} from "../util/utils";

export default function Linescore({ game }) {
  const [teamColors, setTeamColors] = useRecoilState(teamColorsAtom);
  if (game.linescore === undefined) return <>{console.log(game)}</>;

  const awayTeamName = game.teams.away.team.name;
  const homeTeamName = game.teams.home.team.name;
  let awayColorName = awayTeamName;
  let homeColorName = homeTeamName;

  if (awayTeamName === "Cleveland Guardians")
    awayColorName = "Cleveland Indians";
  if (homeTeamName === "Cleveland Guardians")
    homeColorName = "Cleveland Indians";

  let [homeColor1, homeColor2] = ["#FFF", "#000"];
  let [awayColor1, awayColor2] = ["#FFF", "#000"];

  try {
    if (Array.isArray(teamColors)) {
      console.log("team colors is array");
      const awayColorsList = teamColors.find(
        (team) => team.name === awayColorName
      ).eras[0].colors;
      const homeColorsList = teamColors.find(
        (team) => team.name === homeColorName
      ).eras[0].colors;

      [homeColor1, homeColor2] = getTeamColors(homeColorsList);
      [awayColor1, awayColor2] = getTeamColors(awayColorsList);
    }
  } catch (TypeError) {
    console.log("team colors on error: " + teamColors);
  }

  console.log(images);

  const timeZone = DateTime.local().zoneName;
  const dateString =
    game.gameDate.substring(0, game.gameDate.length - 1) + "+00";
  let datetime = DateTime.fromISO(dateString, { setZone: true });
  datetime = datetime.setZone(timeZone).toLocaleString(DateTime.TIME_SIMPLE);
  const numInnings =
    game.linescore.currentInning > 9 ? game.linescore.currentInning : 9;

  let awayBorderColor = hexToHSL(awayColor2).l > 30 ? "black" : "white";
  console.log("away border color: " + awayBorderColor);
  awayBorderColor =
    `-1px -1px 0 ${awayBorderColor}, -1px -1px 0 ${awayBorderColor}, -1px 0px 0 ${awayBorderColor},` +
    `-1px 1px 0 ${awayBorderColor}, -1px 1px 0 ${awayBorderColor}, -1px -1px 0 ${awayBorderColor}, -1px -1px 0 ${awayBorderColor},` +
    `-1px 0px 0 ${awayBorderColor}, -1px 1px 0 ${awayBorderColor}, -1px 1px 0 ${awayBorderColor}, 0px -1px 0 ${awayBorderColor},` +
    `0px -1px 0 ${awayBorderColor}, 0px 0px 0 ${awayBorderColor}, 0px 1px 0 ${awayBorderColor}, 0px 1px 0 ${awayBorderColor},` +
    `1px -1px 0 ${awayBorderColor}, 1px -1px 0 ${awayBorderColor}, 1px 0px 0 ${awayBorderColor}, 1px 1px 0 ${awayBorderColor},` +
    `1px 1px 0 ${awayBorderColor}, 1px -1px 0 ${awayBorderColor}, 1px -1px 0 ${awayBorderColor}, 1px 0px 0 ${awayBorderColor},` +
    `1px 1px 0 ${awayBorderColor}, 1px 1px 0 ${awayBorderColor}`;
  let homeBorderColor = hexToHSL(homeColor2).l > 30 ? "black" : "white";
  console.log("home border color: " + homeBorderColor);
  homeBorderColor =
    `-1px -1px 0 ${homeBorderColor}, -1px -1px 0 ${homeBorderColor}, -1px 0px 0 ${homeBorderColor},` +
    `-1px 1px 0 ${homeBorderColor}, -1px 1px 0 ${homeBorderColor}, -1px -1px 0 ${homeBorderColor}, -1px -1px 0 ${homeBorderColor},` +
    `-1px 0px 0 ${homeBorderColor}, -1px 1px 0 ${homeBorderColor}, -1px 1px 0 ${homeBorderColor}, 0px -1px 0 ${homeBorderColor},` +
    `0px -1px 0 ${homeBorderColor}, 0px 0px 0 ${homeBorderColor}, 0px 1px 0 ${homeBorderColor}, 0px 1px 0 ${homeBorderColor},` +
    `1px -1px 0 ${homeBorderColor}, 1px -1px 0 ${homeBorderColor}, 1px 0px 0 ${homeBorderColor}, 1px 1px 0 ${homeBorderColor},` +
    `1px 1px 0 ${homeBorderColor}, 1px -1px 0 ${homeBorderColor}, 1px -1px 0 ${homeBorderColor}, 1px 0px 0 ${homeBorderColor},` +
    `1px 1px 0 ${homeBorderColor}, 1px 1px 0 ${homeBorderColor}`;
  console.log(game);
  console.log(game.status);
  return (
    <>
      <table key={game.gamePk}>
        <tbody>
          {/* Status Row */}
          <tr className="statusRow">
            {/* Game Status Column */}
            {/* <td></td> */}
            <td className="gameStatus" colSpan={2}>
              {game.status.statusCode === "I"
                ? game.linescore.inningState +
                  " " +
                  game.linescore.currentInningOrdinal
                : game.status.statusCode === "F" ||
                  game.status.statusCode === "O"
                ? "Final/" + game.linescore.currentInning
                : game.status.statusCode === "PW"
                ? "Warmup"
                : datetime}
            </td>

            {/* Inning Columns */}
            <td>&nbsp;</td>
            {new Array(numInnings).fill(0).map((_, inning) => {
              if (inning < game.linescore.currentInning) {
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

          {/* Away Team Row */}
          <tr>
            {/* Away Team Name Column */}
            <td className="logoColumn" style={{ backgroundColor: awayColor1 }}>
              <img className="logoImage" src={images[awayTeamName]}></img>
            </td>
            <td
              className="teamName"
              style={{
                backgroundColor: awayColor1,
                color: awayColor2,
                textShadow: awayBorderColor,
              }}
            >
              {awayTeamName}
            </td>

            {/* Away Linescore Columns */}
            <td>&nbsp;</td>
            {new Array(numInnings).fill(0).map((_, inning) => {
              let key = generateInningKeys(
                game.gamePk,
                game.teams.away.team.id,
                inning
              );
              if (inning < game.linescore.currentInning) {
                return (
                  <td key={key}>{game.linescore.innings[inning].away.runs}</td>
                );
              } else {
                return <td key={key}>&nbsp;</td>;
              }
            })}

            {/* Away Summary Columns */}
            <td>&nbsp;</td>
            {game.status.statusCode === "PW" ||
            game.status.statusCode === "I" ||
            game.status.statusCode === "F" ||
            game.status.statusCode === "O" ? (
              <>
                <td className="summaryCol">{game.linescore.teams.away.runs}</td>
                <td className="summaryCol">{game.linescore.teams.away.hits}</td>
                <td className="summaryCol">
                  {game.linescore.teams.away.errors}
                </td>
                <td className="summaryCol">
                  {game.linescore.teams.away.leftOnBase}
                </td>
              </>
            ) : (
              <>
                <td className="summaryCol">&nbsp;</td>
                <td className="summaryCol">&nbsp;</td>
                <td className="summaryCol">&nbsp;</td>
                <td className="summaryCol">&nbsp;</td>
              </>
            )}
          </tr>

          {/* Home Team Row */}
          <tr>
            {/* Home Team Name */}
            <td className="logoColumn" style={{ backgroundColor: homeColor1 }}>
              <img className="logoImage" src={images[homeTeamName]}></img>
            </td>
            <td
              className="teamName"
              style={{
                backgroundColor: homeColor1,
                color: homeColor2,
                textShadow: homeBorderColor,
              }}
            >
              {console.log(images[homeTeamName])}
              {game.teams.home.team.name}
            </td>

            {/* Home Linescore Columns */}
            <td>&nbsp;</td>
            {new Array(numInnings).fill(0).map((_, inning) => {
              let key = generateInningKeys(
                game.gamePk,
                game.teams.away.team.id,
                inning
              );
              if (inning < game.linescore.currentInning) {
                return (
                  <td key={key}>{game.linescore.innings[inning].home.runs}</td>
                );
              } else {
                return <td key={key}>&nbsp;</td>;
              }
            })}

            {/* Home Summary Columns */}
            <td>&nbsp;</td>
            {game.status.statusCode === "PW" ||
            game.status.statusCode === "I" ||
            game.status.statusCode === "F" ||
            game.status.statusCode === "O" ? (
              <>
                <td className="summaryCol">{game.linescore.teams.home.runs}</td>
                <td className="summaryCol">{game.linescore.teams.home.hits}</td>
                <td className="summaryCol">
                  {game.linescore.teams.home.errors}
                </td>
                <td className="summaryCol">
                  {game.linescore.teams.home.leftOnBase}
                </td>
              </>
            ) : (
              <>
                <td className="summaryCol">&nbsp;</td>
                <td className="summaryCol">&nbsp;</td>
                <td className="summaryCol">&nbsp;</td>
                <td className="summaryCol">&nbsp;</td>
              </>
            )}
          </tr>
        </tbody>
      </table>
      <br />
    </>
  );
}
