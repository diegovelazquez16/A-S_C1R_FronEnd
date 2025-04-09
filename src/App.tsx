import React from "react";
import { UserList } from "./features/users/presentation/components/UserList/index.tsx";
import { UserForm } from "./features/users/presentation/components/UserForm";

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