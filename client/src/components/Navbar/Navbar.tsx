import React, { useContext } from 'react';
import './Navbar.css';
import { UserContext } from '../../App/App';
import Button from '@mui/material/Button';
import NewRequestDialog from '../Requester/NewRequestDialog';

const Navbar: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
      throw new Error('useInvoiceListContext must be used within an InvoiceListContext.Provider');
  }
  const { selectedUser, setSelectedUser } = context;
  const [open, setOpen] = React.useState(false);

  const handleChangeUser = () => {
    setSelectedUser(null);
  };

  const handleNewRequest = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="navbar">
          <h2 id='title'>Vacation Management Interface</h2>
          {selectedUser && 
            <div className='navbar_children'>
                {selectedUser.role === 'requester' && <Button id='requester-button' variant='outlined' onClick={handleNewRequest}>New Request</Button>}
                <p id='navbar-name'>{selectedUser.name}</p>
                <p id='navbar-role'>{`(${selectedUser.role})`}</p>
                <p id='change-user' onClick={handleChangeUser}>Change user</p>
            </div>
          }
      </div>
      <NewRequestDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;