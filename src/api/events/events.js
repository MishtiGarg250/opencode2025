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

export async function getUserIssueDetails(githubId,eventName,repoName){
  
  const token = localStorage.getItem('token');
  
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/participant/${githubId}/${eventName}/issues`,
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

  // if(response.status === 404 ){
  //     console.log("erorrrr")
  // }

  const issueDetails = await response.json();
  console.log(issueDetails)
  const issuesAll = issueDetails.data;
  const filteredIssuesAll = issuesAll.filter(obj => obj.repoName === repoName);



if(filteredIssuesAll.length === 0){return null}
  return filteredIssuesAll[0];

}







