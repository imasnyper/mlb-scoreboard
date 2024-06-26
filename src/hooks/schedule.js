import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { compareGamesByDate } from "../util/utils";
import { scheduleAtom } from "../atoms/scheduleAtom";
import { boxscoreAtom } from "../atoms/boxscoreAtom";

export default function useSchedule() {
  const setSchedule = useSetRecoilState(scheduleAtom);
  const setBoxScores = useSetRecoilState(boxscoreAtom);
  const [loading, setLoading] = useState(true);

  async function fetchSchedule() {
    let response = await fetch(
      "https://statsapi.mlb.com/api/v1/schedule?sportId=1&hydrate=decisions,probablePitcher(note),linescore,boxscore,broadcasts,game(content(media(epg))),seriesStatus"
    );
    let data = await response.json();
    let games = data["dates"][0]["games"];
    games.sort(compareGamesByDate);

    setSchedule(games);
    setLoading(false);
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
