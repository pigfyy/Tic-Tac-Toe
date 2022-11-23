import NewGameMenu from "./assets/components/newGameMenu/NewGameMenu";
import Game from "./assets/components/game/Game";
import store from "./store";

export default function App() {
  const isStarted = store.useGameStore((state) => state.isStarted);
  return <>{isStarted === true ? <Game /> : <NewGameMenu />}</>;
}
