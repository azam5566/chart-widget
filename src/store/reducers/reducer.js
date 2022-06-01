const initChartData = [{
    type: "machine",
    id: 106639,
    timeseries: [
        {
            time: 1555473904,
            value: 0.0
        },
        {
            time: 1555473906,
            value: 1.0
        },
        {
            time: 1555473929,
            value: 0.0
        },
        {
            time: 1555473981,
            value: 1.0
        },
        {
            time: 1555473994,
            value: 0.0
        }
    ]
},
{
    type: "machine2",
    id: 106638,
    timeseries: [
        {
            time: 1555473904,
            value: 0.0
        },
        {
            time: 1555473906,
            value: 0.6
        },
        {
            time: 1555473929,
            value: 0.5
        },
        {
            time: 1555473981,
            value: 0.8
        },
        {
            time: 1555473994,
            value: 0.0
        }
    ]
},
]
const initialState = {
    chartData: initChartData,
    chartDataSet: [0, 1]
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_CHART_DATA':
            return {
                ...state,
                chartData: action.payload
            }
        case 'UPDATE_CHART_DATA_SET':
            return {
                ...state,
                chartDataSet: action.payload
            }
        default:
            return state
    }
}
