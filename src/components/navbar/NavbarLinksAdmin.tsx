"use client";
/* eslint-disable */

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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import routes from "routes";
import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function HeaderLinks(props: { secondary: boolean }) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const [profileInitials, setProfileInitials] = useState("");
  const auth = useAuth();
  const router = useRouter();

  const iconColor = useColorModeValue("gray.600", "gray.300");
  const menuBg = useColorModeValue("white", "gray.800");
  const menuHover = useColorModeValue("gray.100", "gray.700");

  const handleLogout = async () => {
    await auth.logout();
    router.push("/auth/sign-in");
  };

  useEffect(() => {
    const name: string =
      JSON.parse(localStorage.getItem("user") ?? "{}")?.name ?? "";
    setProfileInitials(
      name
        .split(" ")
        .map((n) => n?.[0])
        .slice(0, 2)
        .join("")
    );
  }, []);

  return (
    <Flex align="center" gap="12px">
      {/* Mobile sidebar toggle */}
      <SidebarResponsive routes={routes} />

      {/* Theme toggle */}
      <Button
        variant="ghost"
        p="0"
        minW="unset"
        onClick={toggleColorMode}
      >
        <Icon
          h="18px"
          w="18px"
          color={iconColor}
          as={colorMode === "light" ? IoMdMoon : IoMdSunny}
        />
      </Button>

      {/* Auth / Profile */}
      {!auth.isLoggedIn ? (
        <Link href="/auth/sign-in">
          <Button size="sm" colorScheme="purple">
            Sign in
          </Button>
        </Link>
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
              _hover={{ bg: menuHover }}
              borderRadius="8px"
            >
              <Link href="/user/profile">
                <Text fontSize="sm">Profile Settings</Text>
              </Link>
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
