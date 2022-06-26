import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';

import { combineLatest, delay, map, merge } from 'rxjs';
import { getUsers } from '../api/getUsers';
import { UserProps } from '../components/UserSelected/UserSelected';

export const [usersChange$, setUsers] = createSignal<UserProps[]>();
export const [useUsers, users$] = bind<UserProps[]>(merge(usersChange$, getUsers().pipe(delay(200))));

export const [selectedUserIDChange$, setSelectedUserID] = createSignal<number>();
export const [useSelectedUser, selectedUserID$] = bind(
  combineLatest([selectedUserIDChange$, users$]).pipe(
    map(([selectedUserID, users]) => {
      const user = users.find(({ userID }) => userID === selectedUserID);
      return user;
    })
  ),
  null
);
