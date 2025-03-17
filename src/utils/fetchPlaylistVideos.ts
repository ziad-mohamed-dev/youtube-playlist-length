import axios from "axios";

export const fetchPlaylistVideos = async (id: string) => {
  const URL = "https://youtube138.p.rapidapi.com/playlist/videos";
  const options = {
    params: {
      id,
      hl: "en",
      gl: "US",
    },
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_X_RAPIDAPI_KEY,
      "x-rapidapi-host": "youtube138.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.get(URL, options);
    const playlistVideos = response.data.contents;
    return playlistVideos;
  } catch (error) {
    console.error(error);
  }
};
