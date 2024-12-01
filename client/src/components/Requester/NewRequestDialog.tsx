import React, {useContext, useEffect} from 'react';
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
import { Status, VacationCreation, validateVacationCreation } from '../../validaition';
import { UserContext, NeedUpdateDataContext } from '../../App/App';
import { API } from '../../consts';
import axios from 'axios';
import { User } from '../../types';

interface NewRequestDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function NewRequestDialog({open, setOpen}: NewRequestDialogProps) {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useInvoiceListContext must be used within an InvoiceListContext.Provider');
    }
    const { selectedUser } = context;
    const context2 = useContext(NeedUpdateDataContext);
    if (!context2) {
        throw new Error('useInvoiceListContext must be used within an InvoiceListContext.Provider');
    }
    const { needUpdateData, setNeedUpdateData } = context2;
    const [validator, setValidator] = React.useState(0);
    const [validatorsList, setValidatorsList] = React.useState<User[]>([]);
    const [message, setMessage] = React.useState('');

  useEffect(() => {
    axios.get(API.users, {
        params: {
            role: 'validator'
        }
    })
        .then(response => {
            setValidatorsList(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the users!', error);
        });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeValidator = (event: SelectChangeEvent) => {
    setValidator(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson);
    const vacationData  = {
        requester_id: selectedUser?.id as number,
        validator_id: validator as number,
        start_date: formJson.start_date as string,
        end_date: formJson.end_date as string,
        reason: formJson.reason as string,
        status: 'pending' as Status
    };
    console.log('vacationData', vacationData);
    validateVacationCreation(vacationData);
    register(vacationData);
  };

  const register = async (data: VacationCreation) => {
    try {
      const response = await axios.post(API.vacations, data);
      console.log('response.status', response.status);

      if (response.status === 200) {
        console.log('New vacation created');
        setNeedUpdateData(!needUpdateData);
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
          width: '400px',
        }}
      >
        <DialogTitle>New Vacation</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="start_date"
                name="start_date"
                label="Start Date"
                type="date"
                fullWidth
                required
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="end_date"
                name="end_date"
                label="End Date"
                type="date"
                fullWidth
                required
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="reason"
                name="reason"
                label="Reason"
                type="text"
                fullWidth
                variant="standard"
            />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Validator</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={validator.toString()}
              required
              onChange={handleChangeValidator}
              label="Validator"
            >
                {validatorsList.map((validator: any) => (
                    <MenuItem key={validator.id} value={validator.id}>
                        {validator.name}
                    </MenuItem>
                ))}
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
