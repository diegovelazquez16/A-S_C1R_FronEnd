import React from "react";
import { UserList } from "./features/users/presentation/components/UserList/UserList.tsx";
import { UserForm } from "./features/users/presentation/components/UserForm/UserForm.tsx";

const App: React.FC = () => {
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
        onSave={handleSave} 
        onCancel={handleCancel}
        user={null} 
      />
    </div>
  );
};

export default App;