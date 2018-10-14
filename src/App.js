import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import ProjectsList from './Components/ProjectsList';
import NewProject from './Components/ProjectDetails/NewProject';
import ImageList from './Components/Images/ImageList';
import ImageDetails from './Components/Images/ImageDetails';
import NewImage from './Components/Images/NewImage';
import MessageBox from './Components/MessageBox';
import SectionList from './Components/SectionList';
import ProjectTypesList from './Components/ProjectTypesList';
import ProjectById from './Components/ProjectDetails/ProjectById';
import ProjectDetails from './Components/ProjectDetails/ProjectDetails';
import ProjectData from './Components/ProjectDetails/ProjectData';

import bus from './Core/bus';

import './App.css';

const client = new ApolloClient({
  uri: process.ENV.GRAPHQL_ENDPOINT,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    }
  }
});

const ClearLink = withRouter((props) => (
  <a
    {...props}
    onClick={() => {
      props.history.push(props.to);
      bus.publish('clearMessage');
    }}
  />
));

const menu = () => [
  <nav key="nav">
    <ClearLink className="nav-link" to="/projects">Projects</ClearLink>
    <ClearLink className="nav-link" to="/images">Images</ClearLink>
    <ClearLink className="nav-link" to="/sections">Sections</ClearLink>
    <ClearLink className="nav-link" to="/types">Types</ClearLink>
  </nav>,
  <MessageBox key="messageBox" />,
];

class App extends Component {
  render() {
    return (
      <div className="kae-container">
        <BrowserRouter>
          <ApolloProvider client={client}>
            <Route path="/" component={menu}/>
            <Route path="/projects" component={ProjectsList} exact/>
            <Route path="/project/new" component={NewProject} exact/>
            <Route path="/project/id/:id" component={ProjectById(ProjectDetails)} exact/>
            <Route path="/project/id/:id/template" component={ProjectById(ProjectData)} exact/>
            <Route path="/images" component={ImageList} exact />
            <Route path="/image/new" component={NewImage} exact />
            <Route path="/image/id/:id" component={ImageDetails} exact />
            <Route path="/sections" component={SectionList} exact />
            <Route path="/types" component={ProjectTypesList} exact />
          </ApolloProvider>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
