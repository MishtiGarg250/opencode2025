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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function AdminNavbar(props: {
  brandText: string;
}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [name, setName] = useState("Guest");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        setName(JSON.parse(user)?.name ?? "Guest");
      } catch {
        setName("Guest");
      }
    }
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
        <Box>
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
        <Flex align="center" gap="14px">
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

          <Avatar
            size="sm"
            name={name}
            bg="gray.100"
            color="gray.800"
            boxShadow="0 6px 18px rgba(0,0,0,0.08)"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
