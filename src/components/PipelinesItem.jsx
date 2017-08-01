import React, { Component, PropTypes } from 'react';
import moment                          from 'moment';


class PipelineItem extends Component {
    render() {
        const { project, pipeline } = this.props;

        const cssClasses = `list__item list__item--with-status list__item--with-status--${pipeline.status}`;

        return (
            <div className={cssClasses}>
                <a href={`${project.web_url}/pipelines/${pipeline.id}`} target="_blank">
                    #{pipeline.id}
                </a>
                <span className="label__group">
                    <span className="label__addon">ref</span>
                    <span className="label">{pipeline.ref}</span>
                </span>
                <span className="label__group">
                    <span className="label__addon">triggered by</span>
                    <span className="label">{pipeline.username}</span>
                </span>
            </div>
        );
    }
}

BuildHistoryItem.displayName = 'PipelineItem';

BuildHistoryItem.propTypes = {
    project: PropTypes.shape({
        web_url: PropTypes.string.isRequired
    }).isRequired,
    build: PropTypes.shape({
        id:          PropTypes.number.isRequired,
        status:      PropTypes.string.isRequired,
        finished_at: PropTypes.string,
        commit:      PropTypes.shape({
            message: PropTypes.string.isRequired
        })
    }).isRequired
};


export default BuildHistoryItem;
