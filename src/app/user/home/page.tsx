'use client';

import { FetchedEvents } from 'api/events/events';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from 'contexts/AuthContext.js';
import { useEffect } from 'react';
import EventCard from '../../../components/eventCard/eventCard';
import { RingLoader } from 'react-spinners';

export default function Dashboard() {
  const router = useRouter();

  const handleLeaderboardclick = (eventName: string) => {
    router.push(`/user/leaderboard/${encodeURIComponent(eventName)}`);
  };

  const auth = useAuth();

  const { data: eventData, isLoading } = useQuery({
    queryKey: ['EventInfo'],
    queryFn: FetchedEvents,
  });

  const events = eventData?.data;

  useEffect(() => {
    const querystring = window.location.search;
    const urlParam = new URLSearchParams(querystring);
    const TokenParam = urlParam.get('token');
    if (TokenParam === null) {
      auth.check_login();
    } else localStorage.setItem('token', TokenParam);
  }, [auth]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <>
      {events?.map((event: any) => (
        <EventCard
          key={event.name}
          btnStatus={'Register'}
          name={event.name}
          des={event.description}
          image={event.logoImageURL}
          onLeaderboardClick={handleLeaderboardclick}
        />
      ))}
    </>
  );
}
