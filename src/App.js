import React from 'react';
import LEDMatrix from './Grid';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#111' }}>
      <LEDMatrix text="HELLO" />
    </div>
  );
}

export default App;