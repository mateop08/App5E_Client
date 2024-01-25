import { Control, Controller, RegisterOptions } from "react-hook-form"
import { Input } from "reactstrap"

interface InputFileControlProps {
    // eslint-disable-next-line
    control: Control<any>,
    acceptedfiles: string,
    name: string,
    // eslint-disable-next-line
    rules?: Omit<RegisterOptions<any, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined
}

const InputFileControl: React.FC<InputFileControlProps> = (props) => {

    const {control, acceptedfiles, name} = props

    return (
        <Controller
            control={control}
            name = {name}
            rules = {{}}
            render={ ({field}) => {
                const {name, ref, onChange} = field
                return <Input type="file" name={name} {...ref} onChange={(e) => {
                    const files = e.target.files
                    if (files === null) return
                    const inputValue = files[0]
                    onChange(inputValue)
                    }
                    } accept={acceptedfiles} />
            }
            } />
    )
}

export default InputFileControl