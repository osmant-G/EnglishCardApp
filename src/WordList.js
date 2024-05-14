// WordList.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const WordListContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 600px; /* 固定サイズ */
  overflow-y: auto; /* スクロール */
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const WordItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  background-color: #f0f4f8;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const WordText = styled.div`
  flex: 1;
  padding: 0 10px;
  text-align: center;
  font-weight: bold;
  color: #333;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #ff6b6b;
  color: white;
  font-size: 0.8em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ff4d4d;
  }
  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 0.8em;
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  margin-top: 20px;
  background-color: #5c7cfa;
  color: white;
  font-size: 1.2em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4dabf7;
  }
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1em;
  }
`;

const BackButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


const Input = styled.input`
  margin: 5px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: calc(33.33% - 10px);
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const WordList = ({ words, addWord, deleteWord }) => {
  const navigate = useNavigate();
  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');

  const handleAddWord = (e) => {
    e.preventDefault();
    if (newWord && newMeaning) {
      addWord({ word: newWord, meaning: newMeaning });
      setNewWord('');
      setNewMeaning('');
    }
  };

  return (
    <Container>
      <h2>単語リスト</h2>
      <WordListContainer>
        {words.map((word, index) => (
          <WordItem key={index}>
            <WordText><strong>{word.word}</strong></WordText>
            <WordText>{word.meaning}</WordText>
            <DeleteButton onClick={() => deleteWord(index)}>削除</DeleteButton>
          </WordItem>
        ))}
      </WordListContainer>
      <Form onSubmit={handleAddWord}>
        <Input
          type="text"
          placeholder="新しい単語"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        />
        <Input
          type="text"
          placeholder="意味"
          value={newMeaning}
          onChange={(e) => setNewMeaning(e.target.value)}
        />
        <Button type="submit">追加</Button>
      </Form>
      <BackButtonContainer>
        <Button onClick={() => navigate('/')}>戻る</Button>
      </BackButtonContainer>
    </Container>
  );
};

export default WordList;