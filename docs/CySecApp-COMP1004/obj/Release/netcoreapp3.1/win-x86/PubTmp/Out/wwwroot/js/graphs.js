$(document).ready( function(){

    createChart();
    createChartIP();
    createChartMal();
    createweekChart();
    createMonthChart();
    //creating graphs
    
    async function createChart(){
        const data = await retrieveData();
        const ctx = document.getElementById('chart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.anomalies,
                datasets: [{
                    label: 'Without anomalies',
                    data: data.connections,   
                    borderColor: "#3e95cd",
                    borderWidth: 1,
                    fill: false,
                },
                {
                    data: data.connectionsanom,
                    label: "With anomalies",
                    borderColor: "#c45850",
                    borderWidth: 1,
                    fill: false,
                }
            ]
            },
            options: {
                title:{
                    display: true,
                    text: "Connections to business systems by users per day over a 3 month period",
                    fontSize: 18,
                },
                scales: {
                    xAxes: [{
                        scaleLabel:{
                            display: true,
                            labelString: "Dates",
                            fontStyle: 'bold',
                        },
                        ticks: {
                            fontStyle: 'bold',
                            maxTicksLimit: 15,
                        }
                    }],
                    yAxes: [{
                        scaleLabel:{
                            display: true,
                            labelString: "Connections to systems",
                            fontStyle: 'bold',
                        },
                        ticks:{
                            beginAtZero: true,
                            fontStyle: 'bold',
                        }
                    }]
                }
            }
        });
    }

    // Parse local CSV file
    async function retrieveData(){
        const xlabels = [];
        const connections = [];
        const anomalies = [];
        const connectionsanom = [];    
        const response = await fetch('cs448b_ipasn_v2.csv');
        const data = await response.text();
        console.log(data);
        const rows = data.split('\n').slice(1);
        rows.forEach(elt => {
            const row = elt.split(',');
            const day = row[0];
            const extraday = row[3];
            xlabels.push(day);
            anomalies.push(extraday);
            const connect = row[1];
            const connect2 = row[4];
            connections.push(connect);
            connectionsanom.push(connect2);
            console.log(day, connect);
            console.log(extraday, connect2);
        });
        return {xlabels, connections, anomalies, connectionsanom};
    }
    }); 


    async function createChartIP(){
        const data = await retrieveIPData();
        const ctx = document.getElementById('chartIP').getContext('2d');
    
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.xlabels,
                datasets: [{
                    label: 'IP connections',
                    data: data.IPconnections,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(0, 128, 0, 0.3)',
                        'rgba(200, 45, 100, 0.2)',
                        'rgba(100, 35, 255, 0.2)',
                        'rgba(0, 255, 69, 0.3)',
                    ] ,   
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(0, 128, 0, 1)',
                        'rgba(200, 45, 100, 1)',
                        'rgba(100, 35, 255, 1)',
                        'rgba(0, 255, 69, 1)',
                    ],
                    borderWidth: 1,
                }
            ]
            },
            options: {
                title:{
                    display: true,
                    text: "Frequencies of Connections to business systems by users on different 10 locations",
                    fontSize: 18,
                },
                scales: {
                    xAxes: [{
                        scaleLabel:{
                            display: true,
                            labelString: "IP location",
                            fontStyle: 'bold',
                        },
                        ticks: {
                            fontStyle: 'bold',
                            maxTicksLimit: 15,
                        }
                    }],
                    yAxes: [{
                        scaleLabel:{
                            display: true,
                            labelString: "Connections to systems",
                            fontStyle: 'bold',
                        },
                        ticks:{
                            beginAtZero: true,
                            fontStyle: 'bold',
                        }
                    }]
                }
            }
        });
    }
    


    // Parse local CSV file
    async function retrieveIPData(){
        const xlabels = [];
        const IPconnections = [];
    
        const response = await fetch('UsersIP.csv');
        const data = await response.text();
        console.log(data);
    
        const rows = data.split('\n').slice(1);
        rows.forEach(elt => {
            const row = elt.split(',');
            const IP = row[0];
            xlabels.push(IP);
            const IPconnectf = row[1];
            IPconnections.push(IPconnectf);
            console.log(IP, IPconnectf);
        });
        return {xlabels, IPconnections};
    }

    //malware data graph

    async function createChartMal(){
        const data = await retrieveMalData();
        const ctx = document.getElementById("chartMal").getContext('2d');
    
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.malwaretypes,
                datasets: [{
                    label: 'Distribution of attacks by types of malware',
                    data: data.maldist,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(0, 128, 0, 1)',
                        'rgba(200, 45, 100, 1)',
                        'rgba(100, 35, 255, 1)',
                        
                    ] ,   
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(0, 128, 0, 1)',
                        'rgba(200, 45, 100, 1)',
                        'rgba(100, 35, 255, 1)',
                    ],
                    borderWidth: 1.5,
                    hoverOffset: 4,
                }
            ]
            },
            options: {
                title:{
                    display: true,
                    text: "Distribution of attacks caused by malware filtered by malware type in 2019.",
                    fontSize: 18,
                },
            }
        });
    }


    async function retrieveMalData(){
        const malwaretypes = [];
        const maldist = [];
    
        const response = await fetch('malware.csv');
        const data = await response.text();
        console.log(data);
    
        const rows = data.split('\n').slice(1);
        rows.forEach(elt => {
            const row = elt.split(',');
            const mal = row[0];
            malwaretypes.push(mal);
            const percent = row[1];
            maldist.push(percent);
            console.log(mal, percent);
        });
        return {malwaretypes, maldist};
    }

    
        
        async function createweekChart(){
            const data = await retrieveweekData();
            const ctx = document.getElementById('weekchart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.anomalies,
                    datasets: [{
                        label: 'Without anomalies',
                        data: data.connections,   
                        borderColor: "#3e95cd",
                        borderWidth: 1,
                        fill: false,
                    },
                    {
                        data: data.connectionsanom,
                        label: "With anomalies",
                        borderColor: "#c45850",
                        borderWidth: 1,
                        fill: false,
                    }
                ]
                },
                options: {
                    title:{
                        display: true,
                        text: "Connections to business systems by users per day over the last week",
                        fontSize: 18,
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel:{
                                display: true,
                                labelString: "Dates",
                                fontStyle: 'bold',
                            },
                            ticks: {
                                fontStyle: 'bold',
                            }
                        }],
                        yAxes: [{
                            scaleLabel:{
                                display: true,
                                labelString: "Connections to systems",
                                fontStyle: 'bold',
                            },
                            ticks:{
                                beginAtZero: true,
                                fontStyle: 'bold',
                            }
                        }]
                    }
                }
            });
        }
    
        // Parse local CSV file
        async function retrieveweekData(){
            const xlabels = [];
            const connections = [];
            const anomalies = [];
            const connectionsanom = [];    
            const response = await fetch('cs448b_ipasn_v2.csv');
            const data = await response.text();
            console.log(data);
            const rows = data.split('\n').slice(1);
            for(var i = 0; i < 7; i++){
                var elt = rows[i];
                const row = elt.split(',');
                const day = row[0];
                const extraday = row[3];
                xlabels.push(day);
                anomalies.push(extraday);
                const connect = row[1];
                const connect2 = row[4];
                connections.push(connect);
                connectionsanom.push(connect2);
                console.log(day, connect);
                console.log(extraday, connect2);
            }
            return {xlabels, connections, anomalies, connectionsanom};
        }
        
        async function createMonthChart(){
            const data = await retrieveMonthData();
            const ctx = document.getElementById('monthchart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.anomalies,
                    datasets: [{
                        label: 'Without anomalies',
                        data: data.connections,   
                        borderColor: "#3e95cd",
                        borderWidth: 1,
                        fill: false,
                    },
                    {
                        data: data.connectionsanom,
                        label: "With anomalies",
                        borderColor: "#c45850",
                        borderWidth: 1,
                        fill: false,
                    }
                ]
                },
                options: {
                    title:{
                        display: true,
                        text: "Connections to business systems by users per day over the last month",
                        fontSize: 18,
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel:{
                                display: true,
                                labelString: "Dates",
                                fontStyle: 'bold',
                            },
                            ticks: {
                                fontStyle: 'bold',
                            }
                        }],
                        yAxes: [{
                            scaleLabel:{
                                display: true,
                                labelString: "Connections to systems",
                                fontStyle: 'bold',
                            },
                            ticks:{
                                beginAtZero: true,
                                fontStyle: 'bold',
                            }
                        }]
                    }
                }
            });
        }
    
        // Parse local CSV file
        async function retrieveMonthData(){
            const xlabels = [];
            const connections = [];
            const anomalies = [];
            const connectionsanom = [];    
            const response = await fetch('cs448b_ipasn_v2.csv');
            const data = await response.text();
            console.log(data);
            const rows = data.split('\n').slice(1);
            for(var i = 0; i < 31; i++){
                var elt = rows[i];
                const row = elt.split(',');
                const day = row[0];
                const extraday = row[3];
                xlabels.push(day);
                anomalies.push(extraday);
                const connect = row[1];
                const connect2 = row[4];
                connections.push(connect);
                connectionsanom.push(connect2);
                console.log(day, connect);
                console.log(extraday, connect2);
            }
            return {xlabels, connections, anomalies, connectionsanom};
        }
        