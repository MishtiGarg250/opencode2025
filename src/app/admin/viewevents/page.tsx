'use client';

import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NFT from '../../../components/card/NFT';

// 1. Define Types
interface EventItem {
  name: string;
  description: string;
  logoImageURL: string;
  [key: string]: any;
}

interface JWTPayload {
  roles?: {
    isAdmin: boolean;
  };
  [key: string]: any;
}

export default function Viewevents() {
  // 2. Use State for data, not global variables
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Helper to decode JWT
  const parseJwt = (token: string | null): JWTPayload | null => {
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 3. Admin Check & Data Fetching
  useEffect(() => {
    if (!isMounted) return;

    const token = localStorage.getItem('token');
    const payload = parseJwt(token);

    // Redirect if not admin
    if (!payload?.roles?.isAdmin) {
      console.error('Only admin can view events');
      router.push('/user/home');
      return;
    }

    // Fetch Data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/events/`,
        );
        // Assuming API returns { data: [...] } based on your original code
        setEvents(response.data.data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isMounted, router]);

  const deleteHandler = async (eventName: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    const token = localStorage.getItem('token');

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/delete/${eventName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert('Event Deleted Successfully');

      // 4. Update UI instantly without reloading page
      setEvents((prev) => prev.filter((e) => e.name !== eventName));
    } catch (error) {
      console.error(error);
      alert('Failed to delete event');
    }
  };

  if (!isMounted) return null;
  if (isLoading)
    return (
      <Box pt="100px" pl="40px">
        Loading...
      </Box>
    );

  if (events.length === 0) {
    return (
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }} textAlign="center">
        <h1>NO DATA FOUND</h1>
      </Box>
    );
  }

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: '20px', md: '28px', lg: '36px' }}
        justifyItems="center"
        px={{ base: '12px', md: '20px', lg: '40px' }}
      >
        {events.map((item, i) => (
          <Box key={i} w={{ base: '320px', md: '360px', lg: '420px' }}>
            <NFT
              name={item.name}
              des={item.description}
              image={item.logoImageURL}
              download={`/admin/viewevents/${encodeURIComponent(item.name)}`}
            />
            <Box mt={3} display="flex" justifyContent="center">
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => deleteHandler(item.name)}
              >
                DELETE EVENT
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
