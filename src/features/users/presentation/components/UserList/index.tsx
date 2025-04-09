import React, { useEffect, useState } from 'react';
import { User } from '../../../data/models/User';
import { UserRepository } from '../../../data/repository/userRepository';
import { UserForm } from '../UserForm';
import styles from './UserList.module.css';

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const userRepository = new UserRepository();

  const loadUsers = async () => {
    try {
      const data = await userRepository.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await userRepository.delete(id);
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    loadUsers();
    setShowForm(false);
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setShowForm(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Administarcion de usuarios</h2>
        <button 
          onClick={handleCreate}
          className={styles.createButton}
        >
          Crear nuevos usuarios
        </button>
      </div>

      <UserForm 
        user={selectedUser} 
        onSave={handleFormSuccess} 
        onCancel={handleCancel}
        forceShow={showForm}
      />

      <div className={styles.listContainer}>
        {users.length === 0 ? (
          <p className={styles.emptyMessage}>No users found</p>
        ) : (
          <ul className={styles.list}>
            {users.map((user) => (
              <li key={user.id} className={styles.listItem}>
                <div className={styles.userInfo}>
                  <span className={styles.name}>{user.name}</span>
                  <span className={styles.email}>{user.email}</span>
                  <span className={styles.age}>Age: {user.age}</span>
                </div>
                <div className={styles.actions}>
                  <button
                    className={`${styles.button} ${styles.editButton}`}
                    onClick={() => {
                      setSelectedUser(user);
                      setShowForm(true);
                    }}
                  >
                    Editar 
                  </button>
                  <button
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={() => handleDelete(user.id)}
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