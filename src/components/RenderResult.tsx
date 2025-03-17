import { PlaylistLengthDetails } from "../types/types";

interface RenderResultProps {
  vaildPlaylist: boolean;
  playlistLength: PlaylistLengthDetails | undefined;
}

const RenderResult = ({ vaildPlaylist, playlistLength }: RenderResultProps) => {
  if (!vaildPlaylist) {
    return <p className="text-red-700">❌Invalid Playlist</p>;
  } else if (playlistLength) {
    return (
      <p>
        {playlistLength.hours} hours, {playlistLength.minutes} minutes,
        {playlistLength.seconds} seconds
      </p>
    );
  }
};

export default RenderResult;
