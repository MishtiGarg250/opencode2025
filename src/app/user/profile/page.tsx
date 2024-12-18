'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export interface PullRequest {
  prNumber: number;
  status: string;
  title: string;
  issue: {
    issueNumber: number;
    currentPoints: number;
    repoName: string;
  };
}

export interface ProfileData {
  name: string;
  email: string;
  college: string;
  avatarUrl: string;
  githubId: string;
  discordId: string;
  PR: PullRequest[]; // Update this with the actual type of PR array
  prMerged: number;
  points: number;
  rank: number;
}

export default function ProfileSelf() {

  useEffect(() => {
    const githubID = JSON.parse(localStorage.getItem('user') ?? '{}')?.githubId;
    if (githubID) redirect(`/user/profile/${githubID}`);
    else redirect('/auth/sign-in');
  }, []);
}
