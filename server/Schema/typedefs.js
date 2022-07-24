const {gql}= require ("apollo-server-express")


const typedefs= gql `
    type Book {
        authors:[String]
        description:String 
        bookId: String 
        images: String 
        link : String
        title: String
    }
    type User{
        _id: ID
        username: String 
        email: String 
        password: String 
        bookCount : Int
        savedBooks: [Book]
    }
    type Auth{
        token: ID
        user: User 
    }
    input saveBooks {
            authors:[String]
            description:String 
            bookId: String 
            images: String 
            link : String
            title: String
    }
    type Query {
        me:User
    }
    type Mutation {
        login (email:String, password: String):Auth
        addUser (username: String, email: String, password: String):Auth
        saveBook (book:saveBooks):User 
        removeBook (bookId: ID):User
    }
`
module.exports=typedefs
