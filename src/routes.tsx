'use client'
import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext.js';


import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'All Events',
    layout: '/user',
    path: '/home',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Add Events',
    layout: '/admin',
    path: '/addevent',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'View Events',
    layout: '/admin',
    path: '/viewevents',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Change Points',
    layout: '/admin',
    path: '/changepoints',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  
  {
    name: 'Leaderboard',
    layout: '/user',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/leaderboard',
  },
  // {
  //   name: 'Geek Market',
  //   layout: '/admin',
  //   path: '/nft-marketplace',
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   secondary: true,
  // },
 
  {
    name: 'Profile',
    layout: '/user',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: '/sign-in',
  //   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  // },
  
];

export default routes;
