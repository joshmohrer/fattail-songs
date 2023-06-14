import React from "react";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import ReactAudioPlayer from "react-audio-player";
import toast, { Toaster } from "react-hot-toast";

const SongTable = ({ userName, songs }) => {
  const notify = () => toast.success("Vote added.");
  const notify2 = () => toast.success("Vote removed.");
  const notify3 = () => toast.error("Song vetoed.");
  // const notify4 = () => toast.success("Veto removed.");
  const notify4 = () => toast.success("Veto removed.");

  const voteForSong = async (song, userName) => {
    const newVoters = [];
    song.voters.forEach((voter) => {
      newVoters.push(voter);
    });
    if (!newVoters.includes(userName)) {
      newVoters.push(userName);
    }
    await updateDoc(doc(db, "songs", song.id), {
      voters: newVoters,
      votes: newVoters.length,
    });
    notify();
  };

  const removeVoteForSong = async (song, userName) => {
    const newVoters = [];
    song.voters.forEach((voter) => {
      if (voter !== userName) {
        newVoters.push(voter);
      }
    });
    notify2();
    if (newVoters.length === 0) {
      await deleteDoc(doc(db, "songs", song.id));
      return;
    }
    await updateDoc(doc(db, "songs", song.id), {
      voters: newVoters,
      votes: newVoters.length,
    });
  };

  const vetoSong = async (song, userName) => {
    console.log(userName);
    if (song.vetoed === false) {
      notify3();
      await updateDoc(doc(db, "songs", song.id), {
        vetoed: true,
        vetoer: userName,
      });
    } else {
      notify4();
      await updateDoc(doc(db, "songs", song.id), {
        vetoed: false,
        vetoer: null,
      });
    }
  };

  return (
    <div>
      <table className="table-fixed min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="w-2/12 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Art
            </th>
            <th className="w-1/12 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sample
            </th>
            <th className="w-1/4 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="w-1/4 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Artist
            </th>
            <th className="w-1/12 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Votes
            </th>
            <th className="w-2/12 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Suggested By
            </th>
            <th className="w-1/12 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vote
            </th>
            <th className="w-1/6 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Veto
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {songs.map((song) => (
            <tr
              key={song.id}
              className={
                song.vetoed === true
                  ? "line-through hover:bg-orange-200 bg-gray-50 py-4"
                  : "hover:bg-orange-200 bg-gray-50 py-4"
              }
            >
              <td className="px-2 py-4 text-center">
                <img
                  className="h-auto sm:max-w-16 sm:max-h-16"
                  src={song.image}
                  alt="album art"
                />
              </td>
              <td className="px-2 py-4">
                <div className="text-l font-medium text-gray-900">
                  <ReactAudioPlayer
                    src={song.preview}
                    style={{ width: "50%" }}
                    autoPlay={false}
                    controls
                  />
                </div>
              </td>
              <td className="px-2 py-4">
                <div className="text-l font-medium text-gray-900">
                  {song.name}
                </div>
              </td>
              <td className="px-2 py-4">
                <div className="text-l text-gray-500">{song.artist}</div>
              </td>
              <td className="px-2 py-4">
                {song.vetoed ? (
                  <div className="text-l text-gray-500 ">
                    "Vetoed by {song.vetoer}!"
                  </div>
                ) : (
                  <div className="text-l text-gray-500">
                    {song.voters.length}
                  </div>
                )}
              </td>
              <td className="px-2 py-4">
                <div className="text-l text-gray-500">{song.suggested}</div>
              </td>
              <td className="px-2 py-4">
                {!song.voters.includes(userName) && (
                  <button onClick={() => voteForSong(song, userName)}>
                    <AiFillPlusCircle
                      style={{ fontSize: "32px", color: "green" }}
                    />
                  </button>
                )}
                {song.voters.includes(userName) && (
                  <button onClick={() => removeVoteForSong(song, userName)}>
                    <AiFillMinusCircle
                      style={{ fontSize: "32px", color: "red" }}
                    />
                  </button>
                )}
              </td>
              <td className="px-2 py-4">
                {(!song.vetoed || song.vetoer === userName) && (
                  <button onClick={() => vetoSong(song, userName)}>
                    <AiTwotoneThunderbolt
                      style={{ fontSize: "24px", color: "red" }}
                    />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
};

export default SongTable;
