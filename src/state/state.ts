import { bind } from '@react-rxjs/core';
import { createSignal, mergeWithKey, partitionByKey } from '@react-rxjs/utils';

import { map, merge, mergeAll, scan, switchMap } from 'rxjs';
import { createUser, CreateUser } from '../api/createUser';
import { getUsers } from '../api/getUsers';
import { User } from '../components/SelectedUser/SelectedUser';

export const [incrementAgeAction$, onIncrementAge] = createSignal<User>();
export const [selectedUserAction$, selectedUser] = createSignal<User>();
export const [addUserAction$, onAddUser] = createSignal<CreateUser>();

const createUserResponse$ = addUserAction$.pipe(switchMap(createUser));
const getUsersResponse$ = getUsers().pipe(mergeAll());
const addAction$ = merge(getUsersResponse$, createUserResponse$);

const userActions$ = mergeWithKey({
  increment: incrementAgeAction$,
  add: addAction$,
});

const [userByID, keys$] = partitionByKey(
  userActions$,
  ({ payload }) => payload.userID,
  (event$) =>
    event$.pipe(
      scan((state, action) => {
        const { type, payload } = action;
        const { age, avatar, name, userID } = payload;

        switch (type) {
          case "add":
            return { ...state, userID, name, avatar, age };
          case "increment":
            return { ...state, age };
        }
      }, {} as User)
    )
);

export const [useUserByID] = bind((userID: number) => userByID(userID));
export const [userUserIds] = bind(keys$);
export const [useSelectedUser] = bind(
  merge(selectedUserAction$).pipe(
    map(({ userID }) => userID),
    switchMap((targetID) => userByID(targetID))
  ),
  null
);
