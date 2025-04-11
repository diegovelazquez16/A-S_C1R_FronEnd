import { User } from '../../../data/models/User';
import { UserRepository } from '../../../data/repository/userRepository';




export class UserListViewModel {
  private userRepository: UserRepository;
  private _users: User[] = [];
  private _selectedUser: User | null = null;
  private _showForm: boolean = false;
  private listeners: (() => void)[] = [];

  constructor(userRepository?: UserRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  get users(): User[] {
    return this._users;
  }

  get selectedUser(): User | null {
    return this._selectedUser;
  }

  get showForm(): boolean {
    return this._showForm;
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

  async loadUsers() {
    try {
      const data = await this.userRepository.getAll();
      this._users = data;
      this.notifyListeners();
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      await this.userRepository.delete(id);
      await this.loadUsers();
    } catch (error) {
      console.error('Error al borrar usuarios', error);
      throw error;
    }
  }

  openCreateForm() {
    this._selectedUser = null;
    this._showForm = true;
    this.notifyListeners();
  }

  openEditForm(user: User) {
    this._selectedUser = user;
    this._showForm = true;
    this.notifyListeners();
  }

  closeForm() {
    this._selectedUser = null;
    this._showForm = false;
    this.notifyListeners();
  }

  handleFormSuccess() {
    this.loadUsers();
    this.closeForm();
  }
}