import React from "react";
// Material UI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, Grid, Button, Divider } from "@material-ui/core";


const useStyles = makeStyles({
    header: {
        backgroundColor: "rgba(162, 36, 175, 1) !important",
        // position: 'absolute',
    },
    dialogContent: {
        marginTop: "5px",
    },
    root: {
        //display: 'flex',
    },
    formControl: {
        margin: "30px",
    },
    labelNext: {
        marginLeft: " 158px",
        marginTop: "-5px"
    },
    topBot: {
        marginTop: "10px",
        marginBottom: "10px"
    },
    divider: {
        height: "5px",
        marginTop: "5px"
    },
});

const PopupDialog = (props) => {
    const { opened, handleClose, newArticle, error, handleChange, handleUpdate, handleDelete } = props;
    const classes = useStyles();

    const keyPressed = (event) => {
        if (event.key === "Enter") {
            //handleUpdate();
        }
    };

    return (
        <Dialog
            open={opened}
            onClose={handleClose}
            onKeyPress={keyPressed}
        //   maxWidth={"sm"}
          fullWidth={true}
        >
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Name"
                            name="name"
                            value={newArticle.name}
                            onChange={handleChange}
                            error={!newArticle.name && error}
                            style={{ width: "100%"}}
                        />
                        <TextField
                            label="Url"
                            name="url"
                            value={newArticle.url}
                            onChange={handleChange}
                            error={!newArticle.url && error}
                            style={{ width: "100%"}}
                        />
                        <TextField
                            label="Type"
                            name="type"
                            value={newArticle.type}
                            onChange={handleChange}
                            error={!newArticle.type && error}
                            style={{ width: "100%"}}
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={newArticle.description}
                            onChange={handleChange}
                            error={!newArticle.description && error}
                            style={{ width: "100%"}}
                            multiline
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <img src={newArticle.url} alt="article" style={{ width: "100%" }} />
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Button color="primary" variant="contained" style={{ marginTop: "10px" }} onClick={handleUpdate}>
                                {/* className={classes.footer} */}
                                {"Update"}
                            </Button>
                            <Button color="secondary" variant="contained" style={{ marginTop: "10px" }} onClick={handleDelete}>
                                {/* className={classes.footer} */}
                                {"Delete"}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export const ArticleDialog = PopupDialog;