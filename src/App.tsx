import { Subscribe } from '@react-rxjs/core';

import './App.css';
import { CreateUser } from './components/CreateUser/CreateUser';
import { SelectedUser } from './components/SelectedUser/SelectedUser';
import { Spinner } from './components/Spinner/Spinner';
import { Users } from './components/Users/Users';
import logo from './logo.svg';

export default function App() {
  return (
    <>
      <header>
        <h1 data-testid="title">RxJS-React-Demo</h1>
        <img src={logo} className="logo" alt="logo" />
      </header>
      <div>
        <Subscribe fallback={<Spinner />}>
          <CreateUser />
          <SelectedUser />
          <Users></Users>
        </Subscribe>
      </div>
    </>
  );
}
