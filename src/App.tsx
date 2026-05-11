import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let [selectedTrackId, setSelectedTrackId] = useState(null);
  let [selectedTrack, setSelectedTrack] = useState(null);
  let [tracks, setTracks] = useState(null);

  // сами трэки
  useEffect(() => {
    console.log("effect");

    fetch("https://musicfun.it-incubator.app/api/1.0/playlists/tracks", {
      headers: {
        "api-key": "599e0fa5-4b4a-412d-b9fd-e509a0a227c4",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setTracks(json.data);
      });
  }, []);

  if (tracks === null) {
    return (
      <div>
        <h1>Musicfun player</h1>
        <span>Loading...</span>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div>
        <h1>Musicfun player</h1>
        <span>No tracks</span>
      </div>
    );
  }

  return (
    <>
      <h1>Musicfun player</h1>
      <button
        onClick={() => {
          setSelectedTrackId(null);
          setSelectedTrack(null);
        }}
      >
        Reset selection
      </button>
      {""}
      <div className="flexContainer">
        <ul>
          {tracks.map(
            (
              track,
              // :{ id: number; title: string; url: string }
            ) => (
              <li
                key={track.id}
                className={track.id === selectedTrackId ? "selectedTrack" : ""}
              >
                <div
                  className="trackTitle"
                  onClick={() => {
                    setSelectedTrackId(track.id);
                    setSelectedTrack(null);
                    fetch(
                      "https://musicfun.it-incubator.app/api/1.0/playlists/tracks/" +
                        track.id,
                      {
                        headers: {
                          "api-key": "599e0fa5-4b4a-412d-b9fd-e509a0a227c4",
                        },
                      },
                    )
                      .then((res) => res.json())
                      .then((json) => {
                        setSelectedTrack(json.data);
                      });
                  }}
                >
                  {track.attributes.title}
                </div>
                <audio
                  className="audio"
                  controls={true}
                  src={track.attributes.attachments[0].url}
                ></audio>
              </li>
            ),
          )}
        </ul>

        {/* Детали конкретного выбранного трека */}

        <div>
          <h2>Details</h2>
          {!selectedTrackId && "Track is not selected"}
          {selectedTrackId && !selectedTrack && "Loading..."}
          {selectedTrackId &&
            selectedTrack &&
            selectedTrackId !== selectedTrack.id &&
            "...Loading"}
          {selectedTrack && (
            <div>
              <h3>{selectedTrack.attributes.title}</h3>
              <h4>Lyrics</h4>
              <p>{selectedTrack.attributes.lyrics ?? "No lyrics"}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
