import React, { memo, useEffect, useState } from 'react';
import { Dimensions, FlatList, Keyboard, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { SwipeListView } from 'react-native-swipe-list-view';

import Button from '../../components/Button';
import Entry from '../../components/Entry';
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
  GroupButton,
  GroupsContainer,
  Header,
  HeaderText,
  HorizontalPaddingContainer,
  Icon,
  ModalContainer,
  ModalTitle,
  PaddingContainer,
  SafeArea,
} from './styles';

const { height } = Dimensions.get('screen');

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

  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

  useEffect(() => {
    getBoardData();

    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsOpen(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsOpen(false);
    });
  }, []);

  useEffect(() => {
    return () => {
      Keyboard.removeAllListeners();
    };
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
        swipeDirection={['down', 'up', 'left', 'right']}
        avoidKeyboard={false}
        style={{
          top: keyboardIsOpen ? 0.2 * height : 0.5 * height,
          margin: 0,
        }}
      >
        {/* <KeyboardAvoidingView behavior="position"> */}
        <SafeArea>
          <ModalContainer height={keyboardIsOpen ? 100 : 70}>
            <PaddingContainer height={30} />
            <ModalTitle>Create Group</ModalTitle>

            <PaddingContainer height={30} />

            <Input
              value={groupName}
              onChange={setGroupName}
              placeholder="Group Name"
              returnKeyType="done"
              autoCorrect={false}
            />

            <PaddingContainer height={30} />

            <AddModalButtonsWrapper>
              <Button type="small" onPress={closeModal}>
                <AddButtonText>Cancel</AddButtonText>
              </Button>

              <HorizontalPaddingContainer width={20} />

              <Button type="small" onPress={() => createGroup()}>
                <AddButtonText>Save</AddButtonText>
              </Button>
            </AddModalButtonsWrapper>
          </ModalContainer>
        </SafeArea>
        {/* </KeyboardAvoidingView> */}
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
        swipeDirection={['down', 'up', 'left', 'right']}
        avoidKeyboard={false}
        style={{
          top: 0.5 * height,
          margin: 0,
        }}
      >
        {/* <KeyboardAvoidingView behavior="position"> */}
        <SafeArea>
          <ModalContainer height={70}>
            <PaddingContainer height={30} />
            <ModalTitle>Are you sure?</ModalTitle>

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
        {/* </KeyboardAvoidingView> */}
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
        swipeDirection={['down', 'up', 'left', 'right']}
        avoidKeyboard={false}
        style={{
          top: keyboardIsOpen ? 0.2 * height : 0.5 * height,
          margin: 0,
        }}
      >
        <SafeArea>
          <ModalContainer height={keyboardIsOpen ? 100 : 70}>
            <PaddingContainer height={30} />
            <ModalTitle>Create Entry</ModalTitle>

            <PaddingContainer height={30} />

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
            refreshing={refreshing}
            onRefresh={() => getBoardData()}
            data={board?.groups[selected]?.entries}
            keyExtractor={(rowData, index) => {
              return String(rowData.id);
            }}
            renderItem={(rowData, rowMap) => (
              <Entry rowData={rowData} onIconPress={deleteEntry} />
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
