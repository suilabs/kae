export default {
  GRAPHQL_ENDPOINT: process ? process.env.REACT_APP_GRAPHQL_ENDPOINT : '//graphql.suilabs.com/graphql',
  STATICS_URL: process ? process.env.REACT_APP_STATICS_URL : '//static.suilabs.com/upload/s3',
}