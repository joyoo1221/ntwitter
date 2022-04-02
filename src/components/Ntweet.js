import { async } from "@firebase/util";
import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

const Ntweet = ({ ntweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNtweet, setNewNtweet] = useState(ntweetObj.text);
  const NtweetTextRef = doc(dbService, "ntweets", `${ntweetObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this ntweet?");

    if (ok) {
      await deleteDoc(NtweetTextRef);
      if (ntweetObj.attachmentUrl !== "") {
        await deleteObject(ref(storageService, ntweetObj.attachmentUrl));
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(NtweetTextRef, {
      text: newNtweet,
    });
    setEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNtweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your ntweet"
              value={newNtweet}
              required
              onChange={onChange}
            ></input>
            <input type="submit" value="Update Ntweet"></input>
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{ntweetObj.text}</h4>
          {ntweetObj.attachmentUrl && (
            <img src={ntweetObj.attachmentUrl} width="50px" height="50px"></img>
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Ntweet</button>
              <button onClick={toggleEditing}>Edit Ntweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Ntweet;
