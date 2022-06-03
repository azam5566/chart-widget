import { ZoomIn, ZoomOut } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import uPlot from 'uplot'
import UplotReact from 'uplot-react'
import { findProp } from '../util'

export default function Chart(props) {
    const chartDataSet = useSelector(state => state.chartDataSet);
    const chartData = useSelector(state => state.chartData)

    function getPath() {
        let path = chartDataSet[props?.index]
        console.log({ path });
        if (typeof path !== "string") {
            if (path?.length > 0) {
                let pathArr = []
                path.forEach(item => {
                    pathArr.push([item])
                })

                console.log('====================================');
                console.log({ pathArr });
                console.log('====================================');
                let finalPath = chartData[props?.index]
                pathArr.forEach((item, index) => {
                    finalPath = finalPath[item]
                })

                return finalPath
            }

        } else {
            return chartData[props?.index]
        }
    }

    getPath()

    // let xData = chartData[chartDataSet[props?.index]]?.timeseries?.map(item => item.time)
    // let yData = chartData[chartDataSet[props?.index]]?.timeseries?.map(item => item.value)
    let xData = getPath()?.timeseries?.map(item => item.time)
    let yData = getPath()?.timeseries?.map(item => item.value)
    let currentZoom = 1
    let chartRef

    return (
        <div style={{
            padding: 10,
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            borderRadius: 10,
        }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20 }}>
                <IconButton onClick={(e) => {
                    e.preventDefault()
                    chartRef.setScale('y', { min: 0, max: currentZoom + 1 })
                    currentZoom++
                }}
                    style={{ backgroundColor: '#a9daa9', marginRight: 10 }}
                >
                    <ZoomIn />
                </IconButton>
                <IconButton onClick={(e) => {
                    e.preventDefault()
                    chartRef.setScale('y', { min: 0, max: currentZoom - 1 })
                    currentZoom--
                }}
                    style={{ backgroundColor: '#e38e8e', marginRight: 10 }}
                >
                    <ZoomOut />
                </IconButton>
                <Button variant='contained' color='warning' onClick={props?.openDrawer}>
                    Edit
                </Button>
            </div>

            <UplotReact
                options={{
                    tzDate: ts => uPlot.tzDate(new Date(ts * 1e3), 'Europe/London'),
                    height: props.size.height,
                    width: props.size.width,
                    series: [{
                        value: "{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}"
                    }, { stroke: "black", label: "Value" }],
                    // scales: {
                    //     x: {
                    //         time: false
                    //     }
                    // }
                    cursor: {
                        drag: {
                            setScale: false,
                        }
                    },
                    select: {
                        show: false,
                    },
                }}
                data={[
                    xData,
                    yData
                ]}
                onCreate={(chart) => {
                    chartRef = chart
                    // console.log('====================================');
                    // console.log({ chart });
                    // console.log('====================================');
                }}
            />
        </div>
    )
}
