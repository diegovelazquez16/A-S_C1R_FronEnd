import React, { useEffect, useState } from 'react';
import { User } from '../../../data/models/User';
import styles from './UserForm.module.css';
import { UserFormViewModel } from '../../view/UserForm/UserFormViewModel';

interface UserFormProps {
  viewModel: UserFormViewModel;
  user?: User | null;
  onSave: () => void;
  onCancel: () => void;
  forceShow?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ 
  viewModel,
  user, 
  onSave, 
  onCancel,
  forceShow = false
}) => {
  const [formData, setFormData] = useState(viewModel.formData);
  const [isLoading, setIsLoading] = useState(viewModel.isLoading);
  const [error, setError] = useState(viewModel.error);

  useEffect(() => {
    const unsubscribe = viewModel.subscribe(() => {
      setFormData({...viewModel.formData});
      setIsLoading(viewModel.isLoading);
      setError(viewModel.error);
    });
    
    viewModel.initialize(user);
    
    return unsubscribe;
  }, [viewModel, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    viewModel.handleInputChange(e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await viewModel.handleSubmit(user, onSave);
  };

  if (!user && !forceShow && 
      formData.name === '' && 
      formData.email === '' && 
      formData.age === 0) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.title}>{user ? 'Editar usuario' : 'Crear nuevo usuario'}</h3>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="age" className={styles.label}>Edad</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age || ''}
          onChange={handleInputChange}
          className={styles.input}
          min="0"
          required
        />
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.button} ${styles.cancelButton}`}
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={`${styles.button} ${styles.submitButton}`}
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : (user ? 'Actualizar' : 'Crear')}
        </button>
      </div>
    </form>
  );
};