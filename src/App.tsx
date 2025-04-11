import React from "react";
import { UserForm } from "./features/users/presentation/pages/UserForm/UserFormView";
import { UserList } from "./features/users/presentation/pages/UserList/UserListView";
import { UserFormViewModel } from "./features/users/presentation/view/UserForm/UserFormViewModel";
import { UserRepository } from "./features/users/data/repository/userRepository";

const App: React.FC = () => {
  const userRepository = new UserRepository();
  
  const userFormViewModel = new UserFormViewModel(userRepository);

  const handleSave = () => {
    console.log("Usuario guardado");
  };

  const handleCancel = () => {
    console.log("Operación cancelada");
  };

  return (
    <div className="App">
      <UserList />
      <UserForm 
        viewModel={userFormViewModel}  
        onSave={handleSave} 
        onCancel={handleCancel}
        user={null} 
      />
    </div>
  );
};

export default App;
//ok?