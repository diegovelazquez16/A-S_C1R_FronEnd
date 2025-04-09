import axios from "axios";
import { User } from "../models/User";

const API_URL = "http://localhost:8080/users";

export class UserRepository {
  async getAll(): Promise<User[]> {
    try {
      const response = await axios.get(API_URL);
      return response.data.map((item: any) => ({
        id: item.ID,
        name: item.Name,
        email: item.Email,
        age: item.Age,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }

  async getById(id: number): Promise<User> {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      const data = response.data;
      return {
        id: data.ID,
        name: data.Name,
        email: data.Email,
        age: data.Age,
      };
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("User not found");
    }
  }

  async create(user: Omit<User, "id">): Promise<User> {
    try {
      const response = await axios.post(API_URL, {
        Name: user.name,
        Email: user.email,
        Age: user.age,
      });
      const data = response.data;
      return {
        id: data.ID,
        name: data.Name,
        email: data.Email,
        age: data.Age,
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async update(user: User): Promise<User> {
    try {
      const response = await axios.put(`${API_URL}/${user.id}`, {
        ID: user.id,
        Name: user.name,
        Email: user.email,
        Age: user.age,
      });
      const data = response.data;
      return {
        id: data.ID,
        name: data.Name,
        email: data.Email,
        age: data.Age,
      };
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  }
}