import { Line } from 'react-chartjs-2';

function ProgressPage() {
    return (
        <>
            <div id="progress-page">
                <h1>Your Progression</h1>
                <Line
                    datasetIdKey='id'
                    data={{
                        labels: ['Jun', 'Jul', 'Aug'],
                        datasets: [
                            {
                                id: 1,
                                label: '',
                                data: [5, 6, 7],
                            },
                            {
                                id: 2,
                                label: '',
                                data: [3, 2, 1],
                            },
                        ],
                    }}
                />
            </div>
        </>
    )
}

export default ProgressPage;