import React from 'react';
import { Table } from 'antd';


const TuciList = ({ dataSource, columns }) => (
    <Table dataSource={dataSource} columns={columns} />
);


export default TuciList;