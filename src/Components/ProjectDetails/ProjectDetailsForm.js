import React from 'react';
import PropTypes from 'prop-types';

import {withProjectTypes, withSections} from '../GraphQL';
import {FieldsSection, SelectInput, InputField, ButtonRow, ImageSelectorBox} from '../Form/index';

const ProjectTypesSelector = withProjectTypes(({ data: { projectTypes }, value, onChange }) => (
  <SelectInput options={projectTypes} name="Type" onChange={onChange} value={value} />
));

const SectionsSelector = withSections(({ data: { sections }, value, onChange }) => (
  <SelectInput options={sections} name="Section" onChange={onChange} value={value} />
));

class ProjectDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    const { data: { project = {} } = {} } = props;

    this.state = {
      url: project.url,
      name: project.name,
      description: project.description,
      cover: project.cover,
      type: project.type,
      section: project.section,
      showOverlay: false,
      contentHasChanged: false,
    }
  }

  onChange = (event) => {
    const { target } = event;
    const targetName = target.name.toLowerCase();
    switch (targetName) {
      case 'section':
      case 'type':
        const targetObject = this.state[targetName];
        let newValue = target.value;
        if (typeof target.value === 'string') {
          newValue = { id: target.value };
        }
        this.setState({
          [targetName]: {
            ...targetObject,
            ...newValue
          },
          contentHasChanged: true,
        });
        break;
      default:
        this.setState({
          [target.name.toLowerCase()]: target.value,
          contentHasChanged: true,
        });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { contentHasChanged, ...project } = this.state;
    const changes = contentHasChanged ? project : null;
    this.props.onSubmit(changes);
  };

  onDelete = (e) => {
    e.preventDefault();

    if (window.confirm('Delete project?')) {
      this.props.onDelete();
    }
  };

  render() {
    const {
      url,
      name,
      description,
      cover,
      type,
      section,
      showOverlay,
      contentHasChanged,
    } = this.state;
    let coverUrl, typeId, sectionId;
    if (cover) {
      coverUrl = cover.url;
    } else {
      coverUrl = '/favicon.ico';
    }
    if (type) {
      typeId = type.id
    }
    if (section) {
      sectionId = section.id;
    }
    const submitText = contentHasChanged ? 'Update' : 'Next';
    return (
      <div>
        <div className="projectDetails">
          <FieldsSection name="Basic description">
            <InputField name="Name" value={name} onChange={this.onChange} />
            <InputField name="Description" value={description} onChange={this.onChange}/>
            <InputField name="Url" value={url} onChange={this.onChange}/>
          </FieldsSection>
          <FieldsSection name="Cover">
            <ImageSelectorBox id="cover" src={coverUrl} onChange={this.onChange} />
          </FieldsSection>
          <FieldsSection name="Classification">
            <ProjectTypesSelector onChange={this.onChange} value={typeId} />
            <SectionsSelector onChange={this.onChange} value={sectionId} />
          </FieldsSection>
        </div>
        <ButtonRow
          submitText={submitText}
          onSubmit={this.onSubmit}
          onDelete={this.onDelete}
          deleteText="Delete"
        />
      </div>
    );
  };
}

ProjectDetailsForm.propTypes = {
  data: PropTypes.object,
};

ProjectDetailsForm.defaultProps = {
  data: {
    project: {}
  }
};

export default ProjectDetailsForm;
