import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { Articles } from '../Articles';
import { Users } from '../Users';
import { LoginPage } from '../LoginPage';
import { withSnackbar } from 'notistack';
import { makeStyles, MuiThemeProvider, createMuiTheme, Theme } from "@material-ui/core/styles";
// import { darkTheme, lightTheme } from '../Styles';

const _fontSize = 20;
const _fontWeight = 100;
const darkTheme = createMuiTheme({
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
    paper: {
        marginBottom: "50px",
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
    }
});

const lightTheme = createMuiTheme({
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
    paper: {
        marginBottom: "50px",
    },
});
class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
        // this.handleSnackBar = this.handleSnackBar.bind(this);
    }
    componentDidUpdate() {
        const { alert } = this.props;
        if (alert.message) this.props.enqueueSnackbar(alert.message, { variant: alert.type });
    }
    render() {
        const { user } = this.props;
        let isDarkMode = false;
        return (
            <div>
                <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    <div className="jumbotron">
                    <div className="container">
                    {/* <div className="col-sm-8 col-sm-offset-2"> */}
                    {/* <div className="col-sm-12 col-sm-offset-1"> */}
                    {/* {alert.message &&
                             <div className={`alert ${alert.type}`}>
                                 {alert.message}
                            </div>
                        } */}
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/articles" component={Articles} />
                            <PrivateRoute exact path="/users" component={Users} />
                            <Route path="/login" component={LoginPage} />
                            <Redirect from="*" to="/articles" />
                        </Switch>
                    </Router>
                    {/* </div> */}
                    </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(withSnackbar(App));
export { connectedApp as App };