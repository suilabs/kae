import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import bus from '../Core/bus';

import { withProjectTypes } from './GraphQL';

import './SectionList.css';

const CREATE_TYPE = gql(`
  mutation CreateProjectType($name: String!) {
    insertProjectType(name: $name) {
      id
      name
    }
  }
`);

const DELETE_TYPE = gql(`
  mutation deleteProjectType($id: [String]!) {
    deleteProjectTypes(ids: $id) {
      id
      name
    }
  }
`);

class ProjectTypesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      types: props.data.projectTypes,
      newtype: '',
    }
  }

  onChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value,
    });
  };

  addType = (type) => {
    const { types } = this.state;
    this.setState({
      types: [ ...types, type ],
      newtype: '',
    })
  };

  removeType = (id) => {
    const { types } = this.state;
    this.setState({
      types: types.filter((sec) => sec.id !== id)
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

  submitType = (mutation) => (e) => {
    e.preventDefault();

    mutation({
      variables: {
        name: this.state.newtype
      }
    })
  };

  render() {
    const { types, newtype } = this.state;

    return (
      <div>
        <h1>Project Types</h1>
        <div className="table">
          { types.map((type) => {
              return (
                <div key={type.id} className="row">
                  <div className="cell">
                    {type.name}
                  </div>
                  <div className="cell">
                    <Mutation
                      mutation={DELETE_TYPE}
                      onCompleted={({ deleteProjectTypes }) => {
                        this.removeType(deleteProjectTypes[0].id);
                        bus.publish('success', `Type ${deleteProjectTypes[0].name} deleted.`);
                      }}
                      onError={(err) => {
                        bus.publish('error', err);
                      }}
                    >
                      {
                        (deleteType) => ( <button onClick={this.submitDeletion(deleteType, type.id)}>-</button> )
                      }
                    </Mutation>
                  </div>
                </div>
              )
            })
          }
          <div className="row">
            <div className="cell">
              <input name="newtype" value={newtype} onChange={this.onChange} placeholder="New Type here"/>
            </div>
            <div className="cell">
              <Mutation
                mutation={CREATE_TYPE}
                onCompleted={({ insertProjectType }) => {
                  this.addType(insertProjectType);
                  bus.publish('success', `New Type ${insertProjectType.name} created.`);
                }}
                onError={(err) => {
                  bus.publish('error', err);
                }}
              >
                { (insertType)  => (
                  <button onClick={this.submitType(insertType)}>+</button>
                ) }
              </Mutation>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withProjectTypes(ProjectTypesList);
