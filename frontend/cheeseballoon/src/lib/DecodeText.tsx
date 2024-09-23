import he from "he";

export default function decodeHtmlEntities(str: string) {
  return he.decode(str);
}
