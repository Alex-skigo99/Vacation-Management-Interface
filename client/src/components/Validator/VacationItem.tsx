import React from 'react';
import { VacationType } from '../../types';
import Button from '@mui/material/Button';

type VacationItemProps = {
    item: VacationType;
    action: (id: number) => void;
}

export const dateToString = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    return `${date.getDate()} ${month} ${date.getFullYear()}`;
};

const VacationItem: React.FC<VacationItemProps> = ({ item, action }) => {

    const handleAction = (e: React.MouseEvent<HTMLButtonElement>) => {
        action(parseInt(e.currentTarget.id.split('-')[2], 10));
    };

    return (
        <div className="vacation-item" key={item.id}>
            <div className="item-name" data-testid={`id-${item.id}`}>{item.requester_name}</div>
            <div className="item-start">{dateToString(item.start_date)}</div>
            <div className="item-end">{dateToString(item.end_date)}</div>
            <div className="item-reason">{item.reason}</div>
            <div className={`item-status ${item.status}`}>{item.status}</div>
            <div className='item-comments'>{item.comments}</div>
            <div className='invoice-action'>
                <Button id={`btn-act-${item.id}`} size='small' variant='outlined' onClick={handleAction}>Action</Button>
            </div>
        </div>
    );
};

export default VacationItem;