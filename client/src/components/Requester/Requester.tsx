import React, {useContext, useState, useEffect} from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { UserContext, NeedUpdateDataContext } from '../../App/App';
import axios from 'axios';
import { API } from '../../consts';

const columns: GridColDef[] = [
    { 
        field: 'start_date', 
        headerName: 'Start Date', 
        width: 100,
    },
    { 
        field: 'end_date', 
        headerName: 'End Date', 
        width: 100,
    },
    { field: 'reason', headerName: 'Reason', width: 200 },
    { field: 'validator_name', headerName: 'Validator', width: 130 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'comments', headerName: 'Comments', width: 300 },
];

type Row = {
    id: number;
    start_date: string;
    end_date: string;
    reason: string;
    validator_name: string;
    status: string;
    comments: string;
};

const Requester: React.FC = () => {
    const [rows, setRows] = useState<Row[]>([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useInvoiceListContext must be used within an InvoiceListContext.Provider');
    }
    const { selectedUser } = context;
    const context2 = useContext(NeedUpdateDataContext);
    if (!context2) {
        throw new Error('useInvoiceListContext must be used within an InvoiceListContext.Provider');
    }
    const { needUpdateData } = context2;

    useEffect(() => {
        axios.get(API.vacations, {
            params: {
                requester_id: selectedUser?.id,
                offset: offset,
                limit: 10,
            }
        })
            .then(response => {
                setRows(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the vacations!', error);
            });
    }, [selectedUser, needUpdateData, offset]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='table-block' >
            <DataGrid rows={rows} columns={columns} pagination pageSizeOptions={[5]} />
        </div>
    );
};

export default Requester;