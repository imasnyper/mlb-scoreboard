import { generateInningKeys } from "../util/utils";

export default function Linescore({ game, homeAway }) {
    let numInnings = 9
    if (game.linescore !== undefined) {
        numInnings =
            game.linescore.currentInning > 9 ? game.linescore.currentInning : 9;
    }
    const inProgressOrFinal = game.status.statusCode === "I" ||
    game.status.statusCode === "F" ||
    game.status.statusCode === "O";

    return <>
        {/* Linescore Columns */}
        <td>&nbsp;</td>
        {new Array(numInnings).fill(0).map((_, inning) => {
            let key = generateInningKeys(
                game.gamePk,
                game.teams[homeAway].team.id,
                inning
            );
            const activeHalfInning = game.status.statusCode === "I" && game.linescore.currentInning === inning + 1 && ((game.linescore.isTopInning && homeAway === 'away') || (!game.linescore.isTopInning && homeAway === 'home' ));
            if (inProgressOrFinal && inning < game.linescore.currentInning) {
                let runs = game.linescore.innings[inning][homeAway]?.runs;
                runs = !runs && game.linescore.inning >= inning ? 0 : runs;
                runs = typeof runs === "undefined" ? "\u00A0" : runs;
                return (
                    <td key={key}>
                        <div className={activeHalfInning ? "inProgress" : ""}>
                            {runs}
                        </div>
                    </td>
                );
            } else {
                return (
                    <td key={key}>
                        <div className={activeHalfInning ? "inProgress" : ""}>
                            &nbsp;
                        </div>
                    </td>
                );
            }
        })}

        {/* Summary Columns */}
        <td>&nbsp;</td>
        {inProgressOrFinal ? (
            <>
                <td className="summaryCol">{game.linescore.teams[homeAway].runs}</td>
                <td className="summaryCol">{game.linescore.teams[homeAway].hits}</td>
                <td className="summaryCol">
                    {game.linescore.teams[homeAway].errors}
                </td>
                <td className="summaryCol">
                    {game.linescore.teams[homeAway].leftOnBase}
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
    </>
}