// src/api/events/pr.ts (or your specific filename)

export async function getUserPRDetails(githubId: string, eventName: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/participant/${githubId}/${eventName}/pr`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  const prEventDetails = await response.json();
  const formattedPr = prEventDetails.data;

  return formattedPr;
}

export async function EditPRPoints(prUpdateData: any) {
  // Safety check for browser environment
  if (typeof window === 'undefined') return;

  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/modify`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(prUpdateData),
      },
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.error('Error sending registration data:', error.message);
  }
}
