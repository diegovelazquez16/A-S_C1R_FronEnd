import React, { useEffect, useState } from 'react';
import { UserForm } from '../UserForm/UserFormView';

import styles from './UserList.module.css';
import { UserListViewModel } from '../../view/UserList/UserListViewModel';
import { UserFormViewModel } from '../../view/UserForm/UserFormViewModel';

export const UserList: React.FC = () => {
  const [viewModel] = useState(() => new UserListViewModel());
  const [userFormViewModel] = useState(() => new UserFormViewModel());
  const [_, forceUpdate] = useState({});

  useEffect(() => {
    viewModel.loadUsers();

    const unsubscribe = viewModel.subscribe(() => forceUpdate({}));
    return unsubscribe;
  }, [viewModel]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Administración de usuarios</h2>
        <button 
          onClick={() => viewModel.openCreateForm()}
          className={styles.createButton}
        >
          Crear nuevo usuario
        </button>
      </div>

      <UserForm 
        viewModel={userFormViewModel}
        user={viewModel.selectedUser}
        onSave={() => viewModel.handleFormSuccess()}
        onCancel={() => viewModel.closeForm()}
        forceShow={viewModel.showForm}
      />

      <div className={styles.listContainer}>
        {viewModel.users.length === 0 ? (
          <p className={styles.emptyMessage}>No se encontraron usuarios</p>
        ) : (
          <ul className={styles.list}>
            {viewModel.users.map((user) => (
              <li key={user.id} className={styles.listItem}>
                <div className={styles.userInfo}>
                  <span className={styles.name}>{user.name}</span>
                  <span className={styles.email}>{user.email}</span>
                  <span className={styles.age}>Edad: {user.age}</span>
                </div>
                <div className={styles.actions}>
                  <button
                    className={`${styles.button} ${styles.editButton}`}
                    onClick={() => viewModel.openEditForm(user)}
                  >
                    Editar
                  </button>
                  <button
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={() => viewModel.deleteUser(user.id)}
                  >
                    Eliminar usuario
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
