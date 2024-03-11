import React, { useEffect, useState } from "react";
import "./NewCollections.css";
// import new_collection from "../Assets/new_collections";
import Item from "../Item/Item";
import { SERVER_URL } from "../../serverurl";

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);

  // console.log(JSON.stringify(new_collection));

  useEffect(() => {
    fetch(`${SERVER_URL}/newcollection`)
      .then((res) => res.json())
      .then((data) => setNew_collection(data));
  }, []);
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
