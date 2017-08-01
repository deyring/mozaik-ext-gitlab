import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import { ListenerMixin } from 'reflux';
import Mozaik from 'mozaik/browser';
import PipelineItem from './PipelineItem.jsx';


class Pipelines extends Component {
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

        return (
            <div>
                <div className="widget__header">
                    Build history
                    <i className="fa fa-bars" />
                </div>
                <div className="widget__body">
                    {pipelines.map(pipeline => (
                        <PipelineItem key={pipeline.id} project={project} pipeline={pipeline} />
                    ))}
                </div>
            </div>
        );
    }
}

BuildHistory.displayName = 'BuildHistory';

BuildHistory.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

reactMixin(BuildHistory.prototype, ListenerMixin);
reactMixin(BuildHistory.prototype, Mozaik.Mixin.ApiConsumer);


export default BuildHistory;
