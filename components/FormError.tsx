interface FormError {
    error: string
}

const style: React.CSSProperties = {
    color: 'red',
    fontSize: '14px',
    display: "block"
}

const FormError: React.FC<FormError> = ({error}) => {
    
    return (<span style={style}>{error}</span>)
}

export default FormError