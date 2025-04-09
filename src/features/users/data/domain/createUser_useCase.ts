import { User } from "../models/User";
import { UserRepository } from "../repository/userRepository";

// Caso de uso para obtener todos los usuarios
export class GetAllUsersUseCase {
  private userRepository: UserRepository;

  constructor(userRepository?: UserRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  async execute(): Promise<User[]> {
    return await this.userRepository.getAll();
  }
}

// Caso de uso para obtener usuario por ID
export class GetUserByIdUseCase {
  private userRepository: UserRepository;

  constructor(userRepository?: UserRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  async execute(id: number): Promise<User> {
    return await this.userRepository.getById(id);
  }
}

// Caso de uso para crear usuario
export class CreateUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository?: UserRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  async execute(user: Omit<User, "id">): Promise<User> {
    return await this.userRepository.create(user);
  }
}

// Caso de uso para actualizar usuario
export class UpdateUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository?: UserRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  async execute(user: User): Promise<User> {
    return await this.userRepository.update(user);
  }
}

// Caso de uso para eliminar usuario
export class DeleteUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository?: UserRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  async execute(id: number): Promise<void> {
    return await this.userRepository.delete(id);
  }
}