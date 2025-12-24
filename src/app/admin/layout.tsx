'use client';

import { Box, Portal, useColorModeValue } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin';
import Navbar from 'components/navbar/NavbarAdmin';
import MobileMenuBar from 'components/sidebar/MobileMenuBar';
import Sidebar from 'components/sidebar/Sidebar';

import { PropsWithChildren, useState } from 'react';
import routes from 'routes';

import {
  getActiveNavbar,
  getActiveNavbarText,
  getActiveRoute,
} from 'utils/navigation';

interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

export default function AdminLayout(props: DashboardLayoutProps) {
  const { children, ...rest } = props;
  const [fixed] = useState(false);

  const bg = useColorModeValue('secondaryGray.300', 'navy.900');

  return (
    <Box minH="100vh" w="100%" bg={bg}>
      <Sidebar routes={routes} {...rest} />

      <MobileMenuBar routes={routes} />

      <Box
        float="right"
        minHeight="100vh"
        height="100%"
        overflow="auto"
        position="relative"
        w={{ base: '100%', xl: 'calc(100% - 300px)' }}
        maxWidth={{ base: '100%', xl: 'calc(100% - 300px)' }}
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        pb={{ base: '80px', xl: '0px' }}
      >
        <Portal>
          <Box>
            <Navbar
              {...({
                logoText: 'Geekhaven',
                brandText: getActiveRoute(routes),
                secondary: getActiveNavbar(routes),
                message: getActiveNavbarText(routes),
                fixed,
                routes,
                ...rest,
              } as any)}
            />
          </Box>
        </Portal>

        <Box
          mx="auto"
          p={{ base: '16px', md: '30px' }}
          pe={{ base: '16px', md: '30px' }}
          minH="100vh"
          pt={{ base: '120px', md: '110px' }}
        >
          {children}
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}
