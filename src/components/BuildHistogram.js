import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BuildsIcon from 'react-icons/lib/fa/bar-chart'
import moment from 'moment'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from '@mozaik/ui'
import { ResponsiveChart as Chart, Scale, Axis, Grid, Bars } from 'nivo'

const margin = { top: 20, right: 20, bottom: 40, left: 60 }

export default class BuildHistogram extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            project: PropTypes.object,
            builds: PropTypes.array.isRequired,
        }),
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ project }) {
        return {
            id: `gitlab.projectBuilds.${project}`,
            params: { project },
        }
    }

    render() {
        const { title, apiData, apiError } = this.props
        const { theme } = this.context

        let body = <WidgetLoader />
        let subject = null
        if (apiData) {
            const { project, builds } = apiData
            subject = (
                <a href={project.web_url} target="_blank">
                    {project.name}
                </a>
            )

            const data = builds.map(
                ({ id, status, started_at, finished_at }) => {
                    let duration = 0
                    if (started_at && finished_at) {
                        duration = moment(finished_at).diff(started_at) / 1000
                    }

                    return { id, duration, status }
                }
            )

            body = (
                <Chart data={data} margin={margin} theme={theme.charts}>
                    <Scale
                        id="duration"
                        type="linear"
                        dataKey="duration"
                        axis="y"
                    />
                    <Scale
                        id="id"
                        type="band"
                        dataKey="id"
                        axis="x"
                        padding={0.3}
                    />
                    <Grid yScale="duration" />
                    <Axis position="left" scaleId="duration" axis="y" />
                    <Axis position="bottom" scaleId="id" axis="x" />
                    <Bars
                        xScale="id"
                        x="id"
                        yScale="duration"
                        y="duration"
                        color="#fff"
                    />
                </Chart>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Builds'}
                    subject={title ? null : subject}
                    icon={BuildsIcon}
                />
                <WidgetBody style={{ overflowY: 'hidden' }}>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
