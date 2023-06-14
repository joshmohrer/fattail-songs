import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const AddSong = async (song, userName) => {
  const voters = [];
  var suggested = "";
  suggested = userName.userName;
  voters.push(userName.userName);
  await addDoc(collection(db, "songs"), {
    name: song.title,
    artist: song.artist.name,
    album: song.album.title,
    image: song.album.cover,
    votes: 1,
    voters: voters,
    suggested: suggested,
    vetoer: null,
    vetoed: false,
    preview: song.preview,
  });
  console.log("addsong", userName);

  return;
};

export default AddSong;
