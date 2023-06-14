import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AddSong from "./AddSong";

const SongSearch = (username) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [debounceTimerId, setDebounceTimerId] = useState(null);

  const searchComplete = () => toast.success("Search complete!");
  const notify2 = () => toast.success("Song added!");

  // useEffect(() => {
  //   if (searching) {
  //     toast.loading("Loading...");
  //   } else {
  //     toast.dismiss();
  //   }
  // }, [searching]);

  const handleSearch = async (searchTerm) => {
    const notify = toast.loading("Searching songs...");

    if (searchTerm === "") {
      setSongs([]);
      return;
    }

    try {
      const url = `https://proxy.cors.sh/https://api.deezer.com/search?q=${searchTerm}&limit=6`;
      const config = {
        headers: {
          "x-cors-api-key": "temp_683b2273f9ecad35e545cdfca91dfada",
        },
      };
      const response = await axios.get(url, config);
      console.log(response);
      toast.dismiss(notify);
      searchComplete();
      setSongs(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    clearTimeout(debounceTimerId);
    setDebounceTimerId(
      setTimeout(() => {
        handleSearch(searchTerm);
      }, 500)
    );
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSongs([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <form className="text-2xl">
        <div className="text flex flex-1 flex-row m-5 max-w-full">
          <input
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search for a song"
            className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={handleInputChange}
          />

          <AiFillCloseCircle
            className="px-2"
            style={{ fontSize: "48px" }}
            onClick={clearSearch}
          />
        </div>
        {/* <button type="submit">Search</button> */}
      </form>
      <div className="grid grid-cols-3 m-4 align-top">
        {Array.isArray(songs) &&
          songs.map((song) => (
            <button
              onClick={() => {
                AddSong(song, username);
                notify2();
                clearSearch();
              }}
              className="hover:bg-violet-300"
            >
              <div key={song.id} className="m-4 flex flex-col items-center">
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
      <Toaster />
    </div>
  );
};

export default SongSearch;
