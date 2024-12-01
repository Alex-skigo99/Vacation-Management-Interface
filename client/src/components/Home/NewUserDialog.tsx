import React, {useContext} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Role, UserCreataion, validateUserCreate } from '../../validaition';
import { UserContext } from '../../App/App';
import { API } from '../../consts';
import axios from 'axios';


export default function NewUserDialog({open, setOpen}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  const context = useContext(UserContext);
  if (!context) {
      throw new Error('useInvoiceListContext must be used within an InvoiceListContext.Provider');
  }
  const { setSelectedUser } = context;
  const [role, setRole] = React.useState('requester');
  const [message, setMessage] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRole = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson);
    const userData  = {
      name: formJson.name as string,
      role: role as Role,
    };
    console.log('userData', userData);
    validateUserCreate(userData);
    register(userData);
  };

  const register = async (data: UserCreataion) => {
    try {
      const response = await axios.post(API.users, data);
      console.log('response.status', response.status);

      if (response.status === 201) {
        console.log(response.data);
        setSelectedUser(response.data);
        handleClose();
      }
      else {
        setMessage(response.data.message);
        console.log(response.data);
      }
    } catch (error: any) {
      console.log(error);
      setMessage(error.message);
    }
  };


  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={role}
              required
              onChange={handleChangeRole}
              label="Role"
            >
              <MenuItem value={'requester'}>requester</MenuItem>
              <MenuItem value={'validator'}>validator</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
        {message !== '' || message !== undefined || message !== null &&
          <Alert severity="warning" onClose={() => {}}>
              {message}
          </Alert>
        }

      </Dialog>
    </React.Fragment>
  );
}
