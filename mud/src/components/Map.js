import React, { useState, useEffect } from "react";

// Material UI imports
import Fab from "@material-ui/core/Fab";
import {
  ArrowBack,
  ArrowDownward,
  ArrowForward,
  ArrowUpward
} from "@material-ui/icons";

import axiosWithAuth from "../utils/axiosWithAuth";

const Map = props => {
  const [player, setPlayer] = useState({
    id: "",
    name: "",
    title: "",
    currentRoom: {}
  });
  const [grid, setGrid] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("https://lambda-mud-test.herokuapp.com/api/adv/init")
      .then(res => {
        console.log("GET Player", res);
        setPlayer({
          id: res.data.id,
          name: res.data.name,
          title: res.data.title,
          currentRoom: res.data.currentRoom
        });
        return axiosWithAuth().get(
          "https://lambda-mud-test.herokuapp.com/api/adv/rooms"
        );
      })
      .then(res => {
        setRooms(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const generateMap = () => {
    let grid = [];
    let counter = 0;

    for (let x = 0; x < 20; x++) {
      grid[x] = [];
      for (let y = 0; y < 20; y++) {
        grid[x][y] = null;
      }
    }
    for (let x = 0; x < 20; x++) {
      for (let y = 0; y < 20; y++) {
        grid[rooms[counter].y][rooms[counter].x] = rooms[counter];
        counter++;
      }
    }
    setGrid(grid);
  };

  const goDirection = direction => {
    axiosWithAuth()
      .post("https://lambda-mud-test.herokuapp.com/api/adv/move")
      .then(res => {
        console.log(res);
        setPlayer({
          id: res.data.id,
          name: res.data.name,
          title: res.data.title,
          currentRoom: res.data.currentRoom
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const goNorth = e => {
    e.preventDefault();
    const north = {
      direction: "n"
    };
    goDirection(north);
  };

  const goSouth = e => {
    e.preventDefault();
    const south = {
      direction: "s"
    };
    goDirection(south);
  };

  const goEast = e => {
    e.preventDefault();
    const east = {
      direction: "e"
    };
    goDirection(east);
  };

  const goWest = e => {
    e.preventDefault();
    const west = {
      direction: "w"
    };
    goDirection(west);
  };

  return (
    <div className="map-wrapper">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          marginLeft: "40px"
        }}
      >
        {/* <button
          style={{ marginTop: "80px", width: "200px", height: "50px" }}
          onClick={this.logOut}
        >
          {" "}
          Log Out{" "}
        </button> */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px"
          }}
        >
          <Fab size="medium" color="secondary" onClick={() => goNorth()}>
            <ArrowUpward />
          </Fab>
          <div>
            <Fab
              size="medium"
              color="secondary"
              style={{ marginRight: "20px" }}
              onClick={() => goWest()}
            >
              <ArrowBack />
            </Fab>
            <Fab
              size="medium"
              color="secondary"
              style={{ marginLeft: "20px" }}
              onClick={() => goEast()}
            >
              <ArrowForward />
            </Fab>
          </div>
          <Fab size="medium" color="secondary" onClick={() => goSouth()}>
            <ArrowDownward />
          </Fab>
        </div>

        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: "80px",
            maxWidth: "240px"
          }}
        >
          <h6> My Player: {this.state.name}</h6>
          <h6> Room: {this.state.title}</h6>
          <h6> Description: {this.state.description}</h6>
          <h6>
            {" "}
            Players in the Room:{" "}
            {this.state.players.map(player => (
              <>{player}, </>
            ))}
          </h6>
          <h6> {this.state.error_msg} </h6>
        </div> */}
      </div>
    </div>
  );
};

export default Map;
