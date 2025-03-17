import { PlaylistLengthDetails } from "../types/types";

export const getPlaylistLength = (
  playlistVideos: []
): PlaylistLengthDetails => {
  let playListLength = 0;
  playlistVideos.forEach(({ video }: { video: { lengthSeconds: number } }) => {
    playListLength += video.lengthSeconds;
  });
  const seconds = playListLength % 60;
  const minutes = parseInt(`${(playListLength / 60) % 60}`);
  const hours = parseInt(`${(playListLength / 60 / 60) % 60}`);
  return { hours, minutes, seconds };
};
