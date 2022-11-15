import Buttons from "../Buttons";

export default function (props) {
  return (
    <section className="flex flex-col space-y-4">
      <Buttons
        padding={{ x: 1, y: 15 }}
        content="NEW GAME (VS CPU)"
        color="orange"
        style="primary"
        isFullWidth={true}
        handleClick={(content) =>
          props.startGame(content === "NEW GAME (VS CPU)")
        }
      />


      
      <Buttons
        padding={{ x: 1, y: 15 }}
        content="NEW GAME (VS PLAYER)"
        color="aqua"
        style="primary"
        isFullWidth={true}
        handleClick={(content) =>
          props.startGame(content === "NEW GAME (VS CPU)")
        }
      />
    </section>
  );
}
