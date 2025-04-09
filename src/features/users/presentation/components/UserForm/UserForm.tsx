import React, { useState, useEffect } from 'react';
import { User } from '../../../data/models/User';
import { UserRepository } from '../../../data/repository/userRepository';
import styles from './UserForm.module.css';

interface UserFormProps {
  user?: User | null;
  onSave: () => void;
  onCancel: () => void;
  forceShow?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ 
  user, 
  onSave, 
  onCancel,
  forceShow = false 
}) => {
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    age: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userRepository = new UserRepository();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        age: user.age,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        age: 0,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (user) {
        await userRepository.update({ ...formData, id: user.id });
      } else {
        await userRepository.create(formData);
      }
      onSave();
      if (!user) {
        setFormData({ name: '', email: '', age: 0 });
      }
    } catch (err) {
      console.error('Error saving user:', err);
      setError('Failed to save user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user && !forceShow && formData.name === '' && formData.email === '' && formData.age === 0) {
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
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Correo electronico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
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
          value={formData.age}
          onChange={handleChange}
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