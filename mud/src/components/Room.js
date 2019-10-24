import React, { useState, useEffect } from "react";
import "./Room.scss";

export default function Room(props) {
  let borderRight =
    props.room.e_to > 0 ? "5px solid dodgerblue" : "5px solid red";
  let borderLeft =
    props.room.w_to > 0 ? "5px solid dodgerblue" : "5px solid red";
  let borderTop =
    props.room.n_to > 0 ? "5px solid dodgerblue" : "5px solid red";
  let borderBottom =
    props.room.s_to > 0 ? "5px solid dodgerblue" : "5px solid red";

  let background = props.playerRoomId === props.room.id ? "black" : "lightgrey";

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
