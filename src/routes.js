import GameList from "./components/gameList"
import Game from "./components/Game";

export const routes = [
    {
        path: "/",
        element: <GameList />
    },
    {
        path: "game/:id",
        element: <Game />
    }
];