import { getTeamColors, images } from "../util/utils";
import Linescore from "./linescore";

export default function TeamRow({ game, homeAway }) {
  const teamName = game.teams[homeAway].team.name;
  let [color1, color2, borderColor] = getTeamColors(teamName);

  return <>
    <tr className="main-row">
      {/* Away Team Name Column */}
      <td className="logoColumn" style={{ backgroundColor: color1 }}>
        <img className="logoImage" src={images[teamName]} alt="team-logo"></img>
      </td>
      <td
        className="teamName"
        style={{
          backgroundColor: color1,
          color: color2,
          textShadow: borderColor,
        }}
      >
        {teamName}
      </td>

      <Linescore game={game} homeAway={homeAway} />
      
    </tr>
  </>
}