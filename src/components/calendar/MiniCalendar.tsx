'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { Text, Icon, useColorModeValue } from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';
import './MiniCalendar.css'; // ⬅️ IMPORTANT

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Card from 'components/card/Card';

export default function MiniCalendar(props: {
  selectRange?: boolean;
  [x: string]: any;
}) {
  const { selectRange = false, ...rest } = props;
  const [value, onChange] = useState<Date | [Date, Date]>(new Date());

  const accentColor = useColorModeValue('#7551FF', '#9F7AEA');

  return (
    <Card
      alignItems="center"
      flexDirection="column"
      w="100%"
      p="16px"
      {...rest}
    >
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={selectRange}
        view="month"
        prevLabel={<Icon as={MdChevronLeft} w="20px" h="20px" />}
        nextLabel={<Icon as={MdChevronRight} w="20px" h="20px" />}
        tileContent={null}
        className="mini-calendar"
      />

      <Text
        mt="8px"
        fontSize="xs"
        color={useColorModeValue('gray.500', 'gray.400')}
      >
        Select a date
      </Text>
    </Card>
  );
}
