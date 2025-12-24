'use client';

import { Box } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Use useRouter instead of redirect for client-side logic
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

// Define the shape of the JWT payload
interface JWTPayload {
  roles?: {
    isAdmin: boolean;
  };
  [key: string]: any;
}

export default function Addevent() {
  const router = useRouter();
  const [eventData, setEventData] = useState({
    Fullname: '',
    Description: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFiles, setCoverFiles] = useState<File[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Helper to decode JWT payload
  function parseJwt(token: string | null): JWTPayload | null {
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
  }

  // Security check: Redirect if not admin
  useEffect(() => {
    if (isMounted) {
      const token = localStorage.getItem('token');
      const payload = parseJwt(token);
      if (!payload?.roles?.isAdmin) {
        console.error('Only admin can create events');
        router.push('/user/home');
      }
    }
  }, [isMounted, router]);

  if (!isMounted) {
    return null;
  }

  const logoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0]);
    }
  };

  const coverUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setCoverFiles((prev) => [...prev, file]);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const payload = parseJwt(token);

    if (!payload?.roles?.isAdmin) {
      alert('Only admin can create events');
      return;
    }

    const formData = new FormData();
    formData.append('title', eventData.Fullname);
    formData.append('description', eventData.Description);
    // Hardcoded dates from your original code
    formData.append('startDate', '2023-12-01T00:00:00Z');
    formData.append('endDate', '2023-12-02T00:00:00Z');

    if (coverFiles && coverFiles.length > 0) {
      // Logic from your code: first file is logo, rest are covers?
      // Note: This logic seems specific to your backend requirement.
      // If you meant "logoFile" to be the logo, use that variable.
      // Below preserves your original logic:
      formData.append('logoImage', coverFiles[0]);
      coverFiles.slice(1).forEach((f) => formData.append('coverImages', f));

      // If there is also a separate logoFile uploaded
      if (logoFile) formData.append('coverImages', logoFile);
    } else {
      if (logoFile) formData.append('logoImage', logoFile);
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert('Event Created Successfully');
      // Use router.push instead of redirect() to prevent try/catch errors
      router.push('/admin/viewevents');
    } catch (error: any) {
      console.error(
        'Error creating event:',
        error?.response?.data || error.message,
      );
      alert('Failed to create event');
    }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <div className="min-h-screen flex items-center justify-center pt-12">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className=" rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="">
                  <p className="font-medium text-lg">Event Details</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        type="text"
                        name="Fullname"
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4 w-full text-black"
                        value={eventData.Fullname}
                        placeholder="Om Buddhadev"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Event Description</label>
                      <input
                        type="text"
                        name="Description"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full text-black"
                        value={eventData.Description}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="cover_image">
                        Cover Image (only one)
                      </label>
                      <input
                        id="cover_image"
                        type="file"
                        accept="image/*"
                        className="h-10 border mt-1 rounded px-4 w-full text-black"
                        onChange={coverUpload}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="logo_image">Logo Image</label>
                      <input
                        id="logo_image"
                        type="file"
                        accept="image/*"
                        className="h-10 border mt-1 rounded px-4 w-full text-black"
                        onChange={logoUpload}
                      />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
