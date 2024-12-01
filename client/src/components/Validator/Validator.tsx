import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { VacationType } from '../../types';
import { Status } from '../../validaition';
import { API } from '../../consts';
import VacationItem from './VacationItem';
import ValidatorDialog from './ValidatorDialog';
import { UserContext } from '../../App/App';


const Validator: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useInvoiceListContext must be used within an InvoiceListContext.Provider');
    }
    const { selectedUser } = context;
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<Status | null>(null);
    const [id, setId] = useState<number | null>(null);
    const [effect, setEffect] = useState(false);
    const [vacations, setVacations] = useState<VacationType[]>([]);

    useEffect(() => {
        let params: { validator_id: number | undefined; offset: number; limit: number; status?: Status } = {
            validator_id: selectedUser?.id,
            offset: 0,
            limit: 30,
        };
        status && (params = {...params, status});
        axios.get(API.vacations, {params})
            .then(response => {
                setVacations(response.data);
                console.log("response.data", response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the vacations!', error);
            });
    }, [status, selectedUser, effect]);

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value as Status | null);
    };

    const action = (id: number) => {
        console.log('Action clicked', id);
        setId(id);
        setOpen(true);
    };

    return (
        <Box width={'100%'} >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={status || ''}
                required
                onChange={handleChangeStatus}
                label="Status"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value={'pending'}>Pending</MenuItem>
                    <MenuItem value={'approved'}>Approved</MenuItem>
                    <MenuItem value={'rejected'}>Rejected</MenuItem>
                </Select>
            </FormControl>
            <div id='table-vacaiton'>
                {vacations.map(vacation => (
                    <VacationItem key={vacation.id} item={vacation} action={action} />
                ))}
            </div>
            <ValidatorDialog open={open} setOpen={setOpen} id={id} effect={effect} setEffect={setEffect} />
        </Box>
    );
};

export default Validator;