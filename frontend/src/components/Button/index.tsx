import React from 'react';

import { Touchable } from './styles';

interface Props {
  children?: any;
  onPress?: () => void;
  type?: 'normal' | 'small';
}

export default function Button(props: Props) {
  const { children, onPress, type } = props;

  return (
    <Touchable onPress={onPress} type={type}>
      {children}
    </Touchable>
  );
}
