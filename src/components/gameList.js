import { useRecoilValue } from "recoil";
import Linescore from "./linescore";
import { scheduleAtom } from "../atoms/scheduleAtom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function* generateChunks(array, size) {
  let start = 0;
  while (start < array.length) {
    yield array.slice(start, start + size);
    start += size;
  }
}

function getChunks(array, size) {
  return [...generateChunks(array, size)];
}

export default function GameList() {
  let games = useRecoilValue(scheduleAtom);
  let rows = getChunks(games, 2);
  console.log(games);
  return (
    <Container className="game-list">
      {rows.map((gamePair, index) => {
        return (
          <Row key={"game-row-" + index}>
            <Col>
              <Linescore key={gamePair[0].gamePk} game={gamePair[0]} />
            </Col>
            {gamePair[1] !== undefined ? (
              <Col>
                <Linescore key={gamePair[1].gamePk} game={gamePair[1]} />
              </Col>
            ) : (
              <></>
            )}
          </Row>
        );
        // return <Linescore key={game.gamePk} game={game} />;
      })}
    </Container>
  );
}
