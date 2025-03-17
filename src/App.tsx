import { useRef, useState } from "react";
import { fetchPlaylistVideos } from "./utils/fetchPlaylistVideos";
import { getPlaylistLength } from "./utils/getPlaylistLength";
import { PlaylistLengthDetails } from "./types/types";
import RenderResult from "./components/RenderResult";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [vaildPlaylist, setValidPlaylist] = useState(true);
  const [playlistLength, setPlaylistLength] = useState<
    PlaylistLengthDetails | undefined
  >();

  const handelPlayListChange = async () => {
    if (inputRef.current) {
      const playlistURL = inputRef.current.value;
      try {
        const playlistURLObj = new URL(playlistURL);
        const playlistID = playlistURLObj.searchParams.get("list");
        if (playlistURLObj.host === "youtube.com" && playlistID) {
          setValidPlaylist(true);
          const PlaylistVideos = await fetchPlaylistVideos(playlistID!);
          const PlaylistLength = getPlaylistLength(PlaylistVideos);
          if (
            PlaylistLength.hours === 0 &&
            PlaylistLength.minutes === 0 &&
            PlaylistLength.seconds === 0
          ) {
            setValidPlaylist(false);
          } else {
            setPlaylistLength(PlaylistLength);
          }
        } else {
          setValidPlaylist(false);
        }
      } catch {
        setValidPlaylist(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 h-dvh justify-center items-center">
      <input
        type="text"
        className="border rounded-2xl px-2 py-1 w-[80%] text-center"
        placeholder="https://www.youtube.com/playlist?list=id"
        onChange={handelPlayListChange}
        ref={inputRef}
      />
      <button
        onClick={handelPlayListChange}
        className="bg-red-500 text-white cursor-pointer px-4 py-2 rounded-full"
      >
        Get Details
      </button>
      <RenderResult
        playlistLength={playlistLength}
        vaildPlaylist={vaildPlaylist}
      />
    </div>
  );
}

export default App;
