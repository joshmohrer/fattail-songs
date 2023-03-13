import React from "react";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

const SongTable = ({ userName, songs }) => {
  const notify = () => toast.success("Vote added.");
  const notify2 = () => toast.success("Vote removed.");

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

  return (
    <div className="overflow-x-auto">
      <table className="table-fixed min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Art
            </th>
            <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Artist
            </th>
            <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Votes
            </th>
            <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Suggested By
            </th>
            <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {songs.map((song) => (
            <tr key={song.id} className="hover:bg-violet-300">
              <td className="px-4 py-4 text-center">
                <img
                  className="max-w-xs h-auto sm:max-w-none sm:max-h-32"
                  src={song.image}
                  alt="album art"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-l font-medium text-gray-900">
                  {song.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-l text-gray-500">{song.artist}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-l text-gray-500">{song.voters.length}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-l text-gray-500">{song.suggested}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {!song.voters.includes(userName) && (
                  <button onClick={() => voteForSong(song, userName)}>
                    <AiFillPlusCircle />
                  </button>
                )}
                {song.voters.includes(userName) && (
                  <button onClick={() => removeVoteForSong(song, userName)}>
                    <AiFillMinusCircle />
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
