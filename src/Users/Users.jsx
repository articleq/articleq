import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import SideBar from '../NavBars/SideBar';
import { Paper, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

const initialState = {
    newUser: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        // createdt: '',
    },
    updateUser: false,
    error: false,
    sideBarOpen: false,
}

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.setUser = this.setUser.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.openSideBar = this.openSideBar.bind(this);
    }

    componentDidMount() {
        console.log("compponenet did mount")
        this.props.getAll();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.register.registering && !nextProps.register.registering) {
            this.props.getAll();
        }
        // if (this.props.isPosting === true && nextProps.isPosting === false) {
        //     this.props.fetchMessages();
        // }
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { newUser } = this.state;
        this.setState({
            newUser: {
                ...newUser,
                [name]: value
            }
        });
    }

    handleSubmit() {
        const { newUser } = this.state;
        if (newUser.firstName && newUser.lastName && newUser.password && newUser.email && newUser.role) {
            this.props.register(newUser);
        } else {
            this.setState({ ...this.state, error: true })
        }
    }

    handleUpdate() {
        const { newUser } = this.state;
        if (newUser.firstName && newUser.lastName && newUser.password && newUser.email && newUser.role) {
            this.props.update(newUser);
        } else {
            this.setState({ ...this.state, error: true })
        }
    }

    handleDeleteUser() {
        //Protect the application by keeping atleast one admininistrator
        if (this.state.newUser.role === "admin") {
            var users = this.props.users;
            var count = 0;
            for (var i = 0; i < users.length; i++) {
                if (users.role === "admin") count++
            }
            if (count < 2) {
                alert("This application needs atleast one admin! \n\r Create another admin if you have to delete this one.");
            } else {
                this.props.delete(this.state.newUser.id);
                this.setState(initialState);
            }
        } else {
            this.props.delete(this.state.newUser.id);
            this.setState(initialState);
        }
    }

    setUser(id) {
        this.setState({ newUser: this.props.users.items[id], updateUser: true, error: false });
    }

    handleClear() {
        this.setState(initialState);
    }

    openSideBar() {
        this.setState({ sideBarOpen: !this.state.sideBarOpen });
    }

    render() {
        const { user, users, registering } = this.props;
        const { newUser, updateUser, error, sideBarOpen } = this.state;
        console.log(users);
        console.log("nu")
        const options = {
            //filterType: 'checkbox',
            dropdown: 'true',
            download: true,
            viewColumns: true,
            filter: false,
            print: true,
            selectableRows: "none",
            pagination: false,

            onRowClick: (rowData, rowMeta) => {
                this.setUser(rowMeta.dataIndex);
            },
        };
        const columns = [
            { name: "firstName", label: "first name" },
            { name: "lastName", label: "Last name" },
            { name: "email", label: "Email" },
            {
                name: "password", label: "Password",
                options: {
                    customBodyRenderLite: (dataIndex) => {
                        return "*****"
                    }
                }
            },
            {
                name: "role", label: "Role",
                // options: {
                //     customBodyRenderLite: (dataIndex) => {
                //         if (uppdragToDo[dataIndex].role === "admin")
                //             return <Check />
                //         else
                //             return <Clear />
                //     }
                // }
            },
            {
                name: "createdt", label: "Created",
                options: {
                    customBodyRenderLite: (dataIndex) => {
                        if (users.items[dataIndex].createdt)
                            return users.items[dataIndex].createdt.substr(0, 10);
                        else
                            return "?"
                    }
                }
            },
        ];
        return (
            <div style={sideBarOpen ? { marginLeft: "220px" } : {}}>
                <SideBar
                    user={user}
                    openSideBar={this.openSideBar}
                />
                <Typography>
                    Create User
                </Typography>
                {registering || users.updating ?
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    : <>
                        <Paper style={{ marginBottom: "50px", padding: "20px" }}>
                            <TextField
                                label="First name"
                                name="firstName"
                                value={newUser.firstName}
                                onChange={this.handleChange}
                                error={!newUser.firstName && error}
                                style={{ marginLeft: "10px", marginRight: "10px" }}
                            // helperText="Incorrect entry"
                            />
                            <TextField
                                label="Last name"
                                name="lastName"
                                value={newUser.lastName}
                                onChange={this.handleChange}
                                error={!newUser.lastName && error}
                                style={{ marginLeft: "10px", marginRight: "10px" }}
                            // helperText="Incorrect entry"
                            // variant="outlined"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                value={newUser.email}
                                onChange={this.handleChange}
                                error={!newUser.email && error}
                                style={{ marginLeft: "10px", marginRight: "10px", width: "220px" }}
                            // helperText="Incorrect entry"
                            />
                            <TextField
                                label="Password"
                                name="password"
                                value={newUser.password}
                                type="password"
                                disabled={updateUser}
                                onChange={this.handleChange}
                                error={!newUser.password && error}
                                style={{ marginLeft: "10px", marginRight: "10px" }}
                            // helperText="Incorrect entry"

                            />
                            <FormControl style={{ marginLeft: "10px", marginRight: "10px", width: "164px" }}>
                                <InputLabel id="rolelabel" error={!newUser.role && error}>Role</InputLabel>
                                <Select
                                    labelId="rolelabel"
                                    id="role"
                                    name="role"
                                    value={newUser.role}
                                    onChange={this.handleChange}
                                    error={!newUser.role && error}
                                // helperText="Incorrect entry"
                                >
                                    <MenuItem value={''}></MenuItem>
                                    <MenuItem value={'editor'}>Editor</MenuItem>
                                    <MenuItem value={'admin'}>Admin</MenuItem>
                                </Select>
                            </FormControl>
                            <Button color="primary" variant="contained" style={{ margin: "10px" }} onClick={updateUser ? this.handleUpdate : this.handleSubmit}>
                                {/* className={classes.footer} */}
                                {updateUser ? "Update" : "Create"}
                            </Button>
                            {updateUser ? <>
                                <Button color="primary" variant="contained" style={{ margin: "10px" }} onClick={this.handleClear}>
                                    {/* className={classes.footer} */}
                                    {"Clear"}
                                </Button>
                                <Button color="secondary" variant="contained" style={{ margin: "10px" }} onClick={this.handleDeleteUser}>
                                    {/* className={classes.footer} */}
                                    {"Delete"}
                                </Button>
                            </> : null}
                        </Paper>
                    </>}
                <Typography>
                    Find user
                </Typography>
                {users.loading ?
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    :
                    <Grid>
                        <MUIDataTable
                            title={"Users"}
                            data={users.items}
                            columns={columns}
                            options={options}
                        />
                    </Grid>
                }
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication, registration } = state;
    const { user } = authentication;
    const { registering } = registration;
    return { user, users, registering };
}

const actionCreators = {
    getAll: userActions.getAll,
    delete: userActions.delete,
    register: userActions.register,
    update: userActions.update
}

const connectedHomePage = connect(mapState, actionCreators)(Users);
export { connectedHomePage as Users };