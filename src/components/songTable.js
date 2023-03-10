import React from "react";
import { useEffect, useState } from "react";
import {
  query,
  collection,
  onSnapshot,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AiFillPlusCircle } from "react-icons/ai";

const SongTable = (userName) => {
  const [songs, setSongs] = useState([]);

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
            voters: doc.data().voters,
            id: doc.id,
          }))
        );
      }
    );
    console.log(songs);
    return unsubscribe;
  }, []);

  console.log("songs table", songs);

  const voteForSong = async (song, userName) => {
    console.log("hi");
    const newVoters = [];
    song.voters.forEach((voter) => {
      newVoters.push(voter);
    });
    console.log(newVoters);
    if (!song.voters.includes(userName.value)) {
      newVoters.push(userName);
    }
    await updateDoc(doc(db, "songs", song.id), {
      voters: newVoters,
    });
  };

  return (
    <table className="table-auto">
      <thead>
        <tr className="space-x-5">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Art
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Artist
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Votes
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
        </tr>
      </thead>
      {songs.map((song) => (
        <tbody className="bg-white divide-y divide-gray-200">
          <tr key={song.id} className="space-x-5">
            <td className="px-6 py-4 whitespace-nowrap">
              <img src={song.image} />
            </td>
            <td className="px-6 py-4 text-2xl whitespace-nowrap">
              {song.name}
            </td>
            <td className="px-6 py-4 text-2xl whitespace-nowrap">
              {song.artist}
            </td>
            <td className="px-6 py-4 text-2xl whitespace-nowrap">
              {song.voters.length}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button onClick={() => voteForSong(song, userName)}>
                <AiFillPlusCircle />
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default SongTable;
