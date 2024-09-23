"use client";

type Props = {
  reset: () => void;
};

export default function Error({ reset }: Props) {
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
