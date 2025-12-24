'use client';
/* eslint-disable */

import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from 'contexts/AuthContext';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

export default function HeaderLinks(props: { secondary: boolean }) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const [profileInitials, setProfileInitials] = useState('');
  const auth = useAuth();
  const router = useRouter();

  const iconColor = useColorModeValue('gray.600', 'gray.300');
  const menuBg = useColorModeValue('white', 'gray.800');
  const menuHover = useColorModeValue('gray.100', 'gray.700');

  const handleLogout = async () => {
    await auth.logout();
    router.push('/auth/sign-in');
  };

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const name: string = JSON.parse(userStr)?.name ?? '';
        setProfileInitials(
          name
            .split(' ')
            .map((n) => n?.[0])
            .slice(0, 2)
            .join(''),
        );
      }
    } catch (e) {
      setProfileInitials('?');
    }
  }, []);

  return (
    <Flex align="center" gap="12px">
      {/* Theme toggle */}
      <Button variant="ghost" p="0" minW="unset" onClick={toggleColorMode}>
        <Icon
          h="18px"
          w="18px"
          color={iconColor}
          as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
        />
      </Button>

      {!auth.isLoggedIn ? (
        <Button
          as={NextLink}
          href="/auth/sign-in"
          size="sm"
          colorScheme="purple"
        >
          Sign in
        </Button>
      ) : (
        <Menu>
          <MenuButton>
            <Box
              w="36px"
              h="36px"
              borderRadius="full"
              bg="purple.500"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
              fontWeight="700"
            >
              {profileInitials}
            </Box>
          </MenuButton>

          <MenuList
            bg={menuBg}
            border="none"
            borderRadius="14px"
            p="6px"
            minW="180px"
            boxShadow="0 10px 30px rgba(0,0,0,0.15)"
          >
            <MenuItem
              as={NextLink}
              href="/user/profile"
              _hover={{ bg: menuHover }}
              borderRadius="8px"
            >
              <Text fontSize="sm">Profile Settings</Text>
            </MenuItem>

            <MenuItem
              _hover={{ bg: menuHover }}
              borderRadius="8px"
              color="red.400"
              onClick={handleLogout}
            >
              <Text fontSize="sm">Log out</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
}
