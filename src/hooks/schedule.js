import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { compareGamesByDate } from "../util/utils";
import { scheduleAtom } from "../atoms/scheduleAtom";

export default function useSchedule() {
  const [schedule, setSchedule] = useRecoilState(scheduleAtom);
  const [loading, setLoading] = useState(true);

  async function fetchSchedule() {
    let response = await fetch(
      "https://statsapi.mlb.com/api/v1/schedule?sportId=1&hydrate=decisions,probablePitcher(note),linescore"
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
