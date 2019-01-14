import React from 'react';
import { Button, Icon } from 'antd';
// COMPONENTS
import TuciInputForm from 'components/TuciInputPage/TuciInputForm';
import TuciList from 'components/TuciInputPage/TuciList';

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street'
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street'
    }
];

const columns = [
    {
        title: 'Date',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Tuci',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Tuci For/From',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Edit',
        key: 'edit',
        render: (item) => {
            const handleClick = (item) => e => console.log('EDIT', item);
            return(
                <Button type='button' onClick={handleClick(item)}>
                    <Icon type="edit" theme="outlined" />
                </Button>
            );
        }
    }
];

const TuciInputPage = () => {
    return (
        <div>
            <TuciInputForm />
            <TuciList dataSource={dataSource} columns={columns} />
        </div>
    );
};


export default TuciInputPage;