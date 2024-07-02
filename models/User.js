const { Schema, model } = require('mongoose')
import validator from 'validator';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            max_length: 20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail, 'invalid email'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema)

module.exports = User;