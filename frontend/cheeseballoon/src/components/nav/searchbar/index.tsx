import style from "src/components/nav/searchbar/searchIndex.module.scss";

export default function Searchbar() {
  return (
    <div className={style.search__container}>
      <input
        className={style.search__input}
        type="text"
        placeholder="검색"
        spellCheck="false"
      />
    </div>
  );
}
