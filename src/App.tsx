import './App.css';

import { Users } from './components/Users';
import { UserSelected } from './components/UserSelected';

export default function App() {
  return (
    <>
      <h1 data-testid="title">RxJS-React-Demo</h1>
      <div className="users-container">
        <UserSelected />
        <Users></Users>
      </div>
    </>
  );
}
