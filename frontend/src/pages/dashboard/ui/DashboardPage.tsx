import './DashboardPage.scss';
import { Button } from '../../../shared/ui/button';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export const DashboardPage = () => {
  const [logs, setLogs] = useState<string[]>(['Все системы охлаждения работают нормально']);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  return (
    <div className="dashboard">
      <h2 className="dashboardTitle">Состояние подъемной системы</h2>
      <div className="dashboardGrid">
        {/* Top Left - Future Animation Space */}
        <div className="animationSpace"></div>

        {/* Top Right - Elevator Contents Info */}
        <div className="contentsInfo">
          <p>Weight: 500 kg</p>
        </div>

        {/* Bottom Left - Control Panel */}
        <div className="controlPanel">
          <div className="buttonRow">
            <Button
              text="Запустить проверку всех систем"
              onClick={() => addLog('Запущена проверка всех систем')}
            />
            <Button
              text="Перезагрузить все системы"
              onClick={() => addLog('Перезагрузка всех систем инициирована')}
            />
          </div>
          <div className="buttonRow">
            <Button
              text="Отправить лифт наверх/вниз"
              onClick={() => addLog('Лифт отправлен наверх/вниз')}
            />
            <Button
              text="Остановить лифт"
              onClick={() => addLog('Лифт остановлен')}
            />
            <Button
              text="Принудительное открытие дверей"
              onClick={() => addLog('Двери принудительно открыты')}
            />
            <Button
              text="Принудительное закрытие дверей"
              onClick={() => addLog('Двери принудительно закрыты')}
            />
          </div>
        </div>

        {/* Bottom Right - Text Logs */}
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