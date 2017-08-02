import React, { Component, PropTypes } from 'react';
import moment from 'moment';


class PipelineItem extends Component {
    render() {
        const { project, pipeline } = this.props;

        const cssClasses = `list__item list__item--with-status list__item--with-status--${pipeline.status}`;
        
        return (
            <div className={cssClasses}>
                <span className="gitlab__pipelines__avatar">
                    <img src={pipeline.user.avatar_url} alt={pipeline.user.username} />
                </span>&nbsp;&nbsp;
                <a href={`${project.web_url}/pipelines/${pipeline.id}`} target="_blank">
                    #{pipeline.id}
                </a>
                &nbsp;
                <span className="label__group">
                    <span className="label__addon">ref</span>
                    <span className="label">{pipeline.ref}</span>
                </span>
                <span className="label__group">
                    <span className="label__addon">triggered by</span>
                    <span className="label">{pipeline.user.name}</span>
                </span>
                
                <br />
                {pipeline.finished_at && (
                    <time className="list__item__time">
                        <i className="fa fa-clock-o" />&nbsp;
                        {moment(pipeline.finished_at).fromNow()}
                    </time>
                )}
            </div>
        );
    }
}

PipelineItem.displayName = 'PipelineItem';

PipelineItem.propTypes = {
    project: PropTypes.shape({
        web_url: PropTypes.string.isRequired
    }).isRequired,
    pipeline: PropTypes.shape({
        id: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        ref: PropTypes.string.isRequired,
        finished_at: PropTypes.string,
    }).isRequired
};


export default PipelineItem;
