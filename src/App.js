import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import ProjectsList from './Components/ProjectsList';
import ProjectDetails from './Components/ProjectDetails/ProjectDetails';
import NewProject from './Components/ProjectDetails/NewProject';
import ImageList from './Components/ImageList';
import MessageBox from './Components/MessageBox';
import SectionList from './Components/SectionList';
import ProjectTypesList from './Components/ProjectTypesList';

import './App.css';

const client = new ApolloClient({
  uri: '//localhost:4000/graphql',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
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

const menu = () => [
  <nav key="nav">
    <Link className="nav-link" to="/projects">Projects</Link>
    <Link className="nav-link" to="/images">Images</Link>
    <Link className="nav-link" to="/sections">Sections</Link>
    <Link className="nav-link" to="/types">Types</Link>
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
            <Route path="/project/id/:id" component={ProjectDetails} exact/>
            <Route path="/images" component={ImageList} exact />
            <Route path="/sections" component={SectionList} exact />
            <Route path="/types" component={ProjectTypesList} exact />
          </ApolloProvider>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
