import React from 'react';
import PropTypes from 'prop-types';

import {withProjectTypes, withSections} from '../GraphQL';
import {FieldsSection, SelectInput, InputField, ButtonRow} from '../Form/index';
import ImageSelector from '../Images/ImageSelector';

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
      name: project.name,
      description: project.description,
      cover: project.cover,
      type: project.type,
      section: project.section,
      showOverlay: false,
    }
  }

  onChange = (event) => {
    const { target } = event;
    const targetName = target.name.toLowerCase();
    switch (targetName) {
      case 'section':
        const { section } = this.state;
        this.setState({
          section: {
            ...section,
            id: target.value,
          }
        });
        break;
      case 'type':
        const { type } = this.state;
        this.setState({
          type: {
            ...type,
            id: target.value,
          },
        });
        break;
      default:
        this.setState({
          [target.name.toLowerCase()]: target.value
        });
    }
  };

  setImage = (image) => {
    this.onChange({
      target: {
        name: 'cover',
        value: image,
      }
    });
  };

  showOverlay = () => {
    this.setState({
      showOverlay: true,
    });
  };

  closeOverlay = () => {
    this.setState({
      showOverlay: false,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state);
  };

  onDelete = (e) => {
    e.preventDefault();

    if (window.confirm('Delete project?')) {
      this.props.onDelete();
    }
  };

  render() {
    const {
      name,
      description,
      cover,
      type,
      section,
      showOverlay,
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
    return (
      <div>
        <div className="projectDetails">
          <FieldsSection name="Basic description">
            <InputField name="Name" value={name} onChange={this.onChange} />
            <InputField name="Description" value={description} onChange={this.onChange}/>
          </FieldsSection>
          <FieldsSection name="Cover">
            <button className="cover-button" onClick={this.showOverlay}>
              <img src={coverUrl} className="cover-image"/>
            </button>
          </FieldsSection>
          <FieldsSection name="Classification">
            <ProjectTypesSelector onChange={this.onChange} value={typeId} />
            <SectionsSelector onChange={this.onChange} value={sectionId} />
          </FieldsSection>
        </div>
        <ButtonRow
          submitText="Update"
          onSubmit={this.onSubmit}
          onDelete={this.onDelete}
          deleteText="Delete"
        />
        { showOverlay &&
          <div className="image-selector-overlay">
            <ImageSelector onClick={this.setImage} onClose={this.closeOverlay} />
          </div>
        }
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
