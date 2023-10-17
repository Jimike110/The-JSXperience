import { useState, useEffect } from "react";

const useFetch = (API) => {
  const [data, setData] = useState([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(API, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to get posts from API.");
        }
        return res.json();
      })
      .then((data) => {
        setData(data.reverse());
        setLoader(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch Aborted");
        } else {
          console.log(error);
        }
      });
    return () => abortCont.abort;
  }, [API]);

  return { data, loader };
};

export default useFetch;
