import axios from "axios";

const callAPI = axios.create({
  baseURL: "https://motion-team2.propulsion-learn.ch/backend/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default callAPI;
