import './Switch.css';

interface Switch {
    isToggled: boolean,
    onToggle: VoidFunction
}

const Switch: React.FC<Switch> = ({isToggled, onToggle }) => {

    return (
        <label className="switch">
            <input type="checkbox" checked={isToggled} onChange={onToggle}/>
            <span className="slider" />
        </label>
    )
}

export default Switch;