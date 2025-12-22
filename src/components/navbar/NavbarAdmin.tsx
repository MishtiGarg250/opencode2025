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
import { useEffect, useLayoutEffect, useRef, useState, useContext } from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { IoMenuOutline } from "react-icons/io5";
import { gsap } from "gsap";
import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/navigation";
import { SidebarContext } from "contexts/SidebarContext";

interface AdminNavbarProps {
  brandText: string;
  logoText?: string;
  secondary?: boolean;
  message?: string | boolean;
  fixed?: boolean;
}

export default function AdminNavbar(_props: AdminNavbarProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const navbarBg = useColorModeValue(
    "linear(to-b, #f6f7ff 0%, #edeaff 70%, rgba(237,234,255,0) 100%)",
    "linear(to-b, #0b1437 0%, #0e1b4d 60%, rgba(14,27,77,0) 100%)"
  );

  const { setToggleSidebar } = useContext(SidebarContext);
  const auth = useAuth();
  const router = useRouter();

  const navRef = useRef<HTMLDivElement | null>(null);

  const [name, setName] = useState("Guest");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  /* -------------------- Load User -------------------- */
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) return;

    try {
      const parsed = JSON.parse(user);
      setName(parsed?.name ?? "Guest");
      setAvatarUrl(parsed?.avatarUrl);
    } catch {
      setName("Guest");
    }
  }, []);

  /* -------------------- Logout -------------------- */
  const handleLogout = async () => {
    await auth.logout();
    router.push("/auth/sign-in");
  };

  /* -------------------- GSAP Animation -------------------- */
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
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.15,
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={navRef}
      position="fixed"
      top="0"
      left={{ base: "0", xl: "300px" }}
      right="0"
      h={{ base: "auto", md: "110px" }}
      px={{ base: "16px", md: "40px" }}
      pt={{ base: "14px", md: "22px" }}
      pb={{ base: "12px", md: "0px" }}
      zIndex="20"
      bgGradient={navbarBg}
    >
      <Flex
        justify="space-between"
        align="center"
        flexWrap="wrap"
        gap={{ base: "10px", md: "0" }}
      >
        {/* ---------------- LEFT ---------------- */}
        <Box data-nav-animate flex="1" minW="0">
          <Flex align="center" gap="10px" flexWrap="wrap">
            <Text fontSize={{ base: "20px", md: "30px" }}>Hi!</Text>
            <Text
              fontSize={{ base: "26px", sm: "30px", md: "40px" }}
              fontWeight="900"
              color="purple.500"
              lineHeight="1"
              noOfLines={1}
            >
              {name}
            </Text>
          </Flex>

          <Text
            fontSize={{ base: "12px", md: "14px" }}
            color={subtitleColor}
            mt="4px"
            noOfLines={1}
          >
            Welcome to OPENCODE
          </Text>
        </Box>

        {/* ---------------- RIGHT ---------------- */}
        <Flex align="center" gap="12px" data-nav-animate>
          {/* Mobile Sidebar Button */}
          <IconButton
            display={{ base: "flex", xl: "none" }}
            aria-label="Open Menu"
            icon={<IoMenuOutline size={22} />}
            onClick={() => setToggleSidebar((prev: boolean) => !prev)}
            borderRadius="full"
            bg={useColorModeValue("white", "rgba(255,255,255,0.08)")}
            color={useColorModeValue("gray.800", "gray.100")}
            boxShadow={useColorModeValue(
              "0 6px 18px rgba(0,0,0,0.08)",
              "none"
            )}
            _hover={{
              bg: useColorModeValue(
                "gray.50",
                "rgba(255,255,255,0.15)"
              ),
            }}
          />

          {/* Theme Toggle */}
          <IconButton
            aria-label="Toggle theme"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            borderRadius="full"
            bg={useColorModeValue("white", "rgba(255,255,255,0.08)")}
            color={useColorModeValue("gray.800", "gray.100")}
          />

          {/* Avatar Menu */}
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
                borderRadius="8px"
                onClick={() => router.push("/user/profile")}
              >
                Profile Settings
              </MenuItem>

              <MenuItem
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
