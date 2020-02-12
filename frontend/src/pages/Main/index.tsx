import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal';

import Board, { EditableBoard } from '../../components/Board';
import Button from '../../components/Button';
import { BoardModel } from '../../models/Board';
import api from '../../services/api';
import {
  AddButtonText,
  AddModalButtonsWrapper,
  Container,
  Header,
  HeaderText,
  HorizontalPaddingContainer,
  ModalContainer,
  PaddingContainer,
  SafeArea,
  Separator,
} from './styles';

function Main({ navigation }) {
  const [boards, setBoards] = useState<BoardModel[]>([]);
  const [lastPage, setLastPage] = useState<number>(-1);
  const [refreshing, setRefreshing] = useState(false);

  const [addModal, setAddModal] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    getBoards(1);
    getPermissions();
  }, []);

  async function getPermissions() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        // eslint-disable-next-line no-alert
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  async function getBoards(page: number, limit = 10) {
    setRefreshing(true);
    const response = await api.get(`/boards?page=${page}&limit=${limit}`);
    const { data } = response.data;

    if (response.status === 200) {
      if (page === 1) {
        setBoards(data);
      } else {
        setBoards([...boards, ...data]);
      }
    }

    setLastPage(page);
    setRefreshing(false);
  }

  async function deleteBoard(id: number) {
    const [boardIndex] = boards.map((curItem, index) => {
      // eslint-disable-line array-callback-return
      if (curItem.id === id) {
        return index;
      }

      return -1;
    });

    const response = await api.delete(`/boards/${id}`);

    if (response.status === 204) {
      getBoards(1);
    }
  }

  function closeModal() {
    setAddModal(false);
    setImage(null);
  }

  async function addBoard() {
    const data = {
      name: boardName,
    };

    const response = await api.post('/boards', data);

    if (response.status === 200) {
      const imageData = new FormData();
      imageData.append('image[]', {
        uri: image,
        type: 'image/jpeg',
        name: `${Date.now()}.jpg`,
      });

      await api.post(`/boards/${response.data.id}/image`, imageData);

      closeModal();
      getBoards(1);
    }
  }

  function viewBoard(name: string, id?: number) {
    navigation.navigate('BoardView', {
      name,
      id,
    });
  }

  function renderAddBoardModal() {
    return (
      <KeyboardAvoidingView behavior="padding">
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
              <EditableBoard
                onImagePress={() => pickImage()}
                image={image}
                nameCallback={(name: string) => {
                  setBoardName(name);
                }}
              />

              <PaddingContainer height={30} />

              <AddModalButtonsWrapper>
                <Button type="small" onPress={closeModal}>
                  <AddButtonText>Cancel</AddButtonText>
                </Button>

                <HorizontalPaddingContainer width={20} />

                <Button type="small" onPress={() => addBoard()}>
                  <AddButtonText>Save</AddButtonText>
                </Button>
              </AddModalButtonsWrapper>
            </ModalContainer>
          </SafeArea>
        </Modal>
      </KeyboardAvoidingView>
    );
  }

  return (
    <Container>
      <PaddingContainer height={30} />
      <Button onPress={() => setAddModal(true)}>
        <AddButtonText>ADD</AddButtonText>
      </Button>
      <PaddingContainer height={30} />
      <FlatList
        style={{
          width: '100%',
        }}
        data={boards}
        extraData={boards}
        horizontal
        keyExtractor={item => String(item.id)}
        ItemSeparatorComponent={() => <Separator />}
        onEndReachedThreshold={0.1}
        onEndReached={() => getBoards(lastPage + 1)}
        refreshing={refreshing}
        onRefresh={() => getBoards(1)}
        renderItem={({ item }) => {
          return (
            <Board
              name={item.name}
              image={item.image ? item.image : null}
              onPress={() => viewBoard(item.name, item.id)}
              onIconPress={() => deleteBoard(item.id)}
            />
          );
        }}
      />

      {renderAddBoardModal()}
    </Container>
  );
}

Main.navigationOptions = {
  header: () => (
    <Header>
      <HeaderText>Dashboard</HeaderText>
    </Header>
  ),
};

export default Main;
