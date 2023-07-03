import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import axios from 'axios';
import { useSelector } from 'react-redux';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const PieChartTasksStatus = () => {
    const [statusData, setStatusData] = useState([]);
    const token = useSelector((state) => state.token);

    const getTasks = async () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/tasks",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {

                generateData(response.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getTasks();
        // eslint-disable-next-line
    }, []);

    const generateData = (tasks) => {
        const stats = tasks.reduce((acc, task) => {
            const { status } = task;
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        const chartData = Object.keys(stats).map((status) => ({
            name: status.charAt(0).toUpperCase() + status.slice(1),
            value: stats[status],
        }));

        setStatusData(chartData);

        // handleExcelData(chartData);
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>By Status</h1>

            <PieChart width={400} height={400}>
                <Pie
                    data={statusData}
                    cx={200}
                    cy={200}
                    outerRadius={150}
                    fill="#8884d8"
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = Math.floor(cx + radius * Math.cos(-midAngle * (Math.PI / 180)));
                        const y = Math.floor(cy + radius * Math.sin(-midAngle * (Math.PI / 180)));
                        return (
                            <text
                                x={x}
                                y={y}
                                fill="#000"
                                textAnchor={x > cx ? 'start' : 'end'}
                                dominantBaseline="central"
                            >
                                {`${(percent * 100).toFixed(0)}%`}
                            </text>
                        );
                    }}
                    dataKey="value"
                >
                    {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default PieChartTasksStatus;
