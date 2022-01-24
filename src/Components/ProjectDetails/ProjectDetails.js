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
  switchPublishState = false;

  onSubmit = (mutation) => (project) => {
    if (!project) {
      this.redirect(this.props.data.project.id);
      return;
    }
    const data = {
      url: project.url,
      name: project.name,
      status: project.status,
      description: project.description,
      cover: project.cover.id,
      type: project.type.id,
      section: project.section.id,
      languages: project.languages,
      date: project.date,
    };

    mutation({
      variables: {
        id: this.props.data.project.id,
        project: data
      }
    })
  };

  onPublish = (mutation) => () => {
    this.switchPublishState = true;
    mutation({
      variables: {
        id: this.props.data.project.id,
        project: {
          status: 'PUBLISHED'
        }
      }
    });
  };

  onUnPublish = (mutation) => () => {
    this.switchPublishState = true;
    mutation({
      variables: {
        id: this.props.data.project.id,
        project: {
          status: 'DRAFT'
        }
      }
    });
  };

  deleteProject = (mutation) => () => {
    mutation({
      variables: {
        ids: [this.props.data.project.id],
      },
    });
  };

  redirect = (id) => {
    if (this.switchPublishState) {
      this.props.history.push('/projects');
    } else {
      this.props.history.push(`/project/id/${id}/template`);
    }
  };

  render() {
    return (
      <Mutation
        mutation={MUTATION_QUERY}
        onCompleted={({ updateProject }) => {
          this.redirect(updateProject.id);
          bus.publish('success', `Project ${updateProject.name} updated`);
        }}
        onError={(err) => console.error(err)}
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
                    onPublish={this.onPublish(updateProject)}
                    onUnpublish={this.onUnPublish(updateProject)}
                    onDelete={this.deleteProject(deleteProjects)}
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

export default withRouter(withProject(ProjectDetails));
