import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { withProject } from '../GraphQL';
import FieldFactory, { components } from '../Field/FieldFactory';
import { ButtonRow } from '../Form';
import bus from '../../Core/bus';

import './ProjectData.css';

const MUTATION_QUERY = gql`
  mutation UpdateProject($id: String!, $project: UpdateProjectInput) {
    updateProject(id: $id, project: $project) {
      id
      name
    }
  }
`;

const swap = (a, x, y) => {
  a[x] = a.splice(y, 1, a[x])[0];
  return a;
};

const ANIMATION_DURATION = 300; // milliseconds

class ProjectData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      configuration: props.data.project.configuration
        .map(({ componentId, propsJson }) => ({ componentId, propsJson: JSON.parse(propsJson) })),
      contentHasChanged: false,
      newComponentSelectedId: null,
      orderingEnabled: true,
      animate: props.data.project.configuration.map(() => null),
    };

    this.elements = props.data.project.configuration.map(() => null);
  }

  onChange = (index) => ({target: {value, id, name}}) => {
    const { configuration } = this.state;
    configuration[index].propsJson[name] = value;
    this.setState({
      configuration,
      contentHasChanged: true
    });
  };

  onSubmit = (update) => () => {
    if (!this.state.contentHasChanged) {
      this.onCompleted({});
      return;
    }
    const newData = {
      configuration: this.state.configuration
        .map(({ componentId, propsJson }) => ({ componentId, propsJson: JSON.stringify(propsJson) })),
    };

    update({
      variables: {
        id: this.props.data.project.id,
        project: newData
      }
    })
  };

  removeComponent = (index) => {
    let { configuration } = this.state;
    configuration.splice(index, 1);
    this.setState({
      configuration,
    });
  };

  moveComponent = (x, y) => {
    let { configuration, animate } = this.state;
    const [...defaultAnim] = animate;
    const differential = (this.elements[y].offsetTop - this.elements[x].offsetTop);
    animate[x] = {
      diferentialTop: this.elements[y].offsetHeight,
      diferentialBottom: 0,
    };
    animate[y] = {
      diferentialTop: -(differential + this.elements[y].offsetHeight),
      diferentialBottom: differential,
    };
    this.setState({
      animate,
    });
    setTimeout(() => {
      this.setState({
        configuration: swap(configuration, x, y),
        animate: defaultAnim,
      });
    }, ANIMATION_DURATION)
  };

  moveComponentUp = (index) => {
    if (index === 0) {
      return;
    }
    this.moveComponent(index-1, index);
  };

  moveComponentDown = (index) => {
    if (index === this.state.configuration.length - 1) {
      return;
    }
    this.moveComponent(index, index+1);
  };

  newComponentChangeHandler = ({target: { value }}) => {
    this.setState({
      newComponentSelectedId: value,
    });
  };

  onError = (err) => {
    bus.publish('error', JSON.stringify(err));
  };

  onCompleted = ({updateProject}) => {
    this.props.history.push(`/projects`);
    this.state.contentHasChanged && bus.publish('success', `Project ${updateProject.name} updated`);
  };

  render() {
    const {
      configuration,
      contentHasChanged,
      newComponentSelectedId,
      animate,
      duration = ANIMATION_DURATION/1000
    } = this.state;
    const submitText = contentHasChanged ? 'Update' : 'Finish';
    return [configuration.map((conf, index) => {
      const style = animate[index] && {
        transition: `margin-top ${duration}s, margin-bottom ${duration}s`,
        marginTop: `${animate[index].diferentialTop}px`,
        marginBottom: `${animate[index].diferentialBottom}px`,
      };
      console.log(style);
      return (
        <div
          className='sui-template__component'
          style={style}
          ref={el => this.elements[index] = el}
        >
          <div className='sui-template__action-wrapper'>
            <div className='sui-template__action'>
              <div className='sui-template__reorder-wrapper'>
                <button onClick={() => this.moveComponentUp(index)} disabled={index===0}>
                  Up
                </button>
                <button onClick={() => this.moveComponentDown(index)} disabled={index===configuration.length-1}>
                  Down
                </button>
              </div>
              <button onClick={() => this.removeComponent(index)}>
                Delete
              </button>
            </div>
          </div>
          <div className='sui-template__component__component'>
            {
              FieldFactory.renderField(
                conf.componentId,
                conf.propsJson,
                this.onChange(index)
              )
            }
          </div>
        </div>
      )
    }),
      <div className='sui-template__select--wrapper'>
        <select
          className='sui-template__component-selector'
          onChange={this.newComponentChangeHandler}
        >
          <option selected={!newComponentSelectedId}>Select component</option>
          {components.map(c => <option value={c.id} selected={c.id === newComponentSelectedId}>{c.id}</option>)}
        </select>
        <button
          className='sui-template__add-button'
          onClick={() => {
            this.setState({
              configuration: [
                ...configuration,
                { componentId: newComponentSelectedId, propsJson: {} }
              ],
              newComponentSelectedId: null,
            })
          }}
        >
          +
        </button>
      </div>
      ,
      <Mutation
        mutation={MUTATION_QUERY}
        onCompleted={this.onCompleted}
        onError={this.onError}
      >
        {
          (update) => <ButtonRow
            onSubmit={this.onSubmit(update)}
            submitText={submitText}
          />
        }
      </Mutation>
    ]
  }
}

export default withRouter(withProject(ProjectData));