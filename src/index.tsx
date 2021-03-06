import React from 'react';
import RX from 'reactxp';
import { App } from './components/root/App';
import { DEBUG, DEV } from './config';

RX.App.initialize(DEBUG, DEV);
RX.UserInterface.setMainView(<App />);
