'use client';

import { Box, Divider, Flex, useColorModeValue } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import Content from 'components/sidebar/components/Content';
import { IRoute } from 'types/navigation';

/* -------------------------------------------------------------------------- */
/* DESKTOP SIDEBAR                             */
/* -------------------------------------------------------------------------- */

interface SidebarProps {
  routes: IRoute[];
}

function Sidebar({ routes }: SidebarProps) {
  const sidebarBg = useColorModeValue(
    'rgba(255,255,255,0.85)',
    'rgba(15,23,42,0.85)',
  );
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const shadow = useColorModeValue(
    '0 20px 40px rgba(0,0,0,0.08)',
    '0 20px 40px rgba(0,0,0,0.4)',
  );

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!mounted || !sidebarRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sidebarRef.current,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      );

      gsap.fromTo(
        sidebarRef.current.querySelectorAll('[data-nav-item]'),
        { x: -12, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.06,
          delay: 0.2,
        },
      );
    }, sidebarRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <Box
      display={{ base: 'none', xl: 'block' }}
      position="fixed"
      top="0"
      left="0"
      h="100vh"
      zIndex="100"
    >
      <Box
        ref={sidebarRef}
        w="300px"
        h="100vh"
        bg={sidebarBg}
        backdropFilter="blur(18px)"
        boxShadow={shadow}
        borderRight="1px solid"
        borderColor={borderColor}
      >
        <Flex
          h="72px"
          align="center"
          px="24px"
          fontWeight="900"
          fontSize="22px"
        >
          OPENCODE
          <Box ml="8px" w="10px" h="10px" bg="purple.500" borderRadius="full" />
        </Flex>

        <Divider borderColor={borderColor} />

        <Scrollbars autoHide>
          <Box px="12px" pt="12px">
            <Content routes={routes} />
          </Box>
        </Scrollbars>
      </Box>
    </Box>
  );
}

export default Sidebar;
