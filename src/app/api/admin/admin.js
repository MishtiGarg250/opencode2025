export async function getUserPRDetails(githubId,eventName){
  
    const response = await fetch(
      `http://localhost:4000/api/v1/participant/${githubId}/${eventName}/pr`,
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









