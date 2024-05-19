"use client";

import OpenMenu from "src/components/nav/item/OpenIndex";
import ClosedMenu from "src/components/nav/item/ClosedIndex";
import { useToggleState } from "src/stores/store";

export default function Menu() {
  const { value } = useToggleState();
  return <div>{value ? <OpenMenu /> : <ClosedMenu />}</div>;
}
