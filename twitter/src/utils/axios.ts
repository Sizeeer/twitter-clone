import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    console.log("config");

    config.params = { ...config.params, timestamp: Date.now() };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(function (config) {
  config.headers["token"] = window.localStorage.getItem("token");
  return config;
});

export { axios };
