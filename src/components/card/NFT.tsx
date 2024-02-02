// Chakra imports
import {
	AvatarGroup,
	Avatar,
	Box,
	Button,
	Flex,
	Icon,
	Link,
	Text,
	useColorModeValue,
	Spacer,
	AspectRatio
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { NextAvatar } from 'components/image/Avatar';

import { Image } from 'components/image/Image';
// Assets
import { useState } from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';

export default function NFT(props: {
	image: string;
	name: string;
	des: string;
	download:string;
	
}) {
	const { image, name,des ,download } = props;
	const [ like, setLike ] = useState(false);
	const textColor = useColorModeValue('navy.700', 'white');
	const textColorBid = useColorModeValue('brand.500', 'white');
	
	return (
		<Card p='14px' className="shadow-lg">
			<Flex direction={{ base: 'column' }} justify='center'>
				<Box mb={{ base: '20px', '2xl': '20px' }} position='relative'>
					<AspectRatio ratio={7 / 5}>
						<Image src={image} w={'100%'} borderRadius='20px' alt=''/>
					</AspectRatio>
					
				</Box>
				<Flex flexDirection='column' justify='space-between' h='100%'>
					<Flex
						justify='space-between'
						direction={{
							base: 'row',
							md: 'column',
							lg: 'row',
							xl: 'column',
							'2xl': 'row'
						}}
						mb='auto'>
						<Flex direction='column'>
							<Text
								color={textColor}
								fontSize={{
									base: 'xl',
									md: 'lg',
									lg: 'lg',
									xl: 'xl',
									'2xl': 'md',
									'3xl': 'lg'
								}}
								mb='3px'
								fontWeight='bold'
								me='14px'>
								{name}
							</Text>
							<Text
								color='secondaryGray.700'
								fontSize={{
									base: 'sm'
								}}
								fontWeight='400'
								me='14px'>
								{des}
							</Text>
						</Flex>
						
					</Flex>
					<Flex
						align={{
							base: 'center',
							md: 'start',
							lg: 'center',
							xl: 'start',
							'2xl': 'center'
						}}
						justify='space-between'
						direction={{
							base: 'row',
							md: 'column',
							lg: 'row',
							xl: 'column',
							'2xl': 'row'
						}}
						mt='10px'>
						
						<Link href={download}
							
							mt={{
								base: '0px',
								md: '10px',
								lg: '0px',
								xl: '10px',
								'2xl': '0px'
							}}>
							<Button
								className='confet'
								variant='darkBrand'
								color='white'
								fontSize='sm'
								fontWeight='500'
								borderRadius='70px'
								px='24px'
								py='5px'>
								Leaderboard
							</Button>
							
						</Link>

					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
