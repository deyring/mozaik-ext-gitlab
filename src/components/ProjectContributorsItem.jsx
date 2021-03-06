import React, { Component, PropTypes } from 'react';


class ProjectContributorsItem extends Component {
    render() {
        const { name, commits } = this.props.contributor;

        return (
            <div className="list__item">
                {name}&nbsp;
                <span className="gitlab__project-contributors__item__count">
                    {commits}&nbsp;<i className="fa fa-dot-circle-o"/>
                </span>
            </div>
        );
    }
}

ProjectContributorsItem.displayName = 'ProjectContributorsItem';

ProjectContributorsItem.propTypes = {
    contributor: PropTypes.shape({
        name:    PropTypes.string.isRequired,
        commits: PropTypes.number.isRequired
    }).isRequired
};


export default ProjectContributorsItem;
