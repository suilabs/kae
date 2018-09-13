import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { withProject } from '../GraphQL/index';

import ProjectDetailsForm from './ProjectDetailsForm';

import bus from '../../Core/bus';

import './ProjectDetails.css';

const MUTATION_QUERY = gql`
  mutation UpdateProject($id: String!, $project: UpdateProjectInput) {
      updateProject(id: $id, project: $project) {
          id
          name
      }
  }
`;

const DELETE_MUTATION = gql`
  mutation DeleteProject($ids: [String]!) {
      deleteProjects(ids: $ids) {
          id
          name
      }
  }
`;

class ProjectDetails extends React.Component {
  onSubmit = (mutation) => (project) => {
    const data = {
      name: project.name,
      description: project.description,
      cover: project.cover.id,
      type: project.type.id,
      section: project.section.id
    };

    mutation({
      variables: {
        id: this.props.data.project.id,
        project: data
      }
    })
  };

  deleteProject = (mutation) => (id) => {
    mutation({
      variables: {
        ids: [id],
      },
    });
  };

  render() {
    return (
      <Mutation
        mutation={MUTATION_QUERY}
        onCompleted={({ updateProject }) => {
          this.props.history.push('/projects');
          bus.publish('success', `Project ${updateProject.name} updated`);
        }}
        onError={(err) => console.log(err)}
      >
        { (updateProject) => {
            return (
              <Mutation
                mutation={DELETE_MUTATION}
                onCompleted={({deleteProjects}) => {
                  this.props.history.push('/projects');
                  bus.publish('success', `Project ${deleteProjects.name} deleted`);
                }}
              >
                {(deleteProjects) =>
                  <ProjectDetailsForm
                    {...this.props}
                    onSubmit={this.onSubmit(updateProject)}
                    onDelete={() => this.deleteProject(deleteProjects)(this.props.data.project.id)}
                  />
                }
              </Mutation>
            )
          }
        }
      </Mutation>
    )
  }
}

export default withProject(withRouter(ProjectDetails));
