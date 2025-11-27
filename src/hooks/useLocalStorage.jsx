import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
  if (typeof window === "undefined") return initValue;

  const stored = localStorage.getItem(key);

  //if no value in storage
  if (stored === null || stored === undefined) {
    return typeof initValue === "function" ? initValue() : initValue;
  }

  //safe JSON parse
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Invalid JSON in localStorage:", e);
    return typeof initValue === "function" ? initValue() : initValue;
  }
};

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => getLocalValue(key, initValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
