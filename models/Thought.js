const { Schema, model } =  require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    }
);

thoughtSchema.virtual('formattedCreatedAt').get(function() {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return this.createdAt.toLocaleDateString('en-US', options);
  });

  thoughtSchema.virtual('reactioncount').get(function () {
    return this.reactions.legnth;
  });

const Thought = model('thought', thoughtSchema)

module.exports = Thought;