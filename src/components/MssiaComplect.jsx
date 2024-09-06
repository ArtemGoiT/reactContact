import '../components/miscomlert.css'; // Импортируем файл стилей

import { useState, useEffect } from 'react';
import { Button, Typography, Container, List, ListItem } from '@mui/material';
import Confetti from 'react-confetti';


// Функция для генерации случайного цвета
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Функция для генерации случайных позиций
const getRandomPosition = () => {
  return {
    top: `${Math.random() * 100}vh`, // Полный диапазон высоты
    left: `${Math.random() * 100}vw`, // Полный диапазон ширины
  };
};

function MissionComponent() {
  const [names, setNames] = useState([]);
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);

  // Обновлённый список имен
  const namesList = ["Мария", "Мая" , "Арсен", "Камилла", "Игорь", "Леся", "Александр", "Наталья", "Аня","Артем"];

  const addName = () => {
    if (names.length < namesList.length) {
      // Добавляем следующее имя из списка
      setNames([...names, namesList[names.length]]);
      setAnimationVisible(true);
    }
    // Проверяем, выполнена ли миссия (все имена добавлены)
    if (names.length + 1 === namesList.length) {
      setMissionCompleted(true);
    }
  };

  useEffect(() => {
    if (animationVisible) {
      // Останавливаем анимацию через 2 секунды
      const timer = setTimeout(() => setAnimationVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [animationVisible]);

  return (
    <Container maxWidth="sm" className="mission-container">
      <Button 
        variant="contained" 
        color="primary" 
        onClick={addName} 
        disabled={missionCompleted} 
        className="add-name-button"
      >
        Добавить имя
      </Button>
      <List className="names-list">
        {names.map((name, index) => (
          <ListItem 
            key={index} 
            className="name-item" 
            style={{ color: getRandomColor() }} // Применяем случайный цвет
          >
            {name}
          </ListItem>
        ))}
      </List>
      {missionCompleted && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={500}
            recycle={true}
            className="confetti"
          />
          <Typography variant="h4" className="mission-completed">
            Миссия выполнена!
          </Typography>
        </>
      )}
      {animationVisible && (
        <div className="animation-container">
          {Array.from({ length: 30 }).map((_, index) => (
            <div key={index} className="butterfly" style={getRandomPosition()}></div>
          ))}
        </div>
      )}
    </Container>
  );
}

export default MissionComponent;
