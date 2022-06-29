import { Subscribe } from '@react-rxjs/core';

import './App.css';
import { CreateUser } from './components/CreateUser/CreateUser';
import { SelectedUser } from './components/SelectedUser/SelectedUser';
import { Spinner } from './components/Spinner/Spinner';
import { Users } from './components/Users/Users';

export default function App() {
  return (
    <>
      <header>
        <h1 data-testid="title">RxJS-React-Demo</h1>
        <img src="assets/images/logo.svg" className="logo" alt="logo" />
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
