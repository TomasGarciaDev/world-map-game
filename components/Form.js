import Router from "next/router";
import { useState, useContext } from "react";
import PlayerContext from "../contexts/player";
import PlayersContext from "../contexts/players";
import { nanoid } from "nanoid";
import HostButton from "./HostButton";
import { Socket } from "socket.io";

const Form = () => {
  const [name, setName] = useState("");
  const { setPlayer } = useContext(PlayerContext);
  const { setPlayers } = useContext(PlayersContext);
  const [host, setHost] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlayer = { id: "player-" + nanoid(), name: name, score: 0, host: false };
    Socket.emit("host request", newPlayer)
    {host && setHost(newPlayer.host=true)}
    setPlayer(newPlayer);
    setPlayers([newPlayer]);
    Router.push("/game");
  
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label data-testid="label">
        Enter Player Name:
        <input
          className="input-index"
          data-testid="input-name"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>Set Host</label>
        <input type='checkbox' checked={host} value={host} onChange={(e)=> setHost(e.currentTarget.checked)} />

      <button
        className="submit-btn"
        data-testid="link-to-game"
        type="submit"
        value="Submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
