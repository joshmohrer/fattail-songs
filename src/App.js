import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import SongTable from "./components/SongTable";
import BandmateSelect from "./components/BandmateSelect";
import logo from "./tmpw0elz8p0.png";
import SongSearch from "./components/SongSearch";

// Add a new document with a generated id.

const UpvotingApp = () => {
  const [songs, setSongs] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    console.log("runningUseEffect");

    const unsubscribe = onSnapshot(
      query(collection(db, "songs"), orderBy("votes", "desc")), // add orderBy clause
      (snapshot) => {
        setSongs(
          // @ts-ignore
          snapshot.docs.map((doc) => ({
            name: doc.data().name,
            artist: doc.data().artist,
            image: doc.data().image,
            album: doc.data().album,
            suggested: doc.data().suggested,
            voters: doc.data().voters,
            vetoed: doc.data().vetoed,
            vetoer: doc.data().vetoer,
            preview: doc.data().preview,
            id: doc.id,
          }))
        );
      }
    );
    return unsubscribe;
  }, []);

  return (
    <div className="py-8 container mx-auto px-4 bg-gray-100 rounded-xl">
      <div className="flex flex-col h-screen">
        <h1 className="text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-800 to-yellow-200">
          Private Key
          <br />
          Song Selector
        </h1>
        <br />

        <BandmateSelect setUserName={setUserName} userName={userName} />
        {userName && (
          <React.Fragment>
            <div className="p-4">
              <div className="text-base text-gray-700 mb-4">
                Hi {userName}! Search for a song blow, add it to the list, and
                upvote songs you want to play.
              </div>
              <SongSearch userName={userName} />
            </div>
            <div className="flex flex-col mt-4">
              <SongTable userName={userName} songs={songs} />
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default UpvotingApp;
