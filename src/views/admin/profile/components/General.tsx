'use client';

// Chakra imports
import {
  Box,
  Grid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';

export default function GeneralInformation(props: {
  name: string;
  githubId: string;
  discordId?: string;
  college?: string;
  email?: string;
  gender?: string;
  year?: string;
  [x: string]: any;
}) {
  const { name, githubId, discordId, college, email, gender, year, ...rest } = props;

  const titleColor = useColorModeValue('gray.800', 'white');
  const labelColor = useColorModeValue('gray.500', 'gray.400');
  const valueColor = useColorModeValue('gray.800', 'white');
  const itemBg = useColorModeValue('gray.50', 'rgba(255,255,255,0.04)');
  

  const Item = ({
    label,
    value,
  }: {
    label: string;
    value?: string;
  }) => (
    <Box
      bg={itemBg}
      borderRadius="12px"
      px="14px"
      py="12px"
    >
      <Text
        fontSize="11px"
        fontWeight="600"
        color={labelColor}
        textTransform="uppercase"
        letterSpacing="0.6px"
        mb="4px"
      >
        {label}
      </Text>
      <Text
        fontSize="sm"
        fontWeight="600"
        color={valueColor}
        noOfLines={2}
      >
        {value || '—'}
      </Text>
    </Box>
  );

  return (
    <Card p="20px" {...rest}>
      {/* Header */}
      <Text
        fontSize="lg"
        fontWeight="800"
        color={titleColor}
        mb="16px"
      >
        General Information
      </Text>
    

      {/* Grid */}
      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
        }}
        gap="12px"
      >
       
        <Item label="Name" value={name} />
        <Item label="GitHub" value={githubId} />
        {college && <Item label="College" value={college} />}
        {gender && <Item label="Gender" value={(gender == 'male')? 'Male': 'Female'} />}
        {year && <Item label="Year" value={year} />}
        {discordId && <Item label="Discord ID" value={discordId} />}
        {email && <Item label="Email" value={email} />}
      </Grid>
    </Card>
  );
}
