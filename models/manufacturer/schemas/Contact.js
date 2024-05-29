import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  website: { type: String, minLength: 4, maxLength: 63 },
  location: { type: String, minLength: 4, maxLength: 100 },
  email: { type: String, minLength: 6, maxLength: 100 },
  phone: { type: String, minLength: 12, maxLength: 12 },
});

export default ContactSchema;
