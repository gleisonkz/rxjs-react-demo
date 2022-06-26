import { merge, scan, tap } from 'rxjs';

import { bind } from '@react-rxjs/core';
import { createSignal, mergeWithKey, partitionByKey } from '@react-rxjs/utils';

import { getUsers } from '../api/getUsers';
import { UserProps } from '../components/SelectedUser/SelectedUser';

export const [incrementAge$, onIncrementAge] = createSignal<UserProps>();
export const [selectUser$, onSelectUser] = createSignal<UserProps>();
export const [addUser$, onAddUser] = createSignal<UserProps>();

export const [useSelectUser, _] = bind(merge(selectUser$, incrementAge$), null);

const userActions$ = mergeWithKey({
  increment: incrementAge$,
  select: selectUser$,
  add: addUser$,
});

const [userByID, keys$] = partitionByKey(
  userActions$,
  ({ payload }) => payload.userID,
  (event$, id) =>
    event$.pipe(
      scan(
        (state, action) => {
          const {
            type,
            payload: { age, avatar, name, userID },
          } = action;
          switch (type) {
            case "add":
              return { ...state, userID, name, avatar, age };
            case "increment":
              return { ...state, age };
            case "select":
              return { ...state };
          }
        },
        { userID: id, name: "", age: 0 } as UserProps
      )
    )
);

export const [useUsers, users$] = bind(keys$);
export const [useUserByID, user$] = bind((userID: number) => userByID(userID));

getUsers()
  .pipe(tap((users) => users.forEach(onAddUser)))
  .subscribe();
