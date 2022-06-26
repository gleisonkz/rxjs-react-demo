import { Subscribe } from '@react-rxjs/core';

import './App.css';
import { Spinner } from './components/Spinner/Spinner';
import { Users } from './components/Users/Users';
import { UserSelected } from './components/UserSelected/UserSelected';

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
