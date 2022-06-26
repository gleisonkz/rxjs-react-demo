import { onIncrementAge, onSelectUser, useUserByID } from '../../state/state';
import styles from './User.module.css';

export const User: React.FC<{ userID: number }> = ({ userID }) => {
  const { age, name, avatar } = useUserByID(userID);

  return (
    <>
      <div className={styles.user} key={userID}>
        <img className={styles.avatar} src={avatar} alt={name} />
        <span className={styles.info}>
          {name} is {age} years old
        </span>
        <button onClick={() => onSelectUser({ name, userID, age, avatar })}>Select</button>
        <button onClick={() => onIncrementAge({ name, userID, age: age + 1, avatar })}>Increment</button>
      </div>
    </>
  );
};
