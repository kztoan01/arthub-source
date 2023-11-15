import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ courses, learner }) {
  //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 }))
  const thisAccount = JSON.parse(localStorage.getItem("logined"))
  const courseSold = learner?.filter((learner) => learner.ownerCourse === thisAccount?.id);
  const courseOwn = courses?.filter((courses) => courses.accountId === thisAccount?.id);
  let totalAmount = courseSold?.reduce(function (prev, current) {
    return prev += current.price
  }, 0);
  const labels = courses?.map((course) => course.name);
  const labelsId = courses?.map((course) => course.id);
  console.log(labelsId)
  const data = {
    labels,
    datasets: [
      {
        label: '$ of Revenue',
        data: labelsId?.map((label) => learner?.filter((learner) => learner.courseId == label)?.reduce(function (prev, current) {
          return prev += current.price * 65 / 100
        }, 0)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
