import { FakeReact } from './utils/framework'
import './style.css'

const clock = () => {
  const [time, setTime] = FakeReact.useState(new Date().toLocaleTimeString('en-us', { hour12: false }))
  const [alarm, setAlarm] = FakeReact.useState(null);

  FakeReact.useEffect(() => {
    if (time === alarm) {
      alert('beep!')
    }
  }, [time, alarm])

  const handleAlarm = (alarmTime) => {
    setAlarm(alarmTime)
  }

  const render = () => {
    let el = alarm
      ? `
        <h1>It is currently ${time}</h1>
        <h1>Alarm is set for ${alarm}</h1>
      `
      : `
        <h1>It is currently ${time}</h1>
      `

    const alarmTime = document.getElementById('alarmTime')
    alarmTime.addEventListener('input', e => {
      const alarmValue = e.target.value + ':00'
      handleAlarm(alarmValue)
    })

    document.querySelector('#container').innerHTML = el
  }

  return { render }
}

FakeReact.renderLoop(clock)
