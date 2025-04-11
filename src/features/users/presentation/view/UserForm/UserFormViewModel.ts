import { User } from '../../../data/models/User';
import { UserRepository } from '../../../data/repository/userRepository';

export class UserFormViewModel {
  private _formData: Omit<User, 'id'> = { name: '', email: '', age: 0 };
  private _isLoading = false;
  private _error: string | null = null;
  private userRepository: UserRepository;
  private listeners: (() => void)[] = [];

  constructor(userRepository?: UserRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  get formData() {
    return this._formData;
  }

  get isLoading() {
    return this._isLoading;
  }

  get error() {
    return this._error;
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  initialize(user?: User | null) {
    this._formData = user 
      ? { name: user.name, email: user.email, age: user.age }
      : { name: '', email: '', age: 0 };
    this.notifyListeners();
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this._formData = {
      ...this._formData,
      [name]: name === 'age' ? Number(value) : value,
    };
    this.notifyListeners();
  };

  async handleSubmit(user?: User | null, onSuccess?: () => void) {
    this._isLoading = true;
    this._error = null;
    this.notifyListeners();

    try {
      if (user) {
        await this.userRepository.update({ ...this._formData, id: user.id });
      } else {
        await this.userRepository.create(this._formData);
      }
      
      if (!user) {
        this._formData = { name: '', email: '', age: 0 };
      }
      onSuccess?.();
    } catch (err) {
      console.error('Error al guardar usuario:', err);
      this._error = 'Error al guardar usuario. Intentelo de nuevo';
    } finally {
      this._isLoading = false;
      this.notifyListeners();
    }
  }
}
//ok?