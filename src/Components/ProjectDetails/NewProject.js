import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import ProjectDetailsForm from './ProjectDetailsForm';

import bus from '../../Core/bus';

import './ProjectDetails.css';

const MUTATION_QUERY = gql`
  mutation CreateProject($project: ProjectInput) {
      insertProject(project: $project) {
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
        project: data
      }
    })
  };

  render() {
    return (
      <Mutation
        mutation={MUTATION_QUERY}
        onCompleted={({ insertProject }) => {
          this.props.history.push('/projects');
          bus.publish('success', `Project ${insertProject.name} created`);
        }}
        onError={(err) => console.log(err)}
      >
        { (insertProject) =>
          <ProjectDetailsForm
            onSubmit={this.onSubmit(insertProject)}
          />
        }
      </Mutation>
    )
  }
}

export default withRouter(ProjectDetails);
