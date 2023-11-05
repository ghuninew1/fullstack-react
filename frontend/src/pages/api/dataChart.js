// data chart.js rael time chart
const data = {
    datasets: [
        {
            label: "Realtime Dataset",
            data: [],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
        },
    ],
};
//chart.js options rael time chart
const options = 
    {
        scales: {
            x: {
                type: "realtime",
                // realtime: {

            

                
                //     onUpdate: function (chart) {
                //         console.log("update");
                //         chart.data.datasets.forEach(function (dataset) {
                //             dataset.data.push({
                //                 x: Date.now(),
                //                 y: Math.random() * 100,
                //             });
                //         });
                //     } 
                // },

                // },

                // onRefresh: function (chart) {
                //     console.log("refresh");
                //     chart.data.datasets.forEach(function (dataset) {
                //         dataset.data.push({
                //             x: Date.now(),
                //             y: Math.random() * 100,
                //         });
                //     });
                // },

                delay: 2000,
            },
        },
    };


export { data, options };
