// Require Mongoose and Moment
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// ReactionsSchema
const ReactionsSchema = new Schema(
    {
    // Set custom ID 
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'You must add text for your reaction',
        trim: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: 'Must have username.',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //yasss use moment, so easy...
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
    },
    {
    toJSON: {
        //this is where the magic happens with the goosemon.
        getters: true
    } 
    }
);

// ThoughtsSchema
const ThoughtsSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: 'You must add your thought, cannot be blank.',
        trim: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use Moment.js to format time.
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: 'You must add your username',
        trim: true
    },
    // Use ReactionsSchema to validate data
    reactions: [ReactionsSchema]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
)

// get total count of reactions
ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Array of nested documents created with the reactionSchema
const Thoughts = model('Thoughts', ThoughtsSchema);

// Export Thoughts Module
module.exports = Thoughts;