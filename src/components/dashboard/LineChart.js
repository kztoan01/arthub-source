import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

//data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 }))
//data: [3342, 1564, 300, 350, 1200, 0]
export function LineChart({ courses, learner }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of enrollments in courses each month',
      },
    },
  };

  const thisAccount = JSON.parse(localStorage.getItem("logined"))
  const courseSold = learner?.filter((learner) => learner.ownerCourse === thisAccount?.id);

  const map = courseSold?.reduce(function (prev, cur) {
    prev[cur.date.split("-")[1]] = (prev[cur.date.split("-")[1]] || 0) + 1;
    return prev;
  }, {});
  const [studentPerMonth, setStudentPerMonth] = useState()
  useEffect(() => {
    setStudentPerMonth([
      {
        month: 'January',
        student: map?.[1]
      },
      {
        month: 'February',
        student: map?.[2]
      },
      {
        month: 'March',
        student: map?.[3]
      },
      {
        month: 'April',
        student: map?.[4]
      },
      {
        month: 'May',
        student: map?.[5]
      },
      {
        month: 'June',
        student: map?.[6]
      },
      {
        month: 'July',
        student: map?.[7]
      },
      {
        month: 'August',
        student: map?.[8]
      },
      {
        month: 'September',
        student: map?.[9]
      },
      {
        month: 'October',
        student: map?.[10]
      },
      {
        month: 'November',
        student: map?.[11]
      },
      {
        month: 'December',
        student: map?.[12]
      },

    ])
  }, [learner]
  )

  const labels = studentPerMonth?.map((x) => x.month);
  const datas = studentPerMonth?.map((x) => x.student ? x.student : 0)
  console.log(datas)
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Number of participations',
        data: datas,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}