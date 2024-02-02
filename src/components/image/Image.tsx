import { Box, ChakraComponent } from '@chakra-ui/react'
import * as React from 'react'
import NextImage from 'next/image'
import { ComponentProps } from 'react'


export const Image = (props: any) => {
  const { src, alt, ...rest } = props
  return (
    <Box overflow={'hidden'} position='relative' {...rest}>
      <NextImage  layout='fill' src={src} alt={alt} objectFit='cover'/>
    </Box>
  )
}
