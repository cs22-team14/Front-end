import React, { useState } from "react";

export default function Room(props) {
  const [room, setRoom] = useState(null);
  const [previousRoom, setPreviousRoom] = useState(null);

  useEffect(() => {
    setRoom(props.room);
  }, []);

  let borderRight =
    this.state.room.e_to === 0 ? "5px solid dodgerblue" : "5px solid red";
  let borderLeft =
    this.state.room.w_to === 0 ? "5px solid dodgerblue" : "5px solid red";
  let borderTop =
    this.state.room.n_to === 0 ? "5px solid dodgerblue" : "5px solid red";
  let borderBottom =
    this.state.room.s_to === 0 ? "5px solid dodgerblue" : "5px solid red";

  return <div></div>;
}
