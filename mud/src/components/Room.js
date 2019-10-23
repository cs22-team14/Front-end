import React, { useState, useEffect } from "react";
import "./Room.scss";

export default function Room(props) {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    setRoom(props.room);
  }, []);

  let borderRight = room.e === 0 ? "5px solid dodgerblue" : "5px solid red";
  let borderLeft = room.w === 0 ? "5px solid dodgerblue" : "5px solid red";
  let borderTop = room.n === 0 ? "5px solid dodgerblue" : "5px solid red";
  let borderBottom = room.s === 0 ? "5px solid dodgerblue" : "5px solid red";

  let background = props.id === room.id ? "black" : "lightgrey";

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
