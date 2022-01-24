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
    if (!project) {
      return;
    }
    const data = {
      url: project.url,
      name: project.name,
      description: project.description,
      cover: project.cover && project.cover.id,
      type: project.type && project.type.id,
      section: project.section && project.section.id,
      configuration: project.configuration,
      date: project.date || (new Date()).toISOString().split('T')[0]
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
          this.props.history.push(`/project/id/${insertProject.id}/template`, insertProject);
          bus.publish('success', `Project ${insertProject.name} created`);
        }}
        onError={(err) => console.error(err)}
      >
        { (insertProject) =>
          <ProjectDetailsForm
            onSubmit={this.onSubmit(insertProject)}
            newProject
          />
        }
      </Mutation>
    )
  }
}

export default withRouter(ProjectDetails);
