import {useState, useEffect} from "react";

const useFetch = (cb, data) => {
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cb) return;

    const func = async () => {
      setLoading(true);
      setError(null);

      const response = await cb(data);

      if (!response.success) {
        setError(response.message);
      } else {
        setRes(response);
      }

      setLoading(false);
    };

    func();
  }, [cb, JSON.stringify(data)]);
  return {res, loading, error};
};

export default useFetch;
