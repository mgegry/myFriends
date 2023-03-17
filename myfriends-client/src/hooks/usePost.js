import React, { useEffect } from "react";
import axios from "axios";

const usePost = (url, headers, body) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .post(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, headers, body]);

  return { data, loading, error };
};

export default usePost;
