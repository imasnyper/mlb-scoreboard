import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { teamColorsAtom } from "../atoms/teamColorsAtom";

function useTeamColors() {
  const BASE_URL = "https://api.teamhex.dev/leagues/mlb";
  const [allTeamColors, setAllTeamColors] = useRecoilState(teamColorsAtom);
  const [loading, setLoading] = useState(true);

  // console.log("using effect");
  useEffect(() => {
    async function getColors() {
      const response = await fetch(BASE_URL);
      const data = await response.json();

      setAllTeamColors(data);
      setLoading(false);
    }

    getColors();
    console.log(allTeamColors);
  }, []);

  return loading;
}

export { useTeamColors };
