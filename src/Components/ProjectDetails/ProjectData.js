import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { withProject } from '../GraphQL';
import FieldFactory from '../Field/FieldFactory';
import { flatten } from '../../Core/Utils';
import { ButtonRow } from '../Form';
import bus from '../../Core/bus';

const MUTATION_QUERY = gql`
  mutation UpdateProject($id: String!, $project: UpdateProjectInput) {
    updateProject(id: $id, project: $project) {
      id
      name
    }
  }
`;

class ProjectData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      configuration: props.data.project.configuration,
      contentHasChanged: false,
    };
  }

  onChange = ({target: {value, name}}) => {
    this.setState({
      configuration: this.state.configuration.map(conf => {
        if (name === conf.component.id) {
          return {...conf, value}
        }
        return conf;
      }),
      contentHasChanged: true
    });
  };

  onSubmit = (update) => () => {
    if (!this.state.contentHasChanged) {
      this.onCompleted({});
      return;
    }
    const newData = {
      configuration: this.state.configuration.map(config => {
        return {
          component: config.component.id,
          value: config.value
        }
      })
    };

    update({
      variables: {
        id: this.props.data.project.id,
        project: newData
      }
    })
  };

  onError = (err) => {
    bus.publish('error', JSON.stringify(err));
  };

  onCompleted = ({updateProject}) => {
    this.props.history.push(`/projects`);
    this.state.contentHasChanged && bus.publish('success', `Project ${updateProject.name} updated`);
  };

  render() {
    const { data: { project } } = this.props;
    const { configuration, contentHasChanged } = this.state;
    const submitText = contentHasChanged ? 'Update' : 'Finish';
    const template = flatten(project.template.rows);
    debugger;
    return [configuration.map(conf => {
      return FieldFactory.renderField(
        template.find(c => c.id === conf.component.id),
        conf.value,
        this.onChange
      );
    }),
      <Mutation
        mutation={MUTATION_QUERY}
        onCompleted={this.onCompleted}
        onError={this.onError}
      >
        {
          (update) => <ButtonRow
            onSubmit={this.onSubmit(update)}
            submitText={submitText}
          />
        }
      </Mutation>
    ]
  }
}

export default withRouter(withProject(ProjectData));