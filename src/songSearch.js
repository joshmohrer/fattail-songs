import React, { useState, useEffect } from "react";
import axios from "axios";
import addSong from "./components/AddSong";
import { AiFillCloseCircle, AiFillPlusCircle } from "react-icons/ai";

const SongSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);

  const handleSearch = async () => {
    var url = `https://api.deezer.com/search?q=${searchTerm}&limit=6`;
    const response = await axios.get(url, {
      withCredentials: false,
      proxy: {
        host: "cors-anywhere.herokuapp.com",
        port: 443,
      },
    });
    console.log(response.data.data);
    setSongs(response.data.data);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch();
    if (searchTerm === "") {
      setSongs([]);
    }
    console.log(searchTerm);
  };

  const selectSong = (song) => {
    console.log(song);
    addSong(song);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSongs([]);
  };

  return (
    <div className="flex flex-1 flex-col">
      <form text-3xl>
        <div className="text flex flex-1 flex-row m-5 max-w-full">
          <input
            type="text"
            className="border-2 border-slate-900 "
            value={searchTerm}
            onChange={handleInputChange}
          />
          <AiFillCloseCircle onClick={clearSearch} />
        </div>
        {/* <button type="submit">Search</button> */}
      </form>
      <div className="grid grid-cols-6 m-4">
        {Array.isArray(songs) &&
          songs.map((song) => (
            <button onClick={() => selectSong(song)}>
              <div key={song.id} className="m-4">
                <img
                  src={song.album.cover_medium}
                  alt={`${song.title} album artwork`}
                />
                <p className="text-sm">
                  {song.title}
                  <br />
                  {song.artist.name}
                </p>
                {/* <audio src={song.preview} controls /> */}
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default SongSearch;
