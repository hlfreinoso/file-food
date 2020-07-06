import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import ControlPanel from './pages/ControlPanel'
import TableManagement from './pages/TableManagement'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={ControlPanel} path="/restaurant" exact />
            <Route component={TableManagement} path="/restaurant/tables" exact />
        </BrowserRouter>
    );
}

export default Routes;