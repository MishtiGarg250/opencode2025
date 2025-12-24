'use client';

import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

type AnimatedBackgroundProps = {
  children: ReactNode;
};

const MotionBox = motion(Box);

/**
 * Matte, vector-style animated background inspired by the provided purple-on-navy artwork.
 * Shapes float slowly and react lightly to pointer movement for a premium SaaS feel.
 */
export default function AnimatedBackground({
  children,
}: AnimatedBackgroundProps) {
  const base = useColorModeValue('#0b0a18', '#070612');
  const blob = '#7c3aed';
  const blobSoft = '#6d28d9';
  const accent = '#a78bfa';

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const mainBlobX = useTransform(pointerX, (v) => v * 0.35);
  const mainBlobY = useTransform(pointerY, (v) => v * 0.25);
  const barX = useTransform(pointerX, (v) => v * 0.25);
  const circleX = useTransform(pointerX, (v) => v * 0.18);
  const circleY = useTransform(pointerY, (v) => v * 0.18);
  const crossX = useTransform(pointerX, (v) => v * 0.3);
  const crossY = useTransform(pointerY, (v) => v * 0.22);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      pointerX.set(x);
      pointerY.set(y);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [pointerX, pointerY]);

  return (
    <Box position="relative" minH="100vh" bg={base} overflow="hidden">
      {/* large diagonal blob */}
      <MotionBox
        aria-hidden
        position="absolute"
        top={{ base: '-14%', md: '-20%' }}
        right={{ base: '-30%', md: '-24%' }}
        w={{ base: '120%', md: '100%' }}
        h={{ base: '50%', md: '44%' }}
        bg={blob}
        borderRadius="120px"
        rotate="-26deg"
        opacity={0.85}
        animate={{ y: [0, -12, 0], rotate: [-26, -24, -26] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: mainBlobX, y: mainBlobY }}
        zIndex={0}
        pointerEvents="none"
      />

      {/* secondary bar */}
      <MotionBox
        aria-hidden
        position="absolute"
        bottom={{ base: '-22%', md: '-16%' }}
        right={{ base: '-36%', md: '-28%' }}
        w={{ base: '110%', md: '90%' }}
        h={{ base: '28%', md: '26%' }}
        bg={blobSoft}
        borderRadius="140px"
        rotate="-22deg"
        opacity={0.7}
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: barX }}
        zIndex={0}
        pointerEvents="none"
      />

      {/* floating circle */}
      <MotionBox
        aria-hidden
        position="absolute"
        top="34%"
        left="12%"
        w={{ base: '68px', md: '94px' }}
        h={{ base: '68px', md: '94px' }}
        bg={blob}
        borderRadius="full"
        animate={{ scale: [1, 1.07, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: circleX, y: circleY }}
        zIndex={0}
        pointerEvents="none"
      />

      {/* floating crosses */}
      <MotionBox
        aria-hidden
        position="absolute"
        top="12%"
        left="18%"
        color={accent}
        opacity={0.65}
        fontWeight="700"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        style={{ x: crossX, y: crossY }}
        zIndex={0}
        pointerEvents="none"
      >
        <Text fontSize={{ base: 'xl', md: '2xl' }} lineHeight="1">
          ×
        </Text>
      </MotionBox>
      <MotionBox
        aria-hidden
        position="absolute"
        top="18%"
        left="22%"
        color={accent}
        opacity={0.55}
        fontWeight="700"
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        style={{ x: crossX, y: crossY }}
        zIndex={0}
        pointerEvents="none"
      >
        <Text fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1">
          ×
        </Text>
      </MotionBox>

      <Box
        position="relative"
        zIndex={1}
        px={{ base: 4, md: 8 }}
        pb={{ base: 8, md: 12 }}
      >
        {children}
      </Box>
    </Box>
  );
}
