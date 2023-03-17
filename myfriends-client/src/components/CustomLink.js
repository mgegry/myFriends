import { Link } from "@mui/material";

const CustomLink = ({
  title,
  color,
  hoverColor,
  hoverBackgroundColor,
  ...props
}) => {
  return (
    <Link
      {...props}
      underline="none"
      sx={{
        color: { color },
        padding: "3%",
        // borderRadius: "5%",
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px",
        cursor: "pointer",
        "&:hover": {
          color: `${hoverColor}`,
          marginLeft: "5%",
          backgroundColor: `${hoverBackgroundColor}`,
        },
      }}
    >
      {title}
    </Link>
  );
};

export default CustomLink;
