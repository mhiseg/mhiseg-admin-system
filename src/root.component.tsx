import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AdminSys from './admin-component';

 
const RootComponent: React.FC = () => {
  return (
    <BrowserRouter basename={`${window.spaBase}/admin/admin-system/`}>
      <Route>
       <AdminSys/> 
      </Route>
    </BrowserRouter>
  );
};

export default RootComponent;
