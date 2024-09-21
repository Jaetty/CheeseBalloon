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

export interface FollowRankData {
  streamerId: number;
  name: string;
  platform: string;
  profileUrl: string;
  follower: number;
  rankDiff: number;
  diff: number;
  bookmark: boolean;
}

export interface AvgRankData {
  streamerId: number;
  name: string;
  rank: number;
  platform: string;
  profileUrl: string;
  averageViewer: number;
  rankDiff: number;
  diff: number;
  bookmark: boolean;
}

export interface TopviewRankData {
  streamerId: number;
  name: string;
  platform: string;
  profileUrl: string;
  topViewer: number;
  rankDiff: number;
  diff: number;
  bookmark: boolean;
}

export interface TimeRankData {
  streamerId: number;
  name: string;
  platform: string;
  profileUrl: string;
  totalAirTime: string;
  diff: string;
  rankDiff: number;
  bookmark: boolean;
}

export interface RatingRankData {
  streamerId: number;
  name: string;
  platform: string;
  profileUrl: string;
  rating: number;
  rankDiff: number;
  diff: number;
  bookmark: boolean;
}

export interface LiveRankData {
  streamerId: number;
  liveId: number;
  liveLogId: number;
  name: string;
  title: string;
  platform: string;
  profileUrl: string;
  category: string;
  viewerCnt: number;
  streamUrl: string;
  channelUrl: string;
  bookmark: boolean;
  rankDiff?: number;
}
export interface RankingData {
  [title: string]: {
    status: string;
    message: string;
    data:
      | FollowRankData[]
      | AvgRankData[]
      | TopviewRankData[]
      | TimeRankData[]
      | RatingRankData[]
      | LiveRankData[];
  };
}

export interface MobileState {
  value: boolean;
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
}

// export interface FavState {
//   bookmarkId: number;
//   streamerId: number;
//   name: string;
//   platform: string;
//   streamUrl: string;
//   profileUrl: string;
//   followerCnt: number;
//   isLive: boolean;
// }

export interface AccessTokenState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export interface SignInState {
  isSignIn: boolean;
  setIsSignIn: (value: boolean) => void;
}

// export interface AlertState {
//   message: string;
//   isVisible: boolean;
//   isConfirm: boolean;
//   resolveConfirm: (value: boolean) => void;
//   showAlert: (message: string) => void;
//   showConfirm: (message: string) => Promise<boolean>;
//   hideAlert: () => void;
// }
