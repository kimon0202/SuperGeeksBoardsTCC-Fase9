import React from 'react';

import { Container, Text } from './styles';

interface Props {
  name: string;
  isOdd: boolean;
  selected: boolean;
}

export default function Group(props: Props) {
  const { name, isOdd, selected } = props;

  return (
    <Container isOdd={isOdd}>
      <Text selected={selected}>{name}</Text>
    </Container>
  );
}
