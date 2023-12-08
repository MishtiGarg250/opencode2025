// Chakra imports
import { Text, useColorModeValue } from '@chakra-ui/react'
import { useState,useEffect } from 'react'
// Assets
import Project1 from 'img/profile/Project1.png'
import Project2 from 'img/profile/Project2.png'
import Project3 from 'img/profile/Project3.png'
// Custom components
import Card from 'components/card/Card'
import Project from 'views/admin/profile/components/Project'
import axios from 'axios';
import { min } from '@floating-ui/utils'

export default function Projects (props: { [x: string]: any }) {
  const { ...rest } = props
  // Chakra Color Mode
  const[TempData,setTempData] = useState(null);
  const[PRs,setPRs] = useState([]);

  useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:4000/api/v1/participant', {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
            const GitDatalocal = await response.json();
            setTempData(GitDatalocal.data);
            setPRs(GitDatalocal.data.PR)
        }
        fetchData();
  }, []);
  
  console.log(TempData)
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset'
  )
  const noOfRepos = min(PRs.length, 5)
  return (
    <Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'
      >
       Recent Contributions
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Here you can find more details about your prs.
      </Text>

      {
    
  PRs.slice(0, noOfRepos).map((pr, index) => (
    // <li key={index}>{repo.name}</li>
    <Project key={index}
        boxShadow={cardShadow}
        mb='20px'
        image={Project1}
        ranking={pr.prNumber}
        language={pr.issue.repoName}
        repoName={pr.issue.repoName}
        title={pr.issue.issueNumber}
        status={pr.status}
      />
  ))
}
     
    </Card>
  )
}
