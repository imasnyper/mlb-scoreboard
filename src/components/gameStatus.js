export default function GameStatus({game, datetime}) {
    const status = game.status.statusCode === "I" || game.status.statusCode === "NF"
        ? game.linescore.inningState +
        " " +
        game.linescore.currentInningOrdinal
        : game.status.statusCode === "F" ||
            game.status.statusCode === "O"
            ? "Final/" + game.linescore.currentInning
                : game.status.statusCode === "PW"
                ? "Warmup"
                : game.status.statusCode === "DR"
                ? "Postponed"
                : game.status.statusCode === "PR"
                ? "Rain Delay"
                : datetime;

    let outs = ""
    if (game.linescore !== undefined) {
    outs = game.status.statusCode === "I" && game.linescore.outs > 0
        ? " - " + game.linescore.outs + " Outs"
        : game.status.statusCode === "I" & game.linescore.outs === 0
        ? " - " + game.linescore.outs + " Out"
        : "";
    }

    return (
        <>
            {status + outs}
        </>
    )
}