const {gql}= require ("apollo-server-express")


const typediffs= gql `
    type Book {
        authors:[String]
        description:String 
        bookId: String 
        images: String 
        link : String
        title: String
    }
    type User{
        _id: id
        username: String 
        email: String 
        password: String 
        bookCount : Int
        savedBooks: [Book]
    }
    type Auth{
        token: id
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
    Query {
        me:User
    }
    type Mutation {
        login (email:String, password: String):Auth
        addUser (username: String, email:String, password: String):Auth
        saveBook (book:saveBooks):User 
        removeBook (bookId: id):User
    }
`
module.exports=typediffs
