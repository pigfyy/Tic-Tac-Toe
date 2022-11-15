import Buttons from "./Buttons";
import MarkPicker from "./MarkPicker";
import logo from "../../imgs/logo.svg";

export default function (props) {
  return (
    <div className="grid min-h-screen place-items-center bg-neutral-900">
      <section className="w-11/12 max-w-L space-y-8">
        <img src={logo} alt="an X and an O" className="mx-auto" />
        <MarkPicker
          changePlayer1Mark={(icon) => props.changePlayer1Mark(icon)}
          player1Mark={props.player1Mark}
        />
        <Buttons startGame={(isVsCpu) => props.startGame(isVsCpu)} />
      </section>
    </div>
  );
}
