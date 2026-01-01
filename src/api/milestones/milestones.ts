const EVENT_NAME = 'OPENCODE';

import { User } from 'lucide-react';
import {UserLeaderboardData, week01Leaderboards, week02Leaderboards, week03Leaderboards,week04Leaderboards, week05Leaderboards} from '../../constants/week_wise_Leaderboard_data';

function compileWeekData(data: UserLeaderboardData[]) {
    const compiled = data.map((user) => ({
          rank: Number(user.position),            // "1" → 1
          name: user.name,
          username: user.githubid,
          avatar: user.avatarUrl,                 // using GitHub avatar directly
          score: user.points,
          prMerged: user.prmerged,
        }))
    return compiled
  }


const avatars = [
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=7',
  'https://i.pravatar.cc/150?img=9',
  'https://i.pravatar.cc/150?img=11',

]

export const weeklyLeaderboards = [
  {
    week: 1,
    startDate: '2025-12-26',
    endDate: '2026-01-02',
    leaderboard : [...compileWeekData(week01Leaderboards)]
  },

  {
    week: 2,
    startDate: '2024-01-08',
    endDate: '2024-01-14',
    leaderboard: [...compileWeekData(week02Leaderboards)]
  },

  {
    week: 3,
    startDate: '2024-01-15',
    endDate: '2024-01-21',
    leaderboard: compileWeekData(week03Leaderboards)
  },

  {
    week: 4,
    startDate: '2024-01-22',
    endDate: '2024-01-28',
    leaderboard: compileWeekData(week04Leaderboards)
  },

  {
    week: 4,
    startDate: '2024-01-22',
    endDate: '2024-01-28',
    leaderboard: compileWeekData(week05Leaderboards)
  },
];

export const demoEventWinners = {
  'Data Blitz': {
    1: [
      {
        name: 'Aman',
        username: 'aman-opencode',
        avatar: avatars[1],
        score: 620,
        date: '2024-02-10',
      },
    ],
    2: [
      {
        name: 'Shubham',
        username: 'shubham-dev',
        avatar: avatars[0],
        score: 600,
        date: '2024-02-10',
      },
    ],
    3: [
      {
        name: 'Riya',
        username: 'riya-codes',
        avatar: avatars[2],
        score: 580,
        date: '2024-02-10',
      },
    ],
  },

  'Code Guerra': {
    1: [
      {
        name: 'Shubham',
        username: 'shubham-dev',
        avatar: avatars[0],
        score: 650,
        date: '2024-02-10',
      },
      {
        name: 'Aman',
        username: 'aman-opencode',
        avatar: avatars[1],
        score: 650,
        date: '2024-02-10',
      },
    ],
    2: [
      {
        name: 'Neha',
        username: 'neha-react',
        avatar: avatars[4],
        score: 610,
        date: '2024-02-10',
      },
    ],
  },
};

// =====================
// DEMO API FUNCTIONS
// =====================

// Fetch weekly leaderboards
export const fetchWeeklyLeaderboards = async () => {
  return Promise.resolve({
    success: true,
    message: 'Weekly leaderboards fetched successfully',
    data: weeklyLeaderboards,
  });
};

// Fetch event winners
export const fetchEventWinners = async () => {
  return Promise.resolve({
    success: true,
    message: 'Event winners fetched successfully',
    data: demoEventWinners,
  });
};

// Fetch specific week leaderboard
export const fetchWeekLeaderboard = async (week: number) => {
  const weekData = weeklyLeaderboards.find((item) => item.week === week);

  if (!weekData) {
    return Promise.resolve({
      success: false,
      message: `Week ${week} not found`,
      data: null,
    });
  }

  return Promise.resolve({
    success: true,
    message: `Week ${week} leaderboard fetched successfully`,
    data: weekData,
  });
};

// Fetch specific event winners by repo name
export const fetchEventWinnersByName = async (repoName: string) => {
  const repoData = demoEventWinners[repoName as keyof typeof demoEventWinners];

  if (!repoData) {
    return Promise.resolve({
      success: false,
      message: `No winners found for ${repoName}`,
      data: {},
    });
  }

  return Promise.resolve({
    success: true,
    message: `Winners for ${repoName} fetched successfully`,
    data: repoData,
  });
};
