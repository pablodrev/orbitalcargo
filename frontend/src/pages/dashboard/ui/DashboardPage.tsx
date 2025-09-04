import './DashboardPage.scss';
import { Button } from '../../../shared/ui/button';
import { NavLink } from 'react-router-dom';

export const DashboardPage = () => {
  return (
    <div className="dashboard">
      <h2 className="dashboardTitle">Состояние подъемной системы</h2>
      <div className="dashboardGrid">
        {/* Вот тут будет анимация */}
        <div className="animationSpace"></div>

        {/* Здесь инфа про текущую миссию */}
        <div className="contentsInfo">
          <p>Weight: 500 kg</p>
        </div>

        {/* Панель управления */}
        <div className="controlPanel">
          <div className="buttonRow">
            <Button text="Запустить проверку всех систем" onClick={() => alert('Check initiated')} />
            <Button text="Перезагрузить все системы" onClick={() => alert('Reboot initiated')} />
          </div>
          <div className="buttonRow">
            <Button text="Отправить лифт наверх/вниз" onClick={() => alert('Lift movement initiated')} />
            <Button text="Остановить лифт" onClick={() => alert('Lift stopped')} />
            <Button text="Принудительное открытие дверей" onClick={() => alert('Doors opened')} />
            <Button text="Принудительное закрытие дверей" onClick={() => alert('Doors closed')} />
          </div>
        </div>

        {/* логи */}
        <div className="textLogs">
          <p>Все системы охлаждения работают нормально</p>
        </div>
      </div>
      <NavLink to="/" className="backButton">
        Назад
      </NavLink>
    </div>
  );
};