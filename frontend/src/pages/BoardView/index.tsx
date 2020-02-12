import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { SwipeListView } from 'react-native-swipe-list-view';

import Button from '../../components/Button';
import Group from '../../components/Group';
import Input from '../../components/Input';
import { BoardModel } from '../../models/Board';
import api from '../../services/api';
import {
  AddButtonText,
  AddEntryButton,
  AddModalButtonsWrapper,
  Container,
  EmptyListContainer,
  EntriesContainer,
  EntryContainer,
  EntryText,
  GroupButton,
  GroupsContainer,
  Header,
  HeaderText,
  HorizontalPaddingContainer,
  Icon,
  ModalContainer,
  PaddingContainer,
  SafeArea,
} from './styles';

const screen = function BoardView({ navigation }) {
  const id = navigation.getParam('id');
  const [board, setBoard] = useState<BoardModel>(null);
  const [groupName, setGroupName] = useState('');
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [addEntryModal, setAddEntryModal] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [selectedGroupId, setSelectedGroupId] = useState(-1);
  const [content, setContent] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getBoardData();
  }, []);

  async function getBoardData() {
    setRefreshing(true);
    const response = await api.get(`/boards/${id}`);

    if (response.status === 200) {
      setBoard(response.data);
      setRefreshing(false);
    }
  }

  async function createGroup() {
    const data = {
      name: groupName,
    };

    const response = await api.post(`/boards/${id}/groups`, data);

    if (response.status === 200) {
      closeModal();
      getBoardData();
    }
  }

  async function deleteGroup(groupId: number) {
    const response = await api.delete(`/groups/${groupId}`);

    if (response.status === 204) {
      setdeleteModal(false);
      getBoardData();
    }
  }

  function closeModal() {
    setAddModal(false);
    setGroupName('');
  }

  function closeEntryModal() {
    setAddEntryModal(false);
  }

  function renderAddGroupModal() {
    return (
      <Modal
        isVisible={addModal}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        onSwipeComplete={closeModal}
        swipeDirection="down"
        avoidKeyboard={false}
      >
        <SafeArea>
          <ModalContainer>
            <Input
              value={groupName}
              onChange={setGroupName}
              placeholder="Group Name"
              returnKeyType="done"
              autoCapitalize="words"
              autoCorrect={false}
            />

            <PaddingContainer height={30} />

            <AddModalButtonsWrapper>
              <Button type="small" onPress={closeModal}>
                <AddButtonText>Cancel</AddButtonText>
              </Button>

              <HorizontalPaddingContainer width={20} />

              <Button type="small" onPress={() => createGroup()}>
                <AddButtonText>Add</AddButtonText>
              </Button>
            </AddModalButtonsWrapper>
          </ModalContainer>
        </SafeArea>
      </Modal>
    );
  }

  function renderDeleteGroupModal() {
    return (
      <Modal
        isVisible={deleteModal}
        onBackdropPress={() => setdeleteModal(false)}
        onBackButtonPress={() => setdeleteModal(false)}
        onSwipeComplete={() => setdeleteModal(false)}
        swipeDirection="down"
        avoidKeyboard={false}
      >
        <SafeArea>
          <ModalContainer>
            <AddButtonText>Are you sure?</AddButtonText>

            <PaddingContainer height={30} />

            <AddModalButtonsWrapper>
              <Button type="small" onPress={() => deleteGroup(selectedGroupId)}>
                <AddButtonText>Delete</AddButtonText>
              </Button>

              <HorizontalPaddingContainer width={20} />

              <Button type="small" onPress={() => setdeleteModal(false)}>
                <AddButtonText>Cancel</AddButtonText>
              </Button>
            </AddModalButtonsWrapper>
          </ModalContainer>
        </SafeArea>
      </Modal>
    );
  }

  async function createEntry() {
    const data = {
      content,
    };

    const response = await api.post(
      `/boards/${id}/groups/${selectedGroupId}/entries`,
      data,
    );

    if (response.status === 200) {
      closeEntryModal();
      getBoardData();
    }
  }

  function renderAddEntryModal() {
    return (
      <Modal
        isVisible={addEntryModal}
        onBackdropPress={closeEntryModal}
        onBackButtonPress={closeEntryModal}
        onSwipeComplete={closeEntryModal}
        swipeDirection="down"
        avoidKeyboard={false}
      >
        <SafeArea>
          <ModalContainer>
            <Input
              value={content}
              onChange={setContent}
              placeholder="Content"
              returnKeyType="done"
              autoCapitalize="words"
              autoCorrect={false}
            />

            <PaddingContainer height={30} />

            <AddModalButtonsWrapper>
              <Button type="small" onPress={closeEntryModal}>
                <AddButtonText>Cancel</AddButtonText>
              </Button>

              <HorizontalPaddingContainer width={20} />

              <Button type="small" onPress={() => createEntry()}>
                <AddButtonText>Add</AddButtonText>
              </Button>
            </AddModalButtonsWrapper>
          </ModalContainer>
        </SafeArea>
      </Modal>
    );
  }

  async function deleteEntry(entryId: number) {
    const response = await api.delete(`/entries/${entryId}`);

    getBoardData();
  }

  async function moveEntryToRight(entryId: number) {
    let groupId = selectedGroupId;
    if (selected + 1 < board?.groups?.length) {
      groupId = board?.groups[selected + 1]?.id;
    }

    const data = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      group_id: groupId,
    };
    const response = await api.put(
      `/boards/${id}/groups/${selectedGroupId}/entries/${entryId}`,
      data,
    );

    if (response.status === 200) {
      getBoardData();
    }
  }

  async function moveEntryToLeft(entryId: number) {
    let groupId = selectedGroupId;
    if (selected - 1 >= 0) {
      groupId = board?.groups[selected - 1]?.id;
    }

    const data = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      group_id: groupId,
    };
    const response = await api.put(
      `/boards/${id}/groups/${selectedGroupId}/entries/${entryId}`,
      data,
    );

    if (response.status === 200) {
      getBoardData();
    }
  }

  return (
    <Container>
      <GroupsContainer>
        <GroupButton
          onPress={() => {
            setdeleteModal(true);
            console.log(selectedGroupId);
          }}
        >
          <Icon name="minus" size={24} />
        </GroupButton>

        <FlatList
          data={board?.groups}
          horizontal
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelected(index);
                setSelectedGroupId(item.id);
              }}
            >
              <Group
                name={item.name}
                isOdd={index % 2 === 0}
                selected={selected === index}
              />
            </TouchableOpacity>
          )}
        />

        <GroupButton onPress={() => setAddModal(true)}>
          <Icon name="plus" size={24} />
        </GroupButton>
      </GroupsContainer>

      {board?.groups[selected]?.entries && (
        <EntriesContainer>
          <SwipeListView
            useFlatList
            data={board?.groups[selected]?.entries}
            keyExtractor={(rowData, index) => {
              return String(rowData.id);
            }}
            renderItem={(rowData, rowMap) => (
              <EntryContainer isOdd={rowData.index % 2 === 0}>
                <EntryText>{rowData.item.content}</EntryText>
                <TouchableOpacity onPress={() => deleteEntry(rowData.item.id)}>
                  <Icon name="delete" size={24} color="#fff" />
                </TouchableOpacity>
              </EntryContainer>
            )}
            ListHeaderComponent={() => (
              <>
                <EmptyListContainer>
                  <AddEntryButton onPress={() => setAddEntryModal(true)}>
                    <AddButtonText>ADD</AddButtonText>
                  </AddEntryButton>
                </EmptyListContainer>
                <PaddingContainer height={10} />
              </>
            )}
            stickyHeaderIndices={[0]}
            leftOpenValue={75}
            rightOpenValue={-75}
            renderHiddenItem={(rowData, rowMap) => (
              <EntryContainer isOdd={rowData.index % 2 === 0}>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    alignItems: 'flex-start',
                  }}
                  onPress={() => moveEntryToLeft(rowData.item.id)}
                >
                  <Icon name="arrow-left" size={26} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: '50%',
                    alignItems: 'flex-end',
                    paddingRight: 15,
                  }}
                  onPress={() => moveEntryToRight(rowData.item.id)}
                >
                  <Icon name="arrow-right" size={26} />
                </TouchableOpacity>
              </EntryContainer>
            )}
            onRowOpen={(rowKey, rowMap) => {
              setTimeout(() => {
                if (rowMap[rowKey] !== null) {
                  rowMap[rowKey].closeRow();
                }
              }, 2000);
            }}
          />
        </EntriesContainer>
      )}

      {renderAddGroupModal()}
      {renderDeleteGroupModal()}
      {renderAddEntryModal()}
    </Container>
  );
};

screen.navigationOptions = ({ navigation }) => {
  return {
    header: () => {
      return (
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <HeaderText>{navigation.getParam('name')}</HeaderText>
        </Header>
      );
    },
  };
};

export default screen;
