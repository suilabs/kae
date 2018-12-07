import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { withProject } from '../GraphQL';
import FieldFactory, { components } from '../Field/FieldFactory';
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
    debugger;
    this.state = {
      configuration: props.data.project.configuration
        .map(({ componentId, propsJson }) => ({ componentId, propsJson: JSON.parse(propsJson) })),
      contentHasChanged: false,
      newComponentSelectedId: null
    };
  }

  onChange = (index) => ({target: {value, id, name}}) => {
    const { configuration } = this.state;
    configuration[index].propsJson[name] = value;
    this.setState({
      configuration,
      contentHasChanged: true
    });
  };

  onSubmit = (update) => () => {
    if (!this.state.contentHasChanged) {
      this.onCompleted({});
      return;
    }
    const newData = {
      configuration: this.state.configuration
        .map(({ componentId, propsJson }) => ({ componentId, propsJson: JSON.stringify(propsJson) })),
    };

    debugger;
    update({
      variables: {
        id: this.props.data.project.id,
        project: newData
      }
    })
  };

  newComponentChangeHandler = ({target: { value }}) => {
    this.setState({
      newComponentSelectedId: value,
    });
  };

  onError = (err) => {
    bus.publish('error', JSON.stringify(err));
  };

  onCompleted = ({updateProject}) => {
    this.props.history.push(`/projects`);
    this.state.contentHasChanged && bus.publish('success', `Project ${updateProject.name} updated`);
  };

  render() {
    const { configuration, contentHasChanged, newComponentSelectedId } = this.state;
    const submitText = contentHasChanged ? 'Update' : 'Finish';
    return [configuration.map((conf, index) => {
      return FieldFactory.renderField(
        conf.componentId,
        conf.propsJson,
        this.onChange(index)
      );
    }),
      <div>
        <select onChange={this.newComponentChangeHandler}>
          <option selected={!newComponentSelectedId}>Select component</option>
          {components.map(c => <option value={c.id} selected={c.id === newComponentSelectedId}>{c.id}</option>)}
        </select>
        <button
          onClick={() => {
            this.setState({
              configuration: [
                ...configuration,
                { componentId: newComponentSelectedId, propsJson: {} }
              ]
            })
          }}
        >
          Add New Component
        </button>
      </div>
      ,
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