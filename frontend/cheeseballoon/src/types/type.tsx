export interface ToggleStateType {
  value: boolean;
  toggle: () => void;
}

export interface LiveData {
  streamId: number;
  liveId: number;
  name: string;
  title: string;
  thumbnailUrl: string;
  platform: string;
  profileUrl: string;
  category: string;
  viewerCnt: number;
  streamUrl: string;
  channelUrl: string;
}

export interface RankingData {
  [title: string]: {
    status: string;
    message: string;
    data: Array<{
      streamId: number;
      liveId: number;
      name: string;
      title: string;
      thumbnailUrl: string;
      platform: string;
      profileUrl: string;
      category: string;
      viewerCnt: number;
      streamUrl: string;
      channelUrl: string;
    }>;
  };
}

export interface SubRankingData {
  status: string;
  message: string;
  data: Array<{
    streamId: number;
    liveId: number;
    name: string;
    title: string;
    thumbnailUrl: string;
    platform: string;
    profileUrl: string;
    category: string;
    viewerCnt: number;
    streamUrl: string;
    channelUrl: string;
  }>;
}
