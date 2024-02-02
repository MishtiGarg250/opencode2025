'use client';
// Chakra Imports
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
// Custom Components
import { SidebarResponsive } from 'components/sidebar/Sidebar';
// Assets
import { FaEthereum } from 'react-icons/fa';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import routes from 'routes';
import { useAuth } from 'contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function   HeaderLinks(props: { secondary: boolean }) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const [ProfileInitals, setProfileInitials] = useState(' ');
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.logout();
    router.push('/auth/sign-in');
  };

  useEffect(() => {
    const GitDatalocal = localStorage.getItem('GithubData');
    const ParseData = JSON.parse(GitDatalocal);

    if (ParseData && ParseData.data && ParseData.data.name) {
      // Ensure TempData is defined and has the expected structure

      const words = ParseData.data.name.split(' ');

      // Get the first character of the first word
      const firstCharFirstWord = words[0].slice(0, 1);

      // Get the first character of the last word
      const lastWordIndex = words.length - 1;
      const firstCharLastWord = words[lastWordIndex].slice(0, 1);

      setProfileInitials(firstCharFirstWord + firstCharLastWord);
    }
  }, []);

  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.400', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const ethColor = useColorModeValue('gray.700', 'white');
  const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const ethBox = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );

  return (
    <Flex  justifyContent="right" w={{ sm: 'fit-content', md: 'auto' }}>

   
    <Flex
      w={{ sm: 'fit-content', md: 'auto' }}
      alignItems="center"
      justifyContent="right"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: 'nowrap', md: 'nowrap' } : 'unset'}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <Flex
        bg={ethBg}
        display={secondary ? 'flex' : 'none'}
        borderRadius="30px"
        ms="auto"
        p="6px"
        align="center"
        me="6px"
      >
        <Flex
          align="center"
          justify="center"
          bg={ethBox}
          h="29px"
          w="29px"
          borderRadius="30px"
          me="7px"
        >
          <Icon color={ethColor} w="9px" h="14px" as={FaEthereum} />
        </Flex>
        <Text
          w="max-content"
          color={ethColor}
          fontSize="sm"
          fontWeight="700"
          me="6px"
        >
          1,924
          <Text as="span" display={{ base: 'none', md: 'unset' }}>
            ETH
          </Text>
        </Text>
      </Flex>
      <SidebarResponsive routes={routes} />

      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={toggleColorMode}
      >
        <Icon
          me="10px"
          h="18px"
          w="18px"
          color={navbarIcon}
          as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
        />
      </Button>
      {!auth.isLoggedIn ? (
        <Link href="/auth/sign-in">
          <Button>Sign IN</Button>
        </Link>
      ) : (
        <Menu>
          <MenuButton p="0px" style={{ position: 'relative' }}>
            <Box
              _hover={{ cursor: 'pointer' }}
              color="white"
              bg="#11047A"
              w="40px"
              h="40px"
              borderRadius={'50%'}
            />

            <Center
              top={0}
              left={0}
              position={'absolute'}
              w={'100%'}
              h={'100%'}
            >
              <Text fontSize={'xs'} fontWeight="bold" color={'white'}>
                {ProfileInitals}
              </Text>
            </Center>
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p="0px"
            mt="10px"
            borderRadius="20px"
            bg={menuBg}
            border="none"
          >
            <Flex flexDirection="column" p="10px">
              <MenuItem
                _hover={{ bg: ethBg }}
                _focus={{ bg: ethBg }}
                borderRadius="8px"
                px="14px"
                bg={'none'}
              >
                <Link href="/user/profile">
                  <Text fontSize="sm">Profile Settings</Text>
                </Link>
              </MenuItem>

              <MenuItem
                _hover={{ bg: ethBg }}
                _focus={{ bg: ethBg }}
                color="red.400"
                borderRadius="8px"
                px="14px"
                bg={'none'}
              >
                <Button
                  onClick={handleLogout}
                  bg={'none'}
                  _hover={{ bg: 'none' }}
                >
                  <Text fontSize="sm">Log out</Text>
                </Button>
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>
      )}
    </Flex>
    </Flex>
  );
}
