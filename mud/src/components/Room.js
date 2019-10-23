import React, { useState, useEffect } from "react";
import "./Room.scss";

export default function Room(props) {
  let borderRight = props.room.e > 0 ? "5px solid dodgerblue" : "5px solid red";
  let borderLeft = props.room.w > 0 ? "5px solid dodgerblue" : "5px solid red";
  let borderTop = props.room.n > 0 ? "5px solid dodgerblue" : "5px solid red";
  let borderBottom =
    props.room.s > 0 ? "5px solid dodgerblue" : "5px solid red";

  let background = props.playerId === props.room.id ? "black" : "lightgrey";

  return (
    <div
      className="game-board"
      style={{
        borderRight: borderRight,
        borderLeft: borderLeft,
        borderTop: borderTop,
        borderBottom: borderBottom,
        background: background
      }}
    ></div>
  );
}
