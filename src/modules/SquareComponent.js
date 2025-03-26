import React from "react";

// SquareComponent represents a single square in a tic-tac-toe board.
// It receives props for styling, state (X or O), and an onClick handler.

const SquareComponent = (props) => {
  // Determine the CSS classes based on props.className and default to "square"
  const classes = props.className ? `${props.className} square` : `square`;

  return (
    <span
      // Apply dynamic styling: X gets 'fc-aqua', O (or empty) gets 'fc-white'
      className={classes + (props.state === "X" ? ` fc-aqua` : ` fc-white`)}
      // Calls the onClick function with the square's index when clicked
      onClick={() => props.onClick(props.index)}
    >
      {props.state} {/* Displays X, O, or empty */}
    </span>
  );
};

export default SquareComponent;
