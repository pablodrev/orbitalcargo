import './DashboardPage.scss';
import { Button } from '../../../shared/ui/button';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export const DashboardPage = () => {
  const [logs, setLogs] = useState<string[]>(['Все системы охлаждения работают нормально']);
  const [isSystemChecked, setIsSystemChecked] = useState(false);
  const [areDoorsOpen, setAreDoorsOpen] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  return (
    <div className="dashboard">
      <h2 className="dashboardTitle">Состояние подъемной системы</h2>
      <div className="dashboardGrid">
        {/* Тут будет анимация */}
        <div className="animationSpace"></div>

        {/* Тут инфа о текущей миссии */}
        <div className="contentsInfo">
          <p>Weight: 500 kg</p>
        </div>

        {/* Панель управления */}
        <div className="controlPanel">
          <div className="buttonRow">
            <Button
              text="Запустить проверку всех систем"
              onClick={() => {
                addLog('Запущена проверка всех систем');
                setIsSystemChecked(true);
              }}
            />
            <Button
              text="Перезагрузить все системы"
              onClick={() => addLog('Перезагрузка всех систем инициирована')}
            />
          </div>
          <div className="buttonRow">
            {isSystemChecked && (
              <Button
                text="Отправить лифт наверх/вниз"
                onClick={() => {
                  addLog('Лифт отправлен наверх/вниз');
                  setIsMoving(!isMoving); // Toggle motion state
                }}
              />
            )}
            {isMoving && (
              <Button
                text="Остановить лифт"
                onClick={() => {
                  addLog('Лифт остановлен');
                  setIsMoving(false);
                }}
              />
            )}
            {!areDoorsOpen && (
              <Button
                text="Принудительное открытие дверей"
                onClick={() => {
                  addLog('Двери принудительно открыты');
                  setAreDoorsOpen(true);
                }}
              />
            )}
            {areDoorsOpen && (
              <Button
                text="Принудительное закрытие дверей"
                onClick={() => {
                  addLog('Двери принудительно закрыты');
                  setAreDoorsOpen(false);
                }}
              />
            )}
          </div>
        </div>

        {/* Логи */}
        <div className="textLogs">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
      <NavLink to="/" className="backButton">
        Назад
      </NavLink>
    </div>
  );
};