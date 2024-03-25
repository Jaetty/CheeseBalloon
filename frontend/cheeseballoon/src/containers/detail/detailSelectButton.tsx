interface DetailSelectButtonProps {
  handleContent: (selectedContent: string) => void;
}

export default function DetailSelectButton({
  handleContent,
}: DetailSelectButtonProps) {
  return (
    <div>
      <button type="button" onClick={() => handleContent("viewer")}>
        시청자 수
      </button>
      <button type="button" onClick={() => handleContent("category")}>
        카테고리
      </button>
      <button type="button" onClick={() => handleContent("duration")}>
        방송 시간
      </button>
      <button type="button" onClick={() => handleContent("rating")}>
        시청률
      </button>
      <button type="button" onClick={() => handleContent("follwer")}>
        팔로워
      </button>
      <button type="button" onClick={() => handleContent("calendar")}>
        방송 기록
      </button>
    </div>
  );
}
