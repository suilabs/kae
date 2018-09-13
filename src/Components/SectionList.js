import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import bus from '../Core/bus';

import { withSections } from './GraphQL';

import './SectionList.css';

const CREATE_SECTION = gql(`
  mutation CreateSection($name: String!) {
    insertSection(name: $name) {
      id
      name
    }
  }
`);

const DELETE_SECTION = gql(`
  mutation deleteSections($id: [String]!) {
    deleteSections(ids: $id) {
      id
      name
    }
  }
`);

class SectionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: props.data.sections,
      newSection: '',
    }
  }

  onChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value,
    });
  };

  addSection = (section) => {
    const { sections } = this.state;
    this.setState({
      sections: [ ...sections, section ],
      newSection: '',
    })
  };

  removeSection = (id) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.filter((sec) => sec.id !== id)
    })
  };

  submitDeletion = (mutation, id) => (e) => {
    e.preventDefault();

    mutation({
      variables: {
        id
      }
    })
  };

  submitSection = (mutation) => (e) => {
    e.preventDefault();

    mutation({
      variables: {
        name: this.state.newSection
      }
    })
  };

  render() {
    const { sections, newSection } = this.state;

    return (
      <div>
        <h1>Section List</h1>
        <div className="table">
          { sections.map((section) => {
              return (
                <div key={section.id} className="row">
                  <div className="cell">
                    {section.name}
                  </div>
                  <div className="cell">
                    <Mutation
                      mutation={DELETE_SECTION}
                      onCompleted={({ deleteSections }) => {
                        this.removeSection(deleteSections[0].id);
                        bus.publish('success', `Section ${deleteSections[0].name} deleted.`);
                      }}
                      onError={(err) => {
                        bus.publish('error', err);
                      }}
                    >
                      {
                        (deleteSection) => ( <button onClick={this.submitDeletion(deleteSection, section.id)}>-</button> )
                      }
                    </Mutation>
                  </div>
                </div>
              )
            })
          }
          <div className="row">
            <div className="cell">
              <input name="newSection" value={newSection} onChange={this.onChange} placeholder="New Section here"/>
            </div>
            <div className="cell">
              <Mutation
                mutation={CREATE_SECTION}
                onCompleted={({ insertSection }) => {
                  this.addSection(insertSection);
                  bus.publish('success', `New section ${insertSection.name} created.`);
                }}
                onError={(err) => {
                  bus.publish('error', err);
                }}
              >
                { (insertSection)  => (
                  <button onClick={this.submitSection(insertSection)}>+</button>
                ) }
              </Mutation>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withSections(SectionList);
