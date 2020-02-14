import React, { memo } from 'react';
import { ListRenderItemInfo, TouchableOpacity } from 'react-native';

import { Entry as EntryModel } from '../../models/Board';
import { EntryContainer, EntryText, Icon } from './styles';

interface Props {
  rowData: ListRenderItemInfo<EntryModel>;
  onIconPress(id: number): void;
}

function Entry(props: Props) {
  const { rowData, onIconPress } = props;

  return (
    <EntryContainer isOdd={rowData.index % 2 === 0}>
      <EntryText>{rowData.item.content}</EntryText>
      <TouchableOpacity onPress={() => onIconPress(rowData.item.id)}>
        <Icon name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    </EntryContainer>
  );
}

export default memo(Entry);
