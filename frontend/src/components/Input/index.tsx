import React, { forwardRef } from 'react';
import { NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native';

import { TextInput } from './styles';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  secureTextEntry?: boolean;
  placeholder?: string;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
  autoCorrect?: boolean;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
}

const defaultProps: Props = {
  autoCapitalize: 'none',
  autoCorrect: false,
  keyboardType: 'default',
  returnKeyType: 'done',
};

function Input(props: Props, ref) {
  const {
    value,
    onChange,
    secureTextEntry,
    placeholder,
    onEndEditing,
    autoCapitalize,
    autoCorrect,
    keyboardType,
    returnKeyType,
  } = props;

  return (
    <TextInput
      ref={ref}
      value={value}
      onChangeText={onChange}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      onEndEditing={onEndEditing}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
    />
  );
}

const toExport = forwardRef(Input);
toExport.defaultProps = defaultProps;

export default toExport;
