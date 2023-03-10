import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const AddSong = async (song) => {
  console.log("songName", song);
  const docRef = await addDoc(collection(db, "songs"), {
    name: song.title,
    artist: song.artist.name,
    album: song.album.title,
    image: song.album.cover,
    votes: 0,
    voters: [],
  });
};

export default AddSong;
