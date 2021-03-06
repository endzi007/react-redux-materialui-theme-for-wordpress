//props should be string that reprezents what we want to 
//retreive from graphql server for example "name url id"

export const getAllCategories = (props)=> `
 categories{
    edges {
      node {
        ${props}
        children {
          edges {
            node {
              ${props}
              children {
                edges {
                  node {
                    ${props}
                    children {
                      edges{
                        node{
                          ${props}
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;