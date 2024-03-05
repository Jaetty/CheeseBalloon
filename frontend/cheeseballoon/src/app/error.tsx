"use client";

import { useEffect } from "react";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.log("-----", error.message);
  }, []);
  return (
    <>
      <h1>ERROR</h1>
      <button
        type="button"
        onClick={() => {
          reset();
        }}
      >
        reset
      </button>
    </>
  );
}
