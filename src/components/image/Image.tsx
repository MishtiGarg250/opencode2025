import { Box } from '@chakra-ui/react';
import NextImage from 'next/image';

export const Image = (props: any) => {
  const { src, alt, ...rest } = props;
  if (!src) {
    return <Box overflow="hidden" position="relative" {...rest} />;
  }
  return (
    <Box overflow="hidden" position="relative" {...rest}>
      <NextImage fill src={src} alt={alt || ''} style={{ objectFit: 'cover' }} />
    </Box>
  );
};
