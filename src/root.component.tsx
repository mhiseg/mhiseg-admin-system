import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AdminSys from './admin-component';


const RootComponent: React.FC = () => {
  return (
    <BrowserRouter basename={`${window.spaBase}/settings`}>
      <Route path="/" exact>
        <AdminSys />
      </Route>
    </BrowserRouter>
  );
};

export default RootComponent;
