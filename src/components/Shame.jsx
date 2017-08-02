import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import { ListenerMixin } from 'reflux';
import Mozaik from 'mozaik/browser';
import moment from 'moment';


class Shame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null,
            pipelines: []
        };
    }

    getApiRequest() {
        const { project } = this.props;

        return {
            id: `gitlab.projectPipelines.${project}`,
            params: { project }
        };
    }

    onApiData({ project, pipelines }) {
        this.setState({ project, pipelines });
    }

    render() {
        const { project, pipelines } = this.state;

        if (pipelines === undefined) {
            return null
        }

        let pipeline = undefined

        for (var i = 0; i < pipelines.length; i++) {
            if (pipelines[i].status == "failed") {
                if (moment(pipelines[i].started_at).isAfter(moment().subtract(4, 'hours'))) {
                    pipeline = pipelines[i]
                    break
                }
            }
        }

        if (pipeline === undefined) {
            return (
            <div>
                <div className="widget__header">
                    Wall of shame
                    <i className="fa fa-bolt" />
                </div>
                <div className="widget__body">
                    <br/>
                    <br/>
                    <span className="centered">
                        GOOD JOB!
                    </span>
                </div>
            </div>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    Wall of shame
                    <i className="fa fa-bolt" />
                </div>
                <div className="widget__body">
                    <span className="alert">Pipeline failed!</span><br/>
                    <span className="centered">
                        <a href={`${project.web_url}/pipelines/${pipeline.id}`} target="_blank">
                            #{pipeline.id}
                        </a>
                        &nbsp;&nbsp; ref: {pipeline.ref}
                    </span><br/><br/>
                    
                    <span className="alert">{pipeline.user.name}</span>
                </div>
            </div>
        );
    }
}

Shame.displayName = 'Shame';

Shame.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

reactMixin(Shame.prototype, ListenerMixin);
reactMixin(Shame.prototype, Mozaik.Mixin.ApiConsumer);


export default Shame;
