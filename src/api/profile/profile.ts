export async function fetchLoggedInBasicDetails() {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('token');

  if (token === null) {
    console.log('No token found, redirecting to login.');
    return null;
  } else {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/participant/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    const data = (await response.json()).data;
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }
}

export async function sendRegData(formData: any) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      },
    );

    if (response.status === 200) {
      console.log('Success!');
    } else {
      console.error('Registration failed:', response.statusText);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.error('Error sending registration data:', error.message);
  }
}

export async function getUserProfileByName(profileName: string) {
  const token = localStorage.getItem('token');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/participant/${profileName}/${process.env.NEXT_PUBLIC_EVENT_NAME}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return response.json();
}
