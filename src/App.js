import React, { useState, useEffect } from "react";
import * as storage from "./storage";
import "./App.css";

function App() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [elemToUpdate, setElemToUpdate] = useState("");
  const [cache, setCache] = useState({});

  useEffect(() => {
    (async () => {
      const loadedCache = await storage.load("cache");
      if (loadedCache) setCache(loadedCache);
    })();
  }, []);

  useEffect(() => {
    storage.save("cache", cache);
  }, [cache]);

  const emptyFieldsLeft = key === "" || value === "";

  const handleInputChange = ({ target }) => {
    target.name === "key" ? setKey(target.value) : setValue(target.value);
  };

  const handleCacheElemSaving = () => {
    if (elemToUpdate !== "") delete cache[elemToUpdate];
    const updatedCache = { ...cache, [key]: value };
    setCache(updatedCache);
    setKey("");
    setValue("");
  };

  const handleCacheElemChange = ({ target }) => {
    const cacheElemToUpdate = target.closest("tr").id;
    setElemToUpdate(cacheElemToUpdate);
    setKey(cacheElemToUpdate);
    setValue(cache[cacheElemToUpdate]);
  };

  console.log(Object.entries(cache));

  return (
    <div className="app">
      <h1 className="title">Cache App</h1>
      <input
        className="input-field"
        type="text"
        name="key"
        value={key}
        placeholder="Enter key"
        onChange={handleInputChange}
      />
      <input
        className="input-field"
        type="text"
        name="value"
        value={value}
        placeholder="Enter value"
        onChange={handleInputChange}
      />

      <button
        className={`save-btn ${emptyFieldsLeft ? "disabled-btn" : ""}`}
        type="button"
        disabled={emptyFieldsLeft}
        onClick={handleCacheElemSaving}
      >
        Save
      </button>

      {Object.entries(cache).length !== 0 && (
        <table className="cache-table">
          <tbody>
            <tr className="table-row">
              <th className="table-cell">Key</th>
              <th className="table-cell">Value</th>
            </tr>
            {Object.entries(cache).map((cacheElem) => (
              <tr
                id={cacheElem[0]}
                className="table-row"
                key={cacheElem[0]}
                onClick={handleCacheElemChange}
              >
                <td className="table-cell">{cacheElem[0]}</td>
                <td className="table-cell">{cacheElem[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
