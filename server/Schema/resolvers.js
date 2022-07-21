const {User} = require ("../models")
const {signToken} = require ("../utils/auth")

const resolvers = {
    Query:{
        me:async (parent, args, context) => {
            if (context.user){
                const data = await User.findOne ({
                    _id:context.user._id
                })
                return data
            }
            throw new Error("Please Log in ")
        }
        
    },

    Mutation:{
        login:async(parent, {email, password}) => {
            const user = await User.findOne ({
                email
            })
            const correctpw = await User.isCorrectPassword(password)
            const token = signToken (user)
            return {token,user}
        }, 
        addUser: async(parent, args) => {
            const user = await User.create (args)
            const token = signToken (user)
            return {token,user}  
        }, 
        saveBook: async(parent, {book} , context) => {
            if (context.user) {
                const updateuser = User.findOneAndUpdate(
                    {_id: context.user._id}, 
                    {$push: {savedBooks:book}},
                    {new:true}
                )
                return updateuser
            }
        }, 
        removeBook:async (parent,{bookId}, context) => {
            if (context.user) {
                const updateuser = User.findOneAndUpdate(
                    {_id: context.user._id}, 
                    {$pull: {savedBooks:book}},
                    {new:true}   
                )
                return updateuser
            }

        }

    }
} 
module.exports = resolvers
