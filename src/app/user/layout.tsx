'use client';

import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Icon,
  Portal,
  useColorModeValue,
} from '@chakra-ui/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { MdBarChart, MdHome, MdPerson } from 'react-icons/md';

import Sidebar from 'components/sidebar/Sidebar';
import Navbar from 'components/navbar/NavbarAdmin';
import Footer from 'components/footer/FooterAdmin';

import { SidebarContext } from 'contexts/SidebarContext';
import { useAuth } from 'contexts/AuthContext';
import {
  getActiveNavbar,
  getActiveNavbarText,
  getActiveRoute,
} from 'utils/navigation';
import routes from 'routes';
import { IRoute } from 'types/navigation';

interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

export default function AdminLayout(props: DashboardLayoutProps) {
  const { children, ...rest } = props;
  const auth = useAuth();

  useEffect(() => {
    document.documentElement.dir = 'ltr';
    auth.check_login();
  }, []);

  const Droutes: IRoute[] = [
    {
      name: 'Our Events',
      layout: '/user',
      path: '/home',
      icon: <Icon as={MdHome} w="20px" h="20px" />,
    },
    auth.isLoggedIn && {
      name: 'Leaderboard',
      layout: '/user',
      path: '/leaderboard',
      icon: <Icon as={MdBarChart} w="20px" h="20px" />,
    },
    auth.isLoggedIn && {
      name: 'Profile',
      layout: '/user',
      path: '/profile',
      icon: <Icon as={MdPerson} w="20px" h="20px" />,
    },
  ].filter(Boolean) as IRoute[];

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const bg = useColorModeValue('secondaryGray.300', 'navy.900');

  return (
    <Box minH="100vh" w="100%" bg={bg}>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar: () => setToggleSidebar((p) => !p),
        }}
      >
        {/* Desktop Sidebar */}
        <Box display={{ base: 'none', xl: 'block' }}>
          <Sidebar routes={Droutes} {...rest} />
        </Box>

        {/* Mobile Sidebar */}
        <Drawer
          isOpen={toggleSidebar}
          placement="left"
          onClose={() => setToggleSidebar(false)}
          size="xs"
        >
          <DrawerOverlay />
          <DrawerContent maxW="280px">
            <Sidebar routes={Droutes} {...rest} />
          </DrawerContent>
        </Drawer>

        {/* Main Content */}
        <Box
          float="right"
          minH="100vh"
          w={{ base: '100%', xl: 'calc(100% - 300px)' }}
          transition="all 0.2s ease"
        >
          <Portal>
            <Navbar
              logoText="Geekhaven"
              brandText={getActiveRoute(routes)}
              secondary={getActiveNavbar(routes)}
              message={getActiveNavbarText(routes)}
              {...rest}
            />
          </Portal>

          <Box
            mx="auto"
            pt={{ base: '90px', md: '110px' }}
            p={{ base: '8px', md: '16px', lg: '30px' }}
          >
            {children}
          </Box>

          <Footer />
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
