// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import Information from 'views/admin/profile/components/Information';

// Assets
export default function GeneralInformation(props: {
  name: string;
  githubId: string;
  discordId: string;
  college: string;
  email: string;
  [x: string]: any;
}) {
  const { name, githubId, discordId, college, email, ...rest } = props;
  // Chakra Color Mode

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );
  return (
    <Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="15px"
      >
        General Information
      </Text>
      <SimpleGrid columns={2} row={3} rowGap="10px" columnGap='15px'>
        <Information boxShadow={cardShadow} title="Name" value={name} gridArea="1 / 1 / 2 / 2"/>
        <Information
          boxShadow={cardShadow}
          title="Github Username"
          value={githubId}
          gridArea="1 / 2 / 2 / 3"
        />
       {college && (
          <Information boxShadow={cardShadow} title="College" value={college} gridArea="2 / 1 / 3 / 2"/>
        )}
        {discordId && (
          <Information
            boxShadow={cardShadow}
            title="Discord ID"
            value={discordId}
            gridArea="2 / 2 / 3 / 3"
          />
        )}
        {email && (
          <Information boxShadow={cardShadow} title="Email" value={email} gridArea="3 / 1 / 4 / 3"/>
        )}
      </SimpleGrid>
    </Card>
  );
}
