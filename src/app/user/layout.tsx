'use client';
// Chakra imports
import {
  Portal,
  Box,
  useDisclosure,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { IRoute } from 'types/navigation';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';
import Footer from 'components/footer/FooterAdmin';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin';
import Sidebar from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import { PropsWithChildren, useEffect, useState } from 'react';
import routes from 'routes';
import {
  getActiveNavbar,
  getActiveNavbarText,
  getActiveRoute,
} from 'utils/navigation';
import { useAuth } from 'contexts/AuthContext';
interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}


export default function AdminLayout(props: DashboardLayoutProps) {
  useEffect(() => {
    window.document.documentElement.dir = 'ltr';
  },[]);
  
  const auth = useAuth();
 
  useEffect(() => {
    auth.check_login();
  }, [auth]);
  const Droutes: IRoute[] = [
    {
      name: 'Our Events',
      layout: '/user',
      path: '/home',
      icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    },
    auth.isLoggedIn && 
    {
      name: 'Leaderboard',
      layout: '/user',
      icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      path: '/leaderboard',
    },
  
    auth.isLoggedIn && 
    {
      name: 'Profile',
      layout: '/user',
      path: '/profile',
      icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    },
   
  ];




  const { children, ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const { onOpen } = useDisclosure();

  useEffect(() => {
    window.document.documentElement.dir = 'ltr';
  },[]);
  

  const bg = useColorModeValue('secondaryGray.300', 'navy.900');

  return (
    <Box h="100vh" w="100vw" bg={bg}>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={Droutes} display="none" {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%" 
          overflowX="hidden"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={'Geekhaven'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
               
                {...rest}
              />
            </Box>
          </Portal>

          <Box
            mx="auto"
            p={{ base: '20px', md: '30px' }}
            pe="20px"
            minH="100vh"
            pt="50px"
          >
            {children}
          </Box>
          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
