import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withProjects } from './GraphQL';
import StatusIcon from './Icons/status';
import Thumbnail from './Thumbnail';

import './ProjectsList.css';

const ProjectListItem = ({project: {id, url: destUrl, name, status, cover: {url}}}) => {
  return (
    <Link
      to={destUrl || `/project/id/${id}`}
      className="card-link"
    >
      <Thumbnail
        name={name}
        url={url}
        status={status}
      />
    </Link>
  );
};

const createProject = {
  id: 'new',
  url: '/project/new',
  name: 'Create New Project',
  cover: {
    url: '/favicon.ico',
  },
};

const ProjectsList = ({data: { projects }}) => {
  return (
    <div>
      <h1>Project List</h1>
      <div className={'.list'}>
        {[...projects, createProject].map(project =>
          <ProjectListItem key={project.id} project={project} />
        )}
      </div>
    </div>
  )
};

ProjectsList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      cover: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      }).isRequired
    })
  )
};

ProjectsList.defaultProps = {
  projects: []
};

export default withProjects(ProjectsList);
