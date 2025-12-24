import { Box, Flex, Stack } from '@chakra-ui/react';
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import { IRoute } from 'types/navigation';

interface SidebarContentProps {
  routes: IRoute[];
}

function SidebarContent(props: SidebarContentProps) {
  const { routes } = props;

  return (
    <Flex direction="column" h="100%" pt="20px" pb="20px">
      <Brand />

      <Stack direction="column" spacing="6px" mt="4px" mb="auto">
        <Box px="16px">
          <Links routes={routes} />
        </Box>
      </Stack>

      <Box px="16px" mt="40px" mb="20px" opacity={0.9}></Box>
    </Flex>
  );
}

export default SidebarContent;
