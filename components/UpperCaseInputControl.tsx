import { Control, Controller, RegisterOptions } from "react-hook-form"


interface UpperCaseInput extends React.InputHTMLAttributes<HTMLInputElement> {
    // eslint-disable-next-line
    control: Control<any>
    name: string
    // eslint-disable-next-line
    rules?: Omit<RegisterOptions<any, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined
}


const UpperCaseInputControl: React.FC<UpperCaseInput> = (props) => {

    const {control, name, rules, ...rest} = props
    return (
        <Controller
            control={control}
            name = {name}
            rules = {rules}
            render={ ({field}) => {
                return <input className="form-control" {...field} {...rest} 
                    onChange={(e) => {
                        //console.log(e)
                        field.onChange(e.target.value.toUpperCase())
                    }} />
            }
            }
        />
    )
}

export default UpperCaseInputControl