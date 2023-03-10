import React, { useEffect, useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { collection, addDoc, query, orderBy } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import SongSearch from "./songSearch";
import addSong from "./components/AddSong";
import Select from "react-select";
import SongTable from "./components/songTable";
import AiFillPlusCircle from "react-icons/ai";

// Add a new document with a generated id.

const UpvotingApp = () => {
  const [songs, setSongs] = useState([]);
  const [userName, setUserName] = useState("");

  const userOptions = [
    { value: "Josh", label: "Josh" },
    { value: "Al", label: "Al" },
    { value: "Robby", label: "Robby" },
    { value: "Damo", label: "Damo" },
    { value: "Rajiv", label: "Rajiv" },
  ];
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "songs"), orderBy("votes", "desc")), // add orderBy clause
      (snapshot) => {
        console.log(snapshot.docs);
        setSongs(
          // @ts-ignore
          snapshot.docs.map((doc) => ({
            name: doc.data().name,
            artist: doc.data().artist,
            image: doc.data().image,
            album: doc.data().album,
            votes: doc.data().votes,
            voters: doc.data().voters,
            id: doc.id,
          }))
        );
      }
    );
    console.log(songs);
    return unsubscribe;
  }, []);

  const voteForSong = (songIndex) => {
    const songToChange = songs.filter((song) => song.id === songIndex);
    console.log("songToChange", songToChange[0].votes);
    songToChange[0].votes++;
    updateDoc(doc(db, "songs", songIndex), {
      votes: songToChange[0].votes,
    });

    //const votes = songToChange.votes;

    // const newSongs = [...songs];
    // const song = newSongs[songIndex];
    // if (song.votes < 5 && !song.voters.includes(userName)) {
    //   song.votes++;
    //   song.voters.push(userName);
    //   setSongs(newSongs);
    // }
  };

  const removeVoteForSong = (songIndex) => {
    const newSongs = [...songs];
    const song = newSongs[songIndex];
    const voterIndex = song.voters.indexOf(userName);
    if (voterIndex > -1) {
      song.votes--;
      song.voters.splice(voterIndex, 1);
      setSongs(newSongs);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-900 text-white px-4 py-2">
        Fait Tail Song List
      </div>
      <div className="flex items-center space-x-4 p-4">
        <div className="text-gray-700 font-bold text-2xl">Set User:</div>
        <Select
          defaultValue={userName}
          onChange={(selectedOption) => setUserName(selectedOption.value)}
          options={userOptions}
          className="w-64"
        />
      </div>
      {userName && (
        <div className="p-4">
          <div className="text-gray-700 font-bold mb-2">
            Hi {userName}! Search for a song:
          </div>
          <SongSearch />
          <div className="mt-4">
            <SongTable userName={userName} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UpvotingApp;
