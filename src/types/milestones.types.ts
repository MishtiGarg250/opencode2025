// types/milestones.types.ts

export interface LeaderboardUser {
  rank: number;
  name: string;
  username: string;
  score: number;
  avatar: string;
  change?: number;
  userId: string;
}

export interface WeeklyLeaderboard {
  week: number;
  leaderboard: LeaderboardUser[];
  startDate: Date;
  endDate: Date;
}

export interface EventWinner {
  name: string;
  username: string;
  avatar: string;
  score?: number;
  userId: string;
  repoName?: string;
  date?: Date;
}

export interface EventWinnersMap {
  [eventName: string]: {
    [rank: number]: EventWinner[];
  };
}

export interface MilestoneResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
