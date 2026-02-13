'use client';
// Chakra imports
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';

import { Image } from 'components/image/Image';

export default function NFT(props: {
  image: string;
  name: string;
  des: string;
  download: string;
  ctaLabel?: string;
}) {
  const { image, name, des, download, ctaLabel = 'Leaderboard' } = props;
  const textColor = useColorModeValue('navy.700', 'white');

  return (
    <Card
      p="20px"
      className="shadow-lg"
      maxW={{ base: '340px', md: '360px', lg: '420px' }}
      w="100%"
    >
      <Flex direction={{ base: 'column' }} justify="center" align="center">
        <Box mb={{ base: '18px', md: '20px' }} position="relative" w="100%">
          <AspectRatio ratio={16 / 9}>
            <Image src={image} w={'100%'} borderRadius="20px" alt="" />
          </AspectRatio>
        </Box>

        <Flex
          flexDirection="column"
          justify="center"
          align="center"
          h="100%"
          textAlign="center"
        >
          <Flex direction="column" align="center" justify="center" mb="12px">
            <Text
              color={textColor}
              fontSize={{ base: '2xl', md: 'xl', lg: '2xl' }}
              mb="6px"
              fontWeight="700"
            >
              {(() => {
                try {
                  return decodeURIComponent(name || '');
                } catch (_err) {
                  return name;
                }
              })()}
            </Text>
            <Text
              color="secondaryGray.700"
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight="400"
              maxW="90%"
            >
              {des}
            </Text>
          </Flex>

          <Flex mt="8px" justify="center" w="100%">
            <Link href={download}>
              <Button
                className="confet"
                variant="darkBrand"
                color="white"
                fontSize="sm"
                fontWeight="500"
                borderRadius="70px"
                px="26px"
                py="6px"
              >
                {ctaLabel}
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
