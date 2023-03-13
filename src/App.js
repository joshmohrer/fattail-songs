import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import SongSearch from "./components/SongSearch";
import SongTable from "./components/SongTable";
import BandmateSelect from "./components/BandmateSelect";

// Add a new document with a generated id.

const UpvotingApp = () => {
  const [songs, setSongs] = useState([]);
  const [userName, setUserName] = useState("");

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
            suggested: doc.data().suggested,
            voters: doc.data().voters,
            id: doc.id,
          }))
        );
      }
    );
    console.log(songs);
    return unsubscribe;
  }, []);

  return (
    <div className="container mx-auto px-4 bg-gray-100 rounded-xl">
      <div className="flex flex-col h-screen">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
          Fat Tail Song Upvoting App
        </h1>
        <p className="text-base text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget
          mauris augue.
        </p>

        <BandmateSelect setUserName={setUserName} userName={userName} />
        {console.log("userName:", userName)}
        {userName && (
          <React.Fragment>
            <div className="p-4">
              <div className="text-base text-gray-700 mb-4">
                Hi {userName}! Search for a song:
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
