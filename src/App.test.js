import React from 'react';
import ReactDOM from 'react-dom';
import DrumMachine from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DrumMachine />, div);
  ReactDOM.unmountComponentAtNode(div);
});
