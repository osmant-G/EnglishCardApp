import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import WordList from './WordList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
  position: relative;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
const Box = styled.div`
  width: 80%;
  height: 100px;
  background-color: white;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.5em;
  color: #333333;
  border-radius: 8px;
  @media (max-width: 768px) {
    font-size: 1.2em;
    height: 80px;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 25%;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    bottom: 10%;
  }
`;

const Button = styled.button`
  width: 150px;
  height: 60px;
  margin: 0 10px;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* ホバー時のアニメーション */
  &:hover {
    opacity: 0.9; /* ホバー時に少し暗くする */
  }
  @media (max-width: 768px) {
    width: 120px;
    height: 50px;
    font-size: 1em;
  }
`;

const RedButton = styled(Button)`
  background-color: #ff6b6b;
`;

const BlueButton = styled(Button)`
  background-color: #4dabf7;
`;

const TopButtonContainer = styled.div`
  padding: 15px 30px;
  position: absolute;
  font-size: 1.5em;
  top: 25%;
  display: flex;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    top: 5%;
  }
`;

const TopButton = styled(NavLink)`
  padding: 10px 20px;
  background-color: #5c7cfa;
  color: white;
  font-size: 1em;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4dabf7; /* ホバー時に色を変える */
  }
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1em;
  }
`;


function App() {
  const initialWords = [
    { word: 'Example', meaning: '例' },
    { word: 'Apple', meaning: 'リンゴ' },
    { word: 'Book', meaning: '本' },
    { word: 'Cat', meaning: '猫' },
    { word: 'Dog', meaning: '犬' },
    { word: 'Elephant', meaning: '象' },
    { word: 'Fish', meaning: '魚' },
    { word: 'Giraffe', meaning: 'キリン' },
    { word: 'House', meaning: '家' },
    { word: 'Ice', meaning: '氷' }
  ];

  const [words, setWords] = useState(() => {
    const savedWords = localStorage.getItem('words');
    return savedWords ? JSON.parse(savedWords) : initialWords;
  });

  const initialFrequencies = words.map(() => 1);
  const [frequencies, setFrequencies] = useState(initialFrequencies);
  const [currentWord, setCurrentWord] = useState(words.length > 0 ? words[0] : { word: '', meaning: '' });

  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(words));
  }, [words]);

  const getRandomWord = () => {
    const totalFrequency = frequencies.reduce((acc, freq) => acc + freq, 0);
    let random = Math.random() * totalFrequency;
    let index = -1;
    while (random > 0) {
      index++;
      random -= frequencies[index];
    }
    return words[index];
  };

  const handleBlueButtonClick = () => {
    if (words.length > 0) {
      setCurrentWord(getRandomWord());
      const updatedFrequencies = frequencies.map((freq, index) =>
        words[index].word === currentWord.word ? Math.max(freq - 1, 1) : freq
      );
      setFrequencies(updatedFrequencies);
    } else {
      setCurrentWord({ word: '', meaning: '' });
    }
  };

  const handleRedButtonClick = () => {
    if (words.length > 0) {
      setCurrentWord(getRandomWord());
      const updatedFrequencies = frequencies.map((freq, index) =>
        words[index].word === currentWord.word ? freq + 1 : freq
      );
      setFrequencies(updatedFrequencies);
    } else {
      setCurrentWord({ word: '', meaning: '' });
    }
  };

  const addWord = (newWord) => {
    setWords([...words, newWord]);
    setFrequencies([...frequencies, 1]);
  };

  const deleteWord = (index) => {
    const newWords = words.filter((_, i) => i !== index);
    const newFrequencies = frequencies.filter((_, i) => i !== index);
    setWords(newWords);
    setFrequencies(newFrequencies);
  };

  useEffect(() => {
    if (words.length === 0) {
      setCurrentWord({ word: '', meaning: '' });
    }
  }, [words]);

  return (
    <Router>
      <Routes>
        <Route path="/word-list" element={<WordList words={words} addWord={addWord} deleteWord={deleteWord} />} />
        <Route path="/" element={
          <Container>
            <TopButtonContainer>
              <TopButton to="/word-list">単語リスト</TopButton>
            </TopButtonContainer>
            <Box>{currentWord.word}</Box> {/* 上のボックスに英単語 */}
            <Box>{currentWord.meaning}</Box> {/* 下のボックスに意味 */}
            <ButtonContainer>
              <RedButton onClick={handleRedButtonClick}>覚えてない</RedButton>
              <BlueButton onClick={handleBlueButtonClick}>覚えた</BlueButton>
            </ButtonContainer>
          </Container>
        } />
      </Routes>
    </Router>
  );
}

export default App;