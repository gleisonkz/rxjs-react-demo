import './App.css';

import { Subscribe } from '@react-rxjs/core';

import { Spinner } from './components/Spinner/Spinner';
import { Users } from './components/Users';
import { UserSelected } from './components/UserSelected';

export default function App() {
  return (
    <>
      <h1 data-testid="title">RxJS-React-Demo</h1>
      <div className="users-container">
        <Subscribe fallback={<Spinner />}>
          <UserSelected />
          <Users></Users>
        </Subscribe>
      </div>
    </>
  );
}
