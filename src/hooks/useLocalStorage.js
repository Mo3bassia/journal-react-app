import { useState, useEffect } from "react";

export function useLocalStorage(initalValue, key) {
  const [state, setState] = useState(() =>
    !localStorage.getItem(key)
      ? initalValue
      : JSON.parse(localStorage.getItem(key))
  );

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(state));
    },
    [state]
  );
  return [state, setState];
}
