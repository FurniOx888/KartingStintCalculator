import React, { useState, useEffect } from 'react';

const KartStintCalculator = () => {
  const [raceSettings, setRaceSettings] = useState({
    lapTime: 75,
    minStint: 10,
    maxStint: 38,
    pitTime: 2.0
  });

  const [drivers] = useState([
    { id: 1, name: 'Driver 1', color: 'bg-blue-500' },
    { id: 2, name: 'Driver 2', color: 'bg-green-500' },
    { id: 3, name: 'Driver 3', color: 'bg-red-500' }
  ]);

  const [stints, setStints] = useState([]);

  // Initialize 14 stints
  useEffect(() => {
    const initialStints = [];
    for (let i = 1; i <= 14; i++) {
      initialStints.push({
        number: i,
        driverId: ((i - 1) % 3) + 1,
        timeMinutes: 28.5, // Start with average time
        pitTimeMinutes: i < 14 ? raceSettings.pitTime : 0,
        completed: false,
        startTime: 0
      });
    }
    setStints(initialStints);
  }, [raceSettings.pitTime]);

  // Calculate start times whenever stints change
  useEffect(() => {
    let currentTime = 0;
    const updatedStints = stints.map(stint => {
      const updatedStint = { ...stint, startTime: currentTime };
      currentTime += stint.timeMinutes + stint.pitTimeMinutes;
      return updatedStint;
    });
    if (JSON.stringify(updatedStints) !== JSON.stringify(stints)) {
      setStints(updatedStints);
    }
  }, [stints]);

  const formatTime = (minutes) => {
    const totalSeconds = Math.round(minutes * 60);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateStintTime = (stintNumber, newTime) => {
    setStints(prev => prev.map(stint => 
      stint.number === stintNumber 
        ? { ...stint, timeMinutes: parseFloat(newTime) || 0 }
        : stint
    ));
  };

  const markCompleted = (stintNumber) => {
    setStints(prev => prev.map(stint => 
      stint.number === stintNumber 
        ? { ...stint, completed: true }
        : stint
    ));
  };

  const getDriver = (id) => drivers.find(d => d.id === id);

  // Calculate total driving time per driver
  const driverTimes = drivers.map(driver => ({
    ...driver,
    totalTime: stints
      .filter(s => s.driverId === driver.id)
      .reduce((sum, s) => sum + s.timeMinutes, 0)
  }));

  return (
    <div className="p-2 sm:p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">🏎️ 7-Hour Kart Race Manager</h1>
        
        {/* Settings */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          <div>
            <label className="block text-xs font-medium mb-1">Lap Time (sec)</label>
            <input
              type="number"
              value={raceSettings.lapTime}
              onChange={(e) => setRaceSettings(prev => ({...prev, lapTime: parseInt(e.target.value) || 75}))}
              className="w-full p-1 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Min Stint (min)</label>
            <input
              type="number"
              value={raceSettings.minStint}
              onChange={(e) => setRaceSettings(prev => ({...prev, minStint: parseInt(e.target.value) || 10}))}
              className="w-full p-1 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Max Stint (min)</label>
            <input
              type="number"
              value={raceSettings.maxStint}
              onChange={(e) => setRaceSettings(prev => ({...prev, maxStint: parseInt(e.target.value) || 38}))}
              className="w-full p-1 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Pit Time (min)</label>
            <input
              type="number"
              step="0.1"
              value={raceSettings.pitTime}
              onChange={(e) => setRaceSettings(prev => ({...prev, pitTime: parseFloat(e.target.value) || 2.0}))}
              className="w-full p-1 border rounded text-sm"
            />
          </div>
        </div>

        {/* Driver Summary */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {driverTimes.map(driver => (
            <div key={driver.id} className="bg-gray-50 rounded p-2">
              <div className="flex items-center gap-1 mb-1">
                <div className={`w-2 h-2 rounded-full ${driver.color}`}></div>
                <span className="text-xs font-medium">{driver.name}</span>
              </div>
              <div className="text-sm font-bold">{formatTime(driver.totalTime)}</div>
              <div className={`text-xs ${driver.totalTime >= 100 ? 'text-green-600' : 'text-red-600'}`}>
                {driver.totalTime >= 100 ? '✓ OK' : '⚠ Short'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stints List */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-3">Stints</h2>
        
        {/* Mobile Layout */}
        <div className="space-y-2">
          {stints.map(stint => {
            const driver = getDriver(stint.driverId);
            const predictedLaps = Math.floor((stint.timeMinutes * 60) / raceSettings.lapTime);
            
            return (
              <div key={stint.number} className={`border rounded p-3 ${stint.completed ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">#{stint.number}</span>
                    <div className={`w-3 h-3 rounded-full ${driver.color}`}></div>
                    <span className="text-sm">{driver.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{formatTime(stint.startTime)}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div>
                    <label className="block text-xs text-gray-600">Time (min)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={stint.timeMinutes}
                      onChange={(e) => updateStintTime(stint.number, e.target.value)}
                      disabled={stint.completed}
                      className="w-full p-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Pit Time</label>
                    <span className="text-sm">{stint.pitTimeMinutes.toFixed(1)}m</span>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Laps</label>
                    <span className="text-sm font-medium">{predictedLaps}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 text-xs">
                    {stint.timeMinutes < raceSettings.minStint && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Too Short</span>
                    )}
                    {stint.timeMinutes > raceSettings.maxStint && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Too Long</span>
                    )}
                  </div>
                  
                  {!stint.completed ? (
                    <button
                      onClick={() => markCompleted(stint.number)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                    >
                      Done
                    </button>
                  ) : (
                    <span className="text-green-600 text-xs font-medium">✓ Completed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Summary */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="bg-blue-50 rounded p-2 text-center">
            <div className="text-lg font-bold text-blue-600">{stints.filter(s => s.completed).length}/14</div>
            <div className="text-xs text-gray-600">Done</div>
          </div>
          <div className="bg-green-50 rounded p-2 text-center">
            <div className="text-sm font-bold text-green-600">
              {formatTime(stints.reduce((sum, s) => sum + s.timeMinutes, 0))}
            </div>
            <div className="text-xs text-gray-600">Total Drive</div>
          </div>
          <div className="bg-orange-50 rounded p-2 text-center">
            <div className="text-sm font-bold text-orange-600">
              {formatTime(stints.reduce((sum, s) => sum + s.pitTimeMinutes, 0))}
            </div>
            <div className="text-xs text-gray-600">Pit Time</div>
          </div>
          <div className="bg-red-50 rounded p-2 text-center">
            <div className="text-sm font-bold text-red-600">
              {formatTime(stints[13]?.startTime + stints[13]?.timeMinutes || 0)}
            </div>
            <div className="text-xs text-gray-600">Finish</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KartStintCalculator;