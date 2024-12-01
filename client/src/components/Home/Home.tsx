import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { User } from '../../types';
import { UserContext } from '../../App/App';
import { FormControl, InputLabel, MenuItem, Select, Button, SelectChangeEvent } from '@mui/material';
import { API } from '../../consts';
import NewUserDialog from './NewUserDialog';

const Home: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useInvoiceListContext must be used within an InvoiceListContext.Provider');
    }
    const { selectedUser, setSelectedUser } = context;
    const [users, setUsers] = useState<User[]>([]);
    const [open, setOpen] = React.useState(false);
    const [selectedUserId, setSelectedUserId] = React.useState(0);

    useEffect(() => {
        axios.get(API.users)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, [selectedUser]);

    const handleUserChange = (event: SelectChangeEvent<number>) => {
        const userId = Number(event.target.value);
        const user = users.find(user => user.id === userId);
        if (user) {
            setSelectedUser(user);
        }
    };


    const handleNewUser = () => {
        setOpen(true);
    };

    return (
        <div id='userSelect-block'>
            <h2>Select a User</h2>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="user-select-standard-label">User</InputLabel>
                <Select
                labelId="user-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedUserId}
                required
                onChange={handleUserChange}
                label="Validator"
                >
                    {users.map((user: any) => (
                        <MenuItem key={user.id} value={user.id}>
                            {`${user.name} (${user.role})`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button id='new-user-button' variant='outlined' onClick={handleNewUser}>New User</Button>
            <NewUserDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Home;