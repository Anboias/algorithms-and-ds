import constants from "../constants"

export default {
  button: {
    border: "2px solid gray",
    color: "gray",
    padding: "3px 7px",
    textDecoration: "none",
    textTransform: "none",
    fontWeight: 500,
    fontSize: 14,
    "&:hover": {
      border: `2px solid ${constants.COLORS.DARK_GREEN}`,
      backgroundColor: constants.COLORS.DARK_GREEN,
      color: "white",
    },
    "&.active": {
      border: `2px solid ${constants.COLORS.DARK_GREEN}`,
      backgroundColor: constants.COLORS.DARK_GREEN,
      color: "white",
    },
  },
}
