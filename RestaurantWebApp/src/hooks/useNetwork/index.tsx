import { useEffect, useState } from "react";

const useNetwork = () => {
  const [isOnline, setNetwork] = useState(window.navigator.onLine);
  useEffect(() => {
    setNetwork(window.navigator.onLine);
  }, [window.navigator.onLine])
  return { isOnline };
}

export default useNetwork;
