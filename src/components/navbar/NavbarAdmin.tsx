"use client";
/* eslint-disable */

import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { gsap } from "gsap";
import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminNavbar(props: {
  brandText: string;
}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [name, setName] = useState("Guest");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const auth = useAuth();
  const router = useRouter();
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        const userName = parsed?.name ?? "Guest";
        setName(userName);
        setAvatarUrl(parsed?.avatarUrl ?? undefined);
      } catch {
        setName("Guest");
      }
    }
  }, []);

  const handleLogout = async () => {
    await auth.logout();
    router.push("/auth/sign-in");
  };

  useLayoutEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
      gsap.fromTo(
        navRef.current.querySelectorAll("[data-nav-animate]"),
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.08, delay: 0.15 }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const navbarBg = useColorModeValue(
  // Light mode (keep as-is)
  "linear(to-b, #f6f7ff 0%, #edeaff 70%, rgba(237,234,255,0) 100%)",

  // Dark mode (richer, branded)
  "linear(to-b, #0b1437 0%, #0e1b4d 60%, rgba(14,27,77,0) 100%)"
);



  return (
    
    <Box
      ref={navRef}
      position="fixed"
  top="0"
  left={{ base: "0", xl: "300px" }}
  right="0"
  h="110px"
  px={{ base: "20px", md: "40px" }}
  pt="22px"
  zIndex="20"
  bgGradient={navbarBg}
    >
      <Flex justify="space-between" align="flex-start">
        {/* LEFT */}
        <Box data-nav-animate>
          <Flex align="center" gap="10px">
            <Text fontSize="30px">Hi!</Text>
            <Text
              fontSize={{ base: "34px", md: "40px" }}
              fontWeight="900"
              color="purple.500"
              lineHeight="1"
            >
              {name}
            </Text>
          </Flex>

          <Text
            fontSize="14px"
            color={subtitleColor}
            mt="6px"
          >
            Welcome to OPENCODE
          </Text>
        </Box>

        {/* RIGHT */}
        <Flex align="center" gap="14px" data-nav-animate>
         <IconButton
  aria-label="Toggle theme"
  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
  onClick={toggleColorMode}
  borderRadius="full"
  bg={useColorModeValue("white", "rgba(255,255,255,0.08)")}
  color={useColorModeValue("gray.800", "gray.100")}
  boxShadow={useColorModeValue(
    "0 6px 18px rgba(0,0,0,0.08)",
    "none"
  )}
  _hover={{
    bg: useColorModeValue("gray.50", "rgba(255,255,255,0.15)")
  }}
/>

          <Menu>
            <MenuButton>
              <Avatar
                size="sm"
                name={name}
                src={avatarUrl}
                bg="purple.500"
                color="white"
                boxShadow="0 6px 18px rgba(0,0,0,0.08)"
              />
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.800")}
              border="none"
              borderRadius="14px"
              p="6px"
              minW="180px"
              boxShadow="0 10px 30px rgba(0,0,0,0.15)"
            >
              <MenuItem
                _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                borderRadius="8px"
                onClick={() => router.push("/user/profile")}
              >
                Profile Settings
              </MenuItem>
              <MenuItem
                _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                borderRadius="8px"
                color="red.400"
                onClick={handleLogout}
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
