import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

const CustomIconTypography = ({ icon, label, value, ...props }) => {
  return (
    <Stack {...props} direction="row" spacing={1}>
      {icon ? icon : null}
      <Stack direction={"row"} spacing={1}>
        <Typography>
          <b>{label}</b>
        </Typography>
        <Typography>{value}</Typography>
      </Stack>
    </Stack>
  );
};

export default CustomIconTypography;
