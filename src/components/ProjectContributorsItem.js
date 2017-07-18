import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DotIcon from 'react-icons/lib/fa/dot-circle-o'
import { WidgetListItem } from '@mozaik/ui'

class ProjectContributorsItem extends Component {
    render() {
        const { contributor: { name, commits } } = this.props

        return (
            <WidgetListItem
                title={name}
                post={
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {commits}&nbsp;<DotIcon />
                    </span>
                }
            />
        )
    }
}

ProjectContributorsItem.propTypes = {
    contributor: PropTypes.shape({
        name: PropTypes.string.isRequired,
        commits: PropTypes.number.isRequired,
    }).isRequired,
}

export default ProjectContributorsItem
