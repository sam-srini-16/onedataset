function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

async function promiseData(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await fetch(url);
            const json = await request.json();
            resolve(json);
        } catch (err) {
            reject(err);
        }
    })
}

// Edit this function to rearrange your data into something a chart can display
function processChartData(data) {
    // const dataForChart = data.reduce((collection, item, idx) => {
    //     if (!collection[item.category]) {
    //         collection[item.category] = 1
    //     }
    //      else {
    //         collection[item.category] += 1
    //      }
    //     return collection;
    // }, {})

    // const filteredData = data.filter(item => {
    //   return item.
    // })

    const dataForChart = data.reduce(
        (collection, item) => {
            if (!collection[item.category]) {
                collection[item.category] = 1
            }
            else {
                collection[item.category] += 1
            }
            return collection;
        }, 
        {})


    console.log('dataForChart', dataForChart);

    const labels = Object.keys(dataForChart);
    console.log(labels)

    const dataSet = {
        label: 'Categories',
        data: Object.values(dataForChart),
        borderWidth: 1
    }

    return {
        dataSet,
        labels
    }
}


async function mainEvent() {
    console.log('Loaded script.js');

    const results = await fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json");
    const chartInfo = await results.json();
    console.log(chartInfo);

    // const filteredData = chartInfo.filter(item => item.establishment_id === "911")
    // console.log(filteredData);

    // const newArray = chartInfo.map(item => item.name)
    // console.log(newArray);

    const processedData = processChartData(chartInfo);
    console.log(processedData);

    // const results = await fetch(url);
    // // This changes the response from the GET into data we can use - an "object"
    // const storedList = await results.json();
    //   Chart JS default getting started
    const ctx = document.querySelector('#myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: processedData.labels,
            datasets: [processedData.dataSet]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());
