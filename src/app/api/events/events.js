export async function FetchedEvents(){
  
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/events/`,
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

    const feventsData = await response.json();
    console.log(feventsData);


    return feventsData;

}









