import React from 'react';
import PropTypes from 'prop-types';
import { simulateEvent } from '../../Core/Utils';

import {withProjectTypes, withSections} from '../GraphQL';
import {FieldsSection, SelectInput, InputField, ButtonRow, ButtonRowTypes, ImageSelectorBox} from '../Form/index';

const ProjectTypesSelector = withProjectTypes(({ data: { projectTypes }, value, onChange }) => (
  <SelectInput options={projectTypes} name="Type" onChange={onChange} value={value} />
));

const SectionsSelector = withSections(({ data: { sections }, value, onChange }) => (
  <SelectInput options={sections} name="Section" onChange={onChange} value={value} />
));

const supportedLanguages = ['ca', 'es', 'en'];

const LanguageSelector = ({ onChange, value = [] }) => {
  const switchLanguage = (langArray, lang) => {
    const [ ...retArray ] = langArray;
    const index = retArray.indexOf(lang);
    if (index !== -1) {
      retArray.splice(index, index + 1);
    } else {
      retArray.push(lang);
    }
    return retArray;
  };

  return (
    <FieldsSection name="Languages">
      {
        supportedLanguages.map((lang) => (
          <div>
            {lang}
            <input
              type="checkbox"
              value={lang}
              onChange={() =>
                onChange(simulateEvent('languages', switchLanguage(value, lang)))
              }
              checked={value.indexOf(lang) !== -1}
            />
          </div>
        ))
      }
    </FieldsSection>
  )
};

const ProjectStatus = {
  PUBLISHED: 'PUBLISHED',
  DRAFT: 'DRAFT',
};

class ProjectDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    const { data: { project = {} } = {} } = props;

    this.state = {
      url: project.url,
      name: project.name,
      status: project.status,
      description: project.description,
      cover: project.cover,
      type: project.type,
      section: project.section,
      languages: project.languages,
      contentHasChanged: false,
      newProject: !Object.keys(project).length,
      whatsChanged: [],
    }
  }

  onChange = (event) => {
    const { target } = event;
    const targetName = target.name.toLowerCase();
    const { whatsChanged, newProject } = this.state;
    let newState;
    switch (targetName) {
      case 'section':
      case 'type':
        const targetObject = this.state[targetName];
        let newValue = target.value;
        if (typeof target.value === 'string') {
          newValue = { id: target.value };
        }
        newState = {
          [targetName]: {
            ...targetObject,
            ...newValue
          },
        };
        break;
      default:
        newState = {
          [target.name.toLowerCase()]: target.value,
        };
    }
    if (!newProject) {
      if ((targetName === 'cover' && this.props.data.project.cover.url === newState.cover.url) ||
        JSON.stringify(this.props.data.project[targetName]) === JSON.stringify(newState[targetName])) {
        whatsChanged.splice(whatsChanged.indexOf(targetName), 1);
      } else if (whatsChanged.indexOf(targetName) === -1){
        whatsChanged.push(targetName);
      }
    } else {
      if (newState[targetName] && whatsChanged.indexOf(targetName) === -1) {
        whatsChanged.push(targetName);
      } else {
        whatsChanged.splice(whatsChanged.indexOf(targetName), 1);
      }
    }
    this.setState({
      ...newState,
      whatsChanged,
      contentHasChanged: whatsChanged.length !== 0,
    });
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

  onSwitchPublishState = (e) => {
    e.preventDefault();
    if (this.state.status === ProjectStatus.PUBLISHED) {
      this.props.onUnpublish();
    } else {
      this.props.onPublish();
    }
  };

  render() {
    const {
      url,
      name,
      status,
      description,
      cover,
      type,
      section,
      contentHasChanged,
      newProject,
      languages
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
    let buttonType = contentHasChanged ? ButtonRowTypes.UPDATE : ButtonRowTypes.NORMAL;
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
            <LanguageSelector onChange={this.onChange} value={languages} />
          </FieldsSection>
        </div>
        <ButtonRow
          submitText={newProject ? 'Create' : submitText}
          onSubmit={this.onSubmit}
          onDelete={this.onDelete}
          deleteText="Delete"
          type={newProject && contentHasChanged ? ButtonRowTypes.CREATE : buttonType}
        />
        {!newProject &&
          <ButtonRow
            submitText={status === ProjectStatus.PUBLISHED ? 'Unpublish' : 'Publish'}
            onSubmit={this.onSwitchPublishState}
            type={ButtonRowTypes.UPDATE}
          />
        }
      </div>
    );
  };
}

ProjectDetailsForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPublish: PropTypes.func,
  onUnpublish: PropTypes.func,
};

ProjectDetailsForm.defaultProps = {
  data: {
    project: {}
  },
  onPublish: () => {},
  onUnpublish: () => {},
};

export default ProjectDetailsForm;
