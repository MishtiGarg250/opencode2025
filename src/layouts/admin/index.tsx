'use client';

// Chakra imports
import { Box, Portal } from '@chakra-ui/react';

// Layout components
import Footer from 'components/footer/FooterAdmin';
import Navbar from 'components/navbar/NavbarAdmin';
import Sidebar from 'components/sidebar/Sidebar';

import { PropsWithChildren, useState } from 'react';
import routes from 'routes';

import {
  getActiveNavbar,
  getActiveNavbarText,
  getActiveRoute,
} from 'utils/navigation';

import { ThemeProvider } from '@chakra-ui/react';
import theme from '../../theme/theme';

interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

export default function AdminLayout(props: DashboardLayoutProps) {
  const { children, ...rest } = props;
  const [fixed] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {/* Sidebar (Desktop + Mobile handled internally) */}
        <Sidebar routes={routes} {...rest} />

        {/* Main Content */}
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc(100% - 290px)' }}
          maxWidth={{ base: '100%', xl: 'calc(100% - 290px)' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          {/* Navbar */}
          <Portal>
            <Box>
              <Navbar
                {...({
                  logoText: 'Geekhaven',
                  brandText: getActiveRoute(routes),
                  secondary: getActiveNavbar(routes),
                  message: getActiveNavbarText(routes),
                  fixed,
                  ...rest,
                } as any)}
              />
            </Box>
          </Portal>

          {/* Page Content */}
          <Box
            mx="auto"
            p={{ base: '20px', md: '30px' }}
            pe="20px"
            minH="100vh"
            pt="50px"
          >
            {children}
          </Box>

          {/* Footer */}
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
