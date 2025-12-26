import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
    tag: {
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "0.75em",
        fontWeight: 600,
        color: "#FFF",
        marginRight: "4px",
        whiteSpace: "nowrap",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        transition: "all 0.2s ease"
    }
}));

const ContactTag = ({ tag }) => {
    const classes = useStyles();

    return (
        <div className={classes.tag} style={{ backgroundColor: tag.color, marginTop: "2px" }}>
            {tag.name.toUpperCase()}
        </div>
    )
}

export default ContactTag;