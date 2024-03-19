import DetailProfile from "@/src/containers/detail/detailProfile";
import DetailOverview from "@/src/containers/detail/detailOverview";
import DetailSelect from "@/src/containers/detail/detailSelect";
import DetailSelectedContent from "@/src/containers/detail/detailSelectedContent";

export default function DetailPage() {
  return (
    <div>
      <div>
        <div>
          <DetailProfile />
        </div>
        <div>
          <hr />
        </div>
        <div>
          <DetailOverview />
        </div>
        <div>
          <hr />
        </div>
        <div>
          <DetailSelect />
        </div>
        <div>
          <DetailSelectedContent />
        </div>
      </div>
    </div>
  );
}
