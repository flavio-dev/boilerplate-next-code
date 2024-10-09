"use client";
import { useState, useEffect } from "react";
import useDebounce from "@/customeHooks/useDebounce";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [inputText, setInputText] = useState("");
  const [players, setPlayers] = useState<tPlayer[]>([]);
  const debouncedText = useDebounce(inputText, 1000);

  useEffect(() => {
    const fetchPlayers = async (text: string) => {
      try {
        const res = await fetch(
          "https://api.balldontlie.io/v1/players?search=" + text,
          {
            headers: {
              Authorization: "a42b6000-feea-4384-ac80-69d07f6dd066",
            },
          }
        );

        const { data: players } = await res.json();

        setSearchResults(players);
      } catch (err) {
        console.log(err);
      }
    };

    if (debouncedText) {
      fetchPlayers(debouncedText);
    }
  }, [debouncedText, setSearchResults]);

  const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (e.target.value === "") {
      setSearchResults([]);
    }
  };

  const handleSelectPlayer = (player: tPlayer) => {
    setInputText("");
    setSearchResults([]);
    const listOfPlayers = [...players, player];
    setPlayers(listOfPlayers);
    console.log("list of players = ", listOfPlayers);
  };

  return (
    <div className={`default-wrapper-width ${styles.sb}`}>
      <div className={styles.sbSearchWrapper}>
        <input
          type="text"
          className={styles.sbInputText}
          onChange={handleChangeInput}
          value={inputText}
        />
        <ul className={styles.sbSearchResults}>
          {searchResults.map((player: tPlayer) => {
            return (
              <li key={player.id} onClick={() => handleSelectPlayer(player)}>
                {player.first_name} {player.last_name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
