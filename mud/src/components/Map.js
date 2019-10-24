import React, { useState, useEffect } from "react";
// Material UI imports
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import {
  ArrowBack,
  ArrowDownward,
  ArrowForward,
  ArrowUpward
} from "@material-ui/icons";

// import { sampleRooms } from "../utils/sampleData";
import Room from "./Room";
import axiosWithAuth from "../utils/axiosWithAuth";

import "./Map.scss";

const Map = props => {
  const [player, setPlayer] = useState({
    id: "",
    name: "",
    players: [],
    currentRoom: {
      title: "",
      description: "",
      id: null
    }
  });
  const [grid, setGrid] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // setRooms(sampleRooms.rooms); // test data
    axiosWithAuth()
      .get("/api/adv/init/")
      .then(res => {
        console.log("GET Player", res);
        setPlayer({
          id: res.data.uuid,
          name: res.data.name,
          players: res.data.players,
          currentRoom: {
            title: res.data.title,
            description: res.data.description,
            id: res.data.current_room
          }
        });
        return axiosWithAuth().get("/api/adv/get_rooms/");
      })
      .then(res => {
        console.log(res);
        setRooms(res.data.rooms);
        // generateMap();
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      console.log(rooms);
      generateMap();
    }
  }, [rooms]);

  const generateMap = () => {
    let grid1 = [];
    let counter = 0;

    for (let x = 0; x < 11; x++) {
      grid1[x] = [];
      for (let y = 0; y < 11; y++) {
        grid1[x][y] = null;
      }
    }
    console.log(grid1);
    for (let x = 0; x < 11; x++) {
      for (let y = 0; y < 11; y++) {
        // console.log(counter);
        // console.log(rooms);
        // console.log(rooms[counter]);
        // Change line below once endpoints work
        grid1[x][y] = rooms[counter];
        counter++;
      }
    }
    console.log(grid1);
    setGrid(grid1);
  };

  const goDirection = direction => {
    console.log(direction);
    axiosWithAuth()
      .post("/api/adv/move/", direction)
      .then(res => {
        console.log(res);
        setPlayer({
          id: res.data.uuid,
          name: res.data.name,
          players: res.data.players,
          currentRoom: {
            title: res.data.title,
            description: res.data.description,
            id: res.data.current_room
          }
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

  const logOut = () => {
    localStorage.removeItem("token");
    // window.location.reload(false);
    props.history.push("/login");
  };

  return (
    <div className="map-wrapper">
      <div className="grid-wrapper">
        <div className="grid">
          {grid.length > 0 ? (
            grid.map(row => {
              return row.map(room => {
                return (
                  <Room room={room} playerRoomId={player.currentRoom.id} />
                ); // pass active id
              });
            })
          ) : (
            <p>Still Loading</p>
          )}
        </div>
      </div>
      <div className="control-panel">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={e => logOut()}
        >
          {" "}
          Log Out{" "}
        </Button>

        <div className="directions">
          <Fab size="medium" color="secondary" onClick={e => goNorth(e)}>
            <ArrowUpward />
          </Fab>
          <div>
            <Fab
              size="medium"
              color="secondary"
              style={{ marginRight: "20px" }}
              onClick={e => goWest(e)}
            >
              <ArrowBack />
            </Fab>
            <Fab
              size="medium"
              color="secondary"
              style={{ marginLeft: "20px" }}
              onClick={e => goEast(e)}
            >
              <ArrowForward />
            </Fab>
          </div>
          <Fab size="medium" color="secondary" onClick={e => goSouth(e)}>
            <ArrowDownward />
          </Fab>
        </div>

        <div className="game-info">
          <h6> My Player: {player.name}</h6>
          <h6> Room: {player.currentRoom.title}</h6>
          <h6> Description: {player.currentRoom.description}</h6>
          <h6>
            {" "}
            Players in the Room:{" "}
            {player.players.map(player => (
              <>{player}, </>
            ))}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Map;
