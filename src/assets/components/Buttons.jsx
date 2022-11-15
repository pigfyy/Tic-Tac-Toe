import restartIcon from "../imgs/icon-restart.svg";

export default function (props) {
  let { padding, content, color, style, isFullWidth } = props;

  const buttonStyles = {
    orangePrimary: `group rounded-2xl bg-orange-600 shadow-orangeShadow active:bg-orange-400`,
    orangeSecondary: `rounded-2xl bg-orange-600 shadow-orangeShadowThin active:bg-orange-400`,
    aquaPrimary: `rounded-2xl bg-aqua-600 shadow-aquaShadow active:bg-aqua-400`,
    neutral: `rounded-2xl bg-neutral-200 shadow-neutralShadowThin active:bg-neutral-100`,
  };
  const textStyles = {
    orangePrimary:
      "group-active:text-shadow-none text-XS font-bold uppercase text-neutral-900",
    aquaPrimary: "text-XS font-bold uppercase text-neutral-900",
    secondary: "text-XS font-bold uppercase text-neutral-900",
  };

  let buttonStyle = (() => {
    if (content === "restart" || color === "neutral") {
      return buttonStyles.neutral;
    }
    if (color === "orange") {
      switch (style) {
        case "primary":
          return buttonStyles.orangePrimary;
        default:
          return buttonStyles.orangeSecondary;
      }
    } else if (color === "aqua") {
      return buttonStyles.aquaPrimary;
    }
  })();

  buttonStyle = isFullWidth ? `${buttonStyle} w-full` : buttonStyle;

  const textStyle = (() => {
    if (content === "restart") {
      return;
    }
    if (color === "neutral" || style === "secondary") {
      return textStyles.secondary;
    }
    switch (color) {
      case "orange":
        return textStyles.orangePrimary;
      default:
        return textStyles.aquaPrimary;
    }
  })();

  const button = (() => {
    return (
      <button
        className={buttonStyle}
        style={{ padding: `${padding.y}px ${padding.x}px` }}
        onClick={() => props.handleClick(content)}
      >
        {content === "restart" ? (
          <img src={restartIcon} alt="restart icon"></img>
        ) : (
          <p className={textStyle}>{content}</p>
        )}
      </button>
    );
  })();

  return <>{button}</>;
}
