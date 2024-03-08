import React from 'react';
import DataTable from 'react-data-table-component';
import KitchenSinkStory from 'react-data-table-component'
import Checkbox from '@material-ui/core/Checkbox';

import ArrowDownward from '@material-ui/icons/ArrowDownward';

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
    },
];

const data = [
    {
        id: 1,
        name: 'lorda',
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        name: 'ema',
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 3,
        name: 'ema',
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 4,
        name: 'ema',
        title: 'Ghostbusters',
        year: '1984',
    },
]

function DataTableBase(props) {
    return (
        <KitchenSinkStory
            columns={columns}
            data={data}
            direction="ltr"
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            subHeaderAlign="right"
            subHeaderWrap
/>
    );
}

export default DataTableBase;