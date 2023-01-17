import React from "react";
import Chart from 'react-apexcharts'


function Percentage({ labels, stats, isPercentage = false }) {


    const options = {
        chart: {
            type: 'donut',
        },
        labels: labels,
        dataLabels: {
            enabled: false,
            formatter: function (val) {
                let percent = val.toFixed(4)
                let result = `${percent} ${isPercentage ? '%' : ''}`
                return result  //isPercentage ? "%" : ""
            },
        },
        legend: {
            show: false
        },
        responsive: [{
            breakpoint: 580,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }

    return (
        <div className="percentage">
            {
                stats.length ?
                    <div className="d-flex justify-content-center align-items-center mb-4">
                        <Chart options={options} series={stats} type="donut" />
                    </div>
                    :
                    <div className="main-content d-flex justify-content-center align-items-center">
                        <strong className="">No Record Found</strong>
                    </div>
            }
        </div>
    )
}
export default Percentage