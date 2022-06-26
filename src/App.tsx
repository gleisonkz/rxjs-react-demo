import { Subscribe } from '@react-rxjs/core';

import './App.css';
import { SelectedUser } from './components/SelectedUser/SelectedUser';
import { Spinner } from './components/Spinner/Spinner';
import { Users } from './components/Users/Users';

export default function App() {
  return (
    <>
      <h1 data-testid="title">RxJS-React-Demo</h1>
      <div className="users-container">
        <Subscribe fallback={<Spinner />}>
          <SelectedUser />
          <Users></Users>
        </Subscribe>
      </div>
    </>
  );
}
