var mongoose = require('mongoose')
var util = require('util');
var Schema = mongoose.Schema

function AbstractPostSchema() {
    Schema.apply(this, arguments);

    this.add({
        post_privacy: {type: String, required:true},
        post_date: {type: String, required: true},
        post_type: {type: String, required: true},
        posted_in: {type: String},
        posted_by: {type: String, required: true},
        post_comments: [
            {
                comment_date: {type: String, required:true},
                comment_body: {type: String, required:true},
                comment_by: {type: String, required:true}
            }
        ]
    })
}

util.inherits(AbstractPostSchema,Schema);
var PostSchema = new AbstractPostSchema();

var PhotoSchema = new AbstractPostSchema(
    {
        img: {type: Buffer, contentType: String},
        photo_description: {type:String}
    }
)

var VideoSchema = new AbstractPostSchema(
    {
        video: {type: Buffer, contentType: String},
        video_description: {type:String}
    }
)

var ThoughtSchema = new AbstractPostSchema(
    {
        thought_text: {type: String, required: true}
    }
)

var SportSchema = new AbstractPostSchema(
    {
        sport_type: {type: String, required: true},
        distance: {type: String},
        calories_burnt: {type: String},
        duration: {type: String, required: true},
        sport_description: {type: String, required: true}
    }
) 

var CookingSchema = new AbstractPostSchema(
    {
        cook_name: {type: String, required: true},
        ingredients: {type: [String], required: true},
        preparation: {type: String, required: true},
        cook_calories: {type: String, required: true},
        cook_photos: [PhotoSchema],
        cook_video: VideoSchema
    }
)

var EventSchema = new AbstractPostSchema(
    {
        event_name: {type: String, required: true},
        event_type: {type: String, required: true},
        event_description: {type: String, required: true},
        event_date: {type: String, required: true},
        event_duration: {type: String, required: true},
        event_photos: [PhotoSchema],
        event_video: VideoSchema
    }
)

var UserSchema = new Schema(
    {
        email: {type: String, required: true},
        name: {type: String, required: true},
        password: {type: String, required: true},
        gender: {type:String, required: true},
        birth_date: {type:String},
        img: {type: String},
        user_posts: [Schema.Types.ObjectId]
    }
)

var User = mongoose.model('User',UserSchema) 
var Post = mongoose.model('Post',PostSchema)
var Photo = Post.discriminator('Photo', PhotoSchema);
var Video = Post.discriminator('Video', VideoSchema); 
var Thought = Post.discriminator('Thought', ThoughtSchema); 
var Sport = Post.discriminator('Sport', SportSchema); 
var Cooking = Post.discriminator('Cooking', CookingSchema); 
var Events = Post.discriminator('Event', EventSchema); 

module.exports = {
    User:User,
    Post:Post,
    Photo:Photo,
    Video:Video,
    Thought:Thought,
    Sport:Sport,
    Cooking:Cooking,
    Events:Events
}