import './DashboardPage.scss';
import { Button } from '../../../shared/ui/button';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import videoFile from '../../../assets/icons/vid.MP4';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DashboardPage = () => {
  const [logs, setLogs] = useState<string[]>(['Все системы охлаждения работают нормально']);
  const [isSystemChecked, setIsSystemChecked] = useState(false);
  const [areDoorsOpen, setAreDoorsOpen] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [currentMission, setCurrentMission] = useState<{ direction: string; departureTime: string; weight: number } | null>(null);
  const [missionHistory, setMissionHistory] = useState<
    { id: number; direction: string; status: string; state: string; door_state: string; departure_time: string; arrival_time: string; created_by: number; cargos: number[] }[]
  >([]);
  const [lastMission, setLastMission] = useState<{
    id: number;
    direction: string;
    status: string;
    door_state: string;
    departure_time: string;
    arrival_time: string | null;
    created_by: number;
    cargos: { id: number; name: string; size: string; weight: number; mission_id: number; status: string }[];
  } | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [isButtonsLocked, setIsButtonsLocked] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  const createMission = async (direction: string) => {
    const departureTime = new Date().toISOString();
    const weight = 500; // Hardcoded weight for now

    const missionData = {
      direction,
      created_by: 1,
      departure_time: departureTime,
    };

    addLog(`Sending mission: ${JSON.stringify(missionData)}`);
    try {
      const response = await fetch('http://5.129.243.99:8000/api/missions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(missionData),
      });
      const responseText = await response.text(); // Log raw response
      addLog(`Server response: ${response.status} - ${responseText}`);
      if (response.ok) {
        const missionId = responseText; // Expecting a string (e.g., mission ID)
        setCurrentMission({ direction, departureTime, weight });
        addLog(`Mission created successfully: ID ${missionId}`);
        fetchMissionHistory();
        // Start polling when a mission is created
        if (!isPolling) {
          setIsPolling(true);
          intervalRef.current = window.setInterval(fetchLastMission, 2000);
        }
      } else if (response.status === 422) {
        const error = await response.json();
        error.detail.forEach((err: { msg: string }) => addLog(`Validation Error: ${err.msg}`));
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      const err = error as Error;
      addLog(`Error creating mission: ${err.message}`);
    }
  };

  const fetchMissionHistory = async () => {
    try {
      const response = await fetch('http://5.129.243.99:8000/api/missions/', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        setMissionHistory(data);
        addLog(`Mission history fetched: ${data.length} missions`);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      const err = error as Error;
      addLog(`Error fetching mission history: ${err.message}`);
    }
  };

  const fetchLastMission = async () => {
    try {
      const response = await fetch('http://5.129.243.99:8000/api/missions/last', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        setLastMission(data);
        const totalWeight = data.cargos.reduce((sum: number, cargo: { weight: number }) => sum + cargo.weight, 0);
        setCurrentMission((prev) => prev ? { ...prev, weight: totalWeight } : { direction: data.direction, departureTime: data.departure_time, weight: totalWeight });
        setIsButtonsLocked(data.state === 'cancelled'); // Lock buttons if state is cancelled
        addLog(`Состояние лифта ${data.state}, Статус доставки ${data.status}`);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      const err = error as Error;
      addLog(`Error fetching last mission: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchMissionHistory();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }; // Cleanup on unmount
  }, []);

  return (
    <div className="dashboard">
      {/*<h2 className="dashboardTitle">Состояние подъемной системы</h2>*/}
      <div className="dashboardGrid">
        {/* Placeholder for animation (to be revisited) */}
        <div className="animationSpace">
          <video className="elevatorVideo" autoPlay loop muted playsInline>
            <source src={videoFile} type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Инфа о текущей миссии и истории */}
        <div className="contentsInfo">
          <div className="currentMission">
            <h3>Информация о текущей миссии</h3>
            {currentMission ? (
              <>
                <p>Direction: {currentMission.direction}</p>
                <p>Departure: {new Date(currentMission.departureTime).toLocaleString()}</p>
                <p>Weight: {currentMission.weight} kg</p>
              </>
            ) : (
              <p>Отправьте лифт, чтобы увидеть информацию о миссии!</p>
            )}
          </div>
          <div className="missionHistory">
            <h3>Все миссии</h3>
            {missionHistory.length > 0 ? (
              <ul>
                {missionHistory.map((mission) => (
                  <li key={mission.id}>
                    ID: {mission.id}, Direction: {mission.direction}, Status: {mission.status}, 
                    State: {mission.state}, Door: {mission.door_state}, Departure: {new Date(mission.departure_time).toLocaleString()}, 
                    Arrival: {mission.arrival_time ? new Date(mission.arrival_time).toLocaleString() : 'N/A'}, 
                    Created By: {mission.created_by}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No mission history available</p>
            )}
          </div>
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
              disabled={isButtonsLocked}
            />
            <Button
              text="Перезагрузить все системы"
              onClick={() => addLog('Перезагрузка всех систем инициирована')}
              disabled={isButtonsLocked}
            />
          </div>
          <div className="buttonRow">
            {isSystemChecked && (
              <Button
                text="Отправить лифт наверх/вниз"
                onClick={() => {
                  const direction = isMoving ? 'To Earth' : 'To Orbit'; // Toggle direction
                  createMission(direction);
                  addLog('Лифт отправлен наверх/вниз');
                  setIsMoving(!isMoving);
                }}
                disabled={isButtonsLocked}
              />
            )}
            {isMoving && (
              <Button
                text="Остановить лифт"
                onClick={() => {
                  addLog('Лифт остановлен');
                  setIsMoving(false);
                }}
                disabled={isButtonsLocked}
              />
            )}
            {!areDoorsOpen && (
              <Button
                text="Принудительное открытие дверей"
                onClick={() => {
                  addLog('Двери принудительно открыты');
                  setAreDoorsOpen(true);
                }}
                disabled={isButtonsLocked}
              />
            )}
            {areDoorsOpen && (
              <Button
                text="Принудительное закрытие дверей"
                onClick={() => {
                  addLog('Двери принудительно закрыты');
                  setAreDoorsOpen(false);
                }}
                disabled={isButtonsLocked}
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
    </div>
  );
};