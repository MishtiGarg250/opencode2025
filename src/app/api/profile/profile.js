export async function FetchedData() {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:4000/api/v1/participant/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  const newData = await response.json();

  localStorage.setItem('GithubData', JSON.stringify(newData));
  console.log(GithubData);

  return newData;
}

export async function sendRegData(formData) {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:4000/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      history.push('/user/home');
    } else {
      console.error('Registration failed:', response.statusText);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error sending registration data:', error.message);
  }
}

//   const[TempData,setTempData] = useState(' ');

//   useEffect(() => {
//     const GitDatalocal = localStorage.getItem('GithubData');
//     const ParseData = JSON.parse(GitDatalocal);
//     setTempData(ParseData);
//   }, []);

//   console.log(TempData)

// Paste on any page you want the fetch data

export async function otherUserProfile(profileName) {
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:4000/api/v1/participant/${profileName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  const OtherProfile = await response.json();


  return OtherProfile;
}

export async function getPRDetails(name) {
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:4000/api/v1/participant/${name || null}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  const prDetails = await response.json();


  const filPR = prDetails.data.PR;


  return filPR;
}