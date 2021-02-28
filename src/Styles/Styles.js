import { makeStyles, createMuiTheme, Theme } from "@material-ui/core/styles";

const _fontSize = 10;
const _fontWeight = 100;
export const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#ffcc80",
        },
        secondary: {
            main: "#9fa8da"
        }
    },
    typography: {

        fontSize: _fontSize,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    overrides: {
        // @ts-ignore
      MUIDataTableBodyCell: {
        root: {
            fontSize:"11px",
            paddingTop:"0",
            paddingBottom:"0",
            paddingRight: "0",
        }
      },
    //   MUIDataTableHeadCell: {
    //     toolButton: {
    //       justifyContent: 'center'
    //     },
    //   },
    }
});
export const lightTheme = createMuiTheme({
    palette: {
        type: "light"
    },
    typography: {
        fontSize: _fontSize,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    overrides: {
        // @ts-ignore
      MUIDataTableBodyCell: {
        root: {
            fontSize:"11px",
            paddingTop:"0",
            paddingBottom:"0",
            paddingRight: "0",
            paddingLeft: "1",
        }
      },
    //   MUIDataTableHeadCell: {
    //     toolButton: {
    //       justifyContent: 'center'
    //     },
    //   },
    }
});

export const styles = {  // makeStyles((theme) => (
    // root: {
    //     height: '100vh',
    // },
    // image: {
    //     backgroundColor: theme.palette.primary.main,
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    // },
    paper: {
        marginTop: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "50px", 
        padding: "20px",
        backgroundColor: "white",
    },
    // avatar: {
    //     margin: theme.spacing(2)
    // },
    // form: {
    //     width: "100%", // Fix IE 11 issue.
    //     marginTop: theme.spacing(1)
    // },
    // formControl: {
    //     margin: theme.spacing(1)
    // },
    // closeButton: {
    //     marginLeft: theme.spacing(3)
    // },
    textField: {
        marginLeft: "20px",
        marginRight: "20px",
        // width: "50%"
    },
    // underline: {
    //     "&:after": {
    //         borderBottomColor: "2px #f50057 solid"
    //     }
    // },
    // submit: {
    //     margin: theme.spacing(3, 0, 2),
    // },

};
