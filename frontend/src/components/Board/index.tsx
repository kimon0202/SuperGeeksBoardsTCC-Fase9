import React, { memo, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import noImage from '../../assets/no-image.png';
import { Container, Icon, Image, InfoContainer, Text, TextInput, Touchable, TouchableImage } from './styles';

interface BoardProps {
  name: string;
  image: {
    path: string;
    url: string;
  } | null;
  onIconPress?: () => void;
  onPress?: () => void;
}

interface EditableBoardProps {
  image?: string;
  onImagePress?: () => void;
  nameCallback?: (name: string) => void;
}

function Board(props: BoardProps) {
  const { name, image, onIconPress, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        elevation: 4,
      }}
    >
      <Container>
        <Image source={image ? { uri: image.url } : noImage} />
        <InfoContainer>
          <Text>{name}</Text>
          <TouchableOpacity onPress={onIconPress}>
            <Icon name="delete" size={24} />
          </TouchableOpacity>
        </InfoContainer>
      </Container>
    </TouchableOpacity>
  );
}

export default memo(Board);

export function EditableBoard(props: EditableBoardProps) {
  const { image, onImagePress, nameCallback } = props;
  const [name, setName] = useState('');

  return (
    <Container>
      <Touchable onPress={onImagePress}>
        <TouchableImage source={image ? { uri: image } : noImage} />
      </Touchable>
      <InfoContainer>
        <TextInput
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Board Name"
          returnKeyType="done"
          onSubmitEditing={() => nameCallback(name)}
        />
      </InfoContainer>
    </Container>
  );
}
