import { InputAdornment, TextField } from "@mui/material";


const IconTextField = ({ iconStart, iconEnd, InputProps, setFieldValueMethod, ...props }) => {
    return (
        <TextField
            {...props}
            onChange={(newValue) => { setFieldValueMethod(newValue.target.value) }}
            InputProps={{
                ...InputProps,
                startAdornment: iconStart ? (
                    <InputAdornment position="start">{iconStart}</InputAdornment>
                ) : null,
                endAdornment: iconEnd ? (
                    <InputAdornment position="end">{iconEnd}</InputAdornment>
                ) : null
            }}
        />
    );
};

export default IconTextField;