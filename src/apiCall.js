import { useSelector } from "react-redux"
import { store } from './store/store';

export const apiCall = () => async dispatch => {

    const chartData = store.getState().chartData;

    if (chartData.length > 1) {
        const newChartData = await [{ ...chartData?.[0], timeseries: [...chartData?.[0].timeseries, { time: chartData?.[0].timeseries[chartData?.[0].timeseries.length - 1].time + 5, value: Math.random() }] },
        { ...chartData?.[1], timeseries: [...chartData?.[1].timeseries, { time: chartData?.[0].timeseries[chartData?.[1].timeseries.length - 1].time + 5, value: Math.random() }] }
        ];

        // console.log('====================================');
        // console.log({ newChartData });
        // console.log('====================================');

        dispatch({ type: 'UPDATE_CHART_DATA', payload: newChartData })
    }
}