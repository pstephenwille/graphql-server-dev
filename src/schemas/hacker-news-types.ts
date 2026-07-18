export const typeDefs = `#graphql
type Query{
    top500Stories:[Story]
    story(id: ID!):Story
}

type User {
  id: ID!
  about: String
  created: Int!
  karma: Int!
  submitted: [Int!]!
}

enum ItemType {
    COMMENT
    STORY
    POLL
    POLLOPT
    JOB
}

interface HNItem {
    id: ID!
    deleted: Boolean
    type: ItemType!
    by: String
    time: Int
    text: String
    dead: Boolean
    kids: [ID!]
}

type Comment implements HNItem {
    id: ID!
    deleted: Boolean
    type: ItemType!
    by: String
    time: Int
    text: String
    dead: Boolean
    kids: [ID!]
    parent: ID! 
}

type Story implements HNItem {
    id: ID!
    deleted: Boolean
    type: ItemType!
    by: String
    time: Int
    text: String
    dead: Boolean
    kids: [ID!]
    url: String
    score: Int
    title: String
    descendants: Int 
    comments(limit: Int = 100): [Comment]
}

type Ask implements HNItem {
    id: ID!
    deleted: Boolean
    type: ItemType!
    by: String
    time: Int
    text: String
    dead: Boolean
    kids: [ID!]
    score: Int
    title: String
    descendants: Int
}

type Poll implements HNItem {
    id: ID!
    deleted: Boolean
    type: ItemType!
    by: String
    time: Int
    text: String
    dead: Boolean
    kids: [ID!]
    score: Int
    title: String
    parts: [ID!]
    descendants: Int
}

type PollOpt implements HNItem {
    id: ID!
    deleted: Boolean
    type: ItemType!
    by: String
    time: Int
    text: String
    dead: Boolean
    kids: [ID!]
    poll: ID! 
    score: Int }

`

