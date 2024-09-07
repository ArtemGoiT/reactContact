import  { useState } from 'react';
import '../components/miscomlert.css'; // Импортируем файл стилей
import { Button, Container, Typography, List, ListItem } from '@mui/material';
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

// Функция для генерации случайного градиента
const getRandomGradient = () => {
  const colors = [
    ['#ff9a9e', '#fad0c4'],
    ['#fbc2eb', '#a6c0fe'],
    ['#f6d365', '#fda085'],
    ['#d4fc79', '#96e6a1'],
    ['#ff6b6b', '#fcb045']
  ];
  return `linear-gradient(135deg, ${colors[Math.floor(Math.random() * colors.length)].join(', ')})`;
};

function MissionComponent() {
  const [names, setNames] = useState([]);
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [flyingName, setFlyingName] = useState(null);
  const [animationClass, setAnimationClass] = useState('');

  // Список имен
  const namesList = ["Мария", "Майя", "Арсен", "Камилла", "Игорь", "Леся", "Александр", "Наталья", "Аня", "Артем"];

  const addName = () => {
    if (names.length < namesList.length) {
      const newName = namesList[names.length];
      const gradient = getRandomGradient(); // Получаем случайный градиент для фона имени
      setFlyingName(newName);
      setAnimationClass('fullscreen'); // Запускаем анимацию полного экрана

      setTimeout(() => {
        setNames([...names, { name: newName, gradient }]);
        setFlyingName(null);
        setAnimationClass(''); // Удаляем класс анимации
      }, 2500); // Увеличиваем длительность задержки до 2.5 секунд
    }

    if (names.length + 1 === namesList.length) {
      setMissionCompleted(true);
    }
  };

  // Функция для генерации букв с разными цветами
  const splitNameToColorfulText = (name) => {
    return name.split('').map((char, index) => (
      <span key={index} style={{ color: `hsl(${(index * 360 / name.length) % 360}, 100%, 50%)` }}>
        {char}
      </span>
    ));
  };

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
      {flyingName && (
        <div className={`flying-name ${animationClass}`}>
          <Typography 
            variant="h5" 
            className="flying-name-text"
          >
            {splitNameToColorfulText(flyingName)} {/* Применяем разноцветный текст */}
          </Typography>
        </div>
      )}
      <List className="names-list">
        {names.map((item, index) => (
          <ListItem 
            key={index} 
            className="name-item" 
            style={{ background: item.gradient }} // Применяем случайный градиент
          >
            {item.name}
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
    </Container>
  );
}

export default MissionComponent;
