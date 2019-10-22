import React, { useState, useEffect } from "react";

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
};

export default Map;
