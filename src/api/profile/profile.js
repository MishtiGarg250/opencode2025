export async function fetchLoggedInBasicDetails() {
  const token = localStorage.getItem('token');
  if (token === null) {
    auth.check_login();
  } else {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/participant/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    const data = (await response.json()).data;
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }
}

export async function sendRegData(formData) {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      console.log('Success!');
    } else {
      console.error('Registration failed:', response.statusText);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error sending registration data:', error.message);
  }
}

export async function getUserProfileByName(profileName) {
  const token = localStorage.getItem('token');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/participant/${profileName}`,
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
