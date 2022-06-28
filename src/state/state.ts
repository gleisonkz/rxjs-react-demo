import { bind } from '@react-rxjs/core';
import { createSignal, mergeWithKey, partitionByKey } from '@react-rxjs/utils';

import { map, merge, mergeAll, scan, switchMap } from 'rxjs';
import { getUsers } from '../api/getUsers';
import { UserProps } from '../components/SelectedUser/SelectedUser';

export const [incrementAge$, onIncrementAge] = createSignal<UserProps>();
export const [selectedUser$, selectedUser] = createSignal<UserProps>();
export const [addUser$, onAddUser] = createSignal<UserProps>();

const add$ = merge(getUsers().pipe(mergeAll()), addUser$.pipe(map((user) => ({ ...user })))).pipe(
  map((user, id) => ({ ...user, id }))
);

const userActions$ = mergeWithKey({
  increment: incrementAge$,
  add: add$,
});

const [userByID, keys$] = partitionByKey(
  userActions$,
  ({ payload }) => payload.userID,
  (event$, id) =>
    event$.pipe(
      scan(
        (state, action) => {
          const { type, payload } = action;
          const { age, avatar, name, userID } = payload;

          switch (type) {
            case "add":
              return { ...state, userID, name, avatar, age };
            case "increment":
              return { ...state, age };
          }
        },
        { userID: id, name: "", age: 0 } as UserProps
      )
    )
);

export const [useUserByID, user$] = bind((userID: number) => userByID(userID));
export const [userUserIds] = bind(keys$);
export const [useUpdatedSelectedUser, _] = bind(
  merge(selectedUser$)
    .pipe(map(({ userID }) => userID))
    .pipe(switchMap((targetID) => userByID(targetID))),
  null
);
