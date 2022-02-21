/* eslint-disable no-useless-concat */
import RubiksCubeCanvas from "./RubiksCubeCanvas";
import RubiksCubeVirtual from "./RubiksCubeVirtual";
import { COLORS } from "./data/colors";
import Cross from "./cross";
import F2L from "./F2L";
import OLL from "./OLL";
import PLL from "./PLL";
class RubiksCube {
  constructor(colors) {
    const c = colors ? colors : COLORS;
    this.rc = new RubiksCubeVirtual(c);
    this.canvas = new RubiksCubeCanvas(50, c);
    this.movePos = 0;
  }

  getCanvas() { return this.canvas.getCanvas(); }

  logError(location) {
    console.log(
      "%cSKILL ISSUE!" + "%c\n" + "%cYour cube is not in a solvable state. In order to fix this, direct message pncl#9500 on discord and challenge him to a tetris battle. 1v1 me you child, I know of STMB techniques." + "%c\n" + `%cError at: ${location}`,
      "padding: 5px; border-top: 5px solid #FFA3C9; background: #FF77B0; color: #FFFFFF; font-size: 20px;",
      "",
      "padding: 5px; color: white; background: #DA3CAE; font-size: 14px;",
      "",
      "padding: 5px; color: white; background: #232323; font-size: 14px;"
    )
  }
  getMoves() {
    if (!(new Cross(this.rc)).solve()) { this.logError("Cross"); return false; }
    if (!(new F2L(this.rc)).solve()) { this.logError("F2L"); return false; }
    if (!(new OLL(this.rc)).solve()) { this.logError("OLL"); return false; }
    if (!(new PLL(this.rc)).solve()) { this.logError("PLL"); return false; }
    this.moves = this.rc.getMoves();
    console.log(this.moves);
    return this.moves;
  }

  async next() {
    const move = this.moves[this.movePos++];
    this.rc.do(move);
    this.canvas.do(move);
  }

  async prev() {
    let move = this.moves[--this.movePos];
    if (move[1] === "'") move = move[0];
    else if (!move[1]) move += "'";
    this.rc.do(move);
    this.canvas.do(move);
  }
}

export default RubiksCube;