export async function getUserPRDetails(githubId,eventName){
  
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

    // if(response.status === 404 ){
    //     console.log("erorrrr")
    // }

    const preventDeatils = await response.json();
    const formattedPr = preventDeatils.data;
  


    return formattedPr;

}

export async function EditPRPoints(prUpdateData) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/modify`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(prUpdateData),
      });
  
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error sending registration data:', error.message);
    }
  }



  









