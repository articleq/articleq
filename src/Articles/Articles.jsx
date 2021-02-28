import React from 'react';
import { connect } from 'react-redux';

import { articleActions } from '../_actions';
import SideBar from '../NavBars/SideBar';
import { Paper, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, ButtonBase } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { ArticleDialog } from './ArticleDialog';

const initialState = {
    newArticle: {
        name: '',
        url: '',
        type: '',
        discription: '',
    },
    updateArticle: false,
    error: false,
    sideBarOpen: false,
}

class Articles extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.setArticle = this.setArticle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.openSideBar = this.openSideBar.bind(this);
    }

    componentDidMount() {
        console.log("compponenet did mount")
        this.props.getAll();
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { newArticle } = this.state;
        this.setState({
            newArticle: {
                ...newArticle,
                [name]: value
            }
        });
    }

    handleSubmit() {
        const { newArticle } = this.state;
        if (newArticle.name && newArticle.url) {
            this.props.register(newArticle);
        } else {
            this.setState({ ...this.state, error: true })
        }
    }

    handleUpdate() {
        const { newArticle } = this.state;
        if (newArticle.name && newArticle.url) {
            this.props.update(newArticle);
            this.setState(initialState);
        } else {
            this.setState({ ...this.state, error: true })
        }
    }

    handleDelete() {
        this.props.delete(this.state.newArticle.id);
        this.setState(initialState);
    }

    setArticle(id) {
        var foundArticle = this.props.articles.items.find(element => element.id === id);
        this.setState({ newArticle: foundArticle, updateArticle: true, error: false, sideBarOpen: false });
    }

    handleClear() {
        this.setState(initialState);
    }

    openSideBar() {
        this.setState({ sideBarOpen: !this.state.sideBarOpen });
    }

    render() {
        const { user, articles } = this.props;
        const { newArticle, updateArticle, error, sideBarOpen } = this.state;
        return (
            <div style={sideBarOpen ? { marginLeft: "220px" } : {}}>
                <SideBar user={user} openSideBar={this.openSideBar} />
                {updateArticle ?
                    <ArticleDialog
                        opened={updateArticle}
                        handleClose={this.handleClear}
                        newArticle={newArticle}
                        error={error}
                        handleUpdate={this.handleUpdate}
                        handleDelete={this.handleDelete}
                        handleChange={this.handleChange}
                    />
                    : <>
                        <Typography>
                            Create Article
                        </Typography>
                        {articles.updating ?
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            : <>
                                <Paper style={{ marginBottom: "50px", padding: "20px" }}>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={newArticle.name}
                                        onChange={this.handleChange}
                                        error={!newArticle.name && error}
                                        style={{ marginLeft: "10px", marginRight: "10px" }}
                                    />
                                    <TextField
                                        label="Url"
                                        name="url"
                                        value={newArticle.url}
                                        onChange={this.handleChange}
                                        error={!newArticle.url && error}
                                        style={{ marginLeft: "10px", marginRight: "10px" }}
                                    />
                                    <TextField
                                        label="Type"
                                        name="type"
                                        value={newArticle.type}
                                        onChange={this.handleChange}
                                        error={!newArticle.type && error}
                                        style={{ marginLeft: "10px", marginRight: "10px", width: "140px" }}
                                    />
                                    <TextField
                                        label="Description"
                                        name="description"
                                        value={newArticle.description}
                                        onChange={this.handleChange}
                                        error={!newArticle.description && error}
                                        style={{ marginLeft: "10px", marginRight: "10px" }}
                                        multiline
                                    />
                                    <Button color="primary" variant="contained" style={{ margin: "10px" }} onClick={this.handleSubmit}>
                                        {/* className={classes.footer} */}
                                        {"Create"}
                                    </Button>
                                </Paper>
                            </>}
                        <Typography>
                            articles
                        </Typography>
                        {articles.loading ?
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            : articles.items ?
                                <Paper style={{ marginBottom: "50px", padding: "20px" }}>
                                    <Grid container spacing={3}>
                                        {articles.items.map(article =>
                                            <Grid key={article.id} item xs={6} sm={3}>
                                                <ButtonBase onClick={() => this.setArticle(article.id)} style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                                                    <Grid container direction="column">
                                                        <Grid item>
                                                            <img src={article.url} alt="article" style={{ width: "100%" }} />
                                                        </Grid>
                                                        <Grid item>
                                                            {article.description}
                                                        </Grid>
                                                    </Grid>
                                                </ButtonBase>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Paper>
                                : <Typography>
                                    No articles here!
                                </Typography>
                        }
                    </> }
            </div>
        );
    }
}

function mapState(state) {
    const { articles, authentication } = state;
    const { user } = authentication;
    return { user, articles };
}

const actionCreators = {
    getAll: articleActions.getAll,
    delete: articleActions.delete,
    register: articleActions.register,
    update: articleActions.update
}

const connectedHomePage = connect(mapState, actionCreators)(Articles);
export { connectedHomePage as Articles };