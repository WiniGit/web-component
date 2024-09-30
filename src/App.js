import './App.css';
import { CardInfo } from './component/card/card';
import { Chart } from './component/chart/line-chart';
import { Switch } from './component/switch/switch';

export default function App() {
    return <div className="hello world" style={{ alignContent: 'center', alignItems: 'center', flex: 1, width: '100%', height: '100%' }}>
        <CardInfo />
        <Chart />
    </div>
}