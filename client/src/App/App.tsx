import './App.css';
import { createContext, useState } from "react";
import { User } from "../types";
import Home from '../components/Home/Home';
import Requester from '../components/Requester/Requester';
import Validator from '../components/Validator/Validator';
import Navbar from "../components/Navbar/Navbar";

export interface UserContextType {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export interface NeedUpdateDataType {
  needUpdateData: boolean;
  setNeedUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
export const NeedUpdateDataContext = createContext<NeedUpdateDataType | undefined>(undefined);

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [needUpdateData, setNeedUpdateData] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{selectedUser, setSelectedUser}}>
    <NeedUpdateDataContext.Provider value={{needUpdateData, setNeedUpdateData}}>
      <Navbar />
      {!selectedUser && <Home />}
      {selectedUser && selectedUser.role === 'requester' && <Requester />}
      {selectedUser && selectedUser.role === 'validator' && <Validator />}
    </NeedUpdateDataContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
