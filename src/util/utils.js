import ColorContrastChecker from "color-contrast-checker";
import Diamondbacks from "../team-logos/MLB/Arizona Diamondbacks.png";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    const key = item.replace("./", "").substring(0, item.length - 6);
    images[key] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../team-logos/MLB", false, /\.(png)$/)
);

function compareGamesByDate(a, b) {
  if (a.gameDate > b.gameDate) return 1;
  if (b.gameDate > a.gameDate) return -1;
  return 0;
}

function generateInningKeys(gamePk, teamId, inningNum) {
  return "" + gamePk + "--" + teamId + "--" + inningNum;
}

function getTeamColors(colors, fontSize = 16) {
  const ccc = new ColorContrastChecker();
  let color1 = colors[0].hex;
  let color2 = colors[1].hex;
  const customRatio = 0;

  if (ccc.isLevelAA(color1, color2, fontSize)) {
    return [color1, color2];
  } else {
    console.log("colors contrast not high enough");
    for (let i = 1; i < colors.length; i++) {
      if (ccc.isLevelCustom(color1, colors[i].hex, customRatio))
        return [color1, colors[i].hex];
      else console.log("color " + i + " contrast not high enough.");
    }
  }

  return [color1, "#FFF"];
}

function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  console.log("H: " + h + " S: " + s + " L: " + l);

  return { h, s, l };
}

export {
  compareGamesByDate,
  generateInningKeys,
  getTeamColors,
  hexToHSL,
  images,
};
