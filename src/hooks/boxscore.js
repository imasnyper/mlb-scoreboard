import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { boxscoreAtom } from "../atoms/boxscoreAtom";

export default function useBoxscore(games) {
  const setBoxScores = useSetRecoilState(boxscoreAtom);
  const [loading, setLoading] = useState(true);

  async function fetchBoxscores() {
    games.forEach(async (game) => {
        let response = await fetch(
            `https://statsapi.mlb.com/api/v1/game/${game.pk}/boxscore`
        );
        let data = await response.json();
        let boxscore = data["dates"][0]["games"];
    })
    
  }

  // fetch on load
  useEffect(() => {
    fetchSchedule();
  }, []);

  // fetch every 60 seconds after load
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("fetching schedule again...");
      setLoading(true);
      fetchSchedule();
    }, 1000 * 60);
    return () => clearInterval(intervalId);
  }, []);

  return loading;
}
