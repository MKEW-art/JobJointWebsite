import mongoose, { Schema, Types } from 'mongoose';

export const categories = ['Electrician','Plumber','Carpenter','Painter','Cleaner','Mason','Solar tech','Generator technician'] as const;
export const requestStatuses = ['PENDING','ACCEPTED','REJECTED'] as const;
const social = { telegram: { type: String, default: '' }, whatsapp: { type: String, default: '' }, facebook: { type: String, default: '' } };
const workSchema = new Schema({ title: { type: String, required: true, trim: true }, description: { type: String, required: true, trim: true }, imageUrl: { type: String, required: true }, completedDate: { type: Date, required: true } }, { _id: true });
const certificateSchema = new Schema({ name: { type: String, required: true, trim: true }, issuingOrganization: { type: String, required: true, trim: true }, year: { type: Number, required: true, min: 1950, max: 2100 }, fileUrl: { type: String, default: '' } }, { _id: true });
const awardSchema = new Schema({ title: { type: String, required: true, trim: true }, issuer: { type: String, required: true, trim: true }, year: { type: Number, required: true, min: 1950, max: 2100 } }, { _id: true });

const userSchema = new Schema({
  fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 }, phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true }, passwordHash: { type: String, select: false },
  googleId: { type: String, sparse: true, unique: true, select: false }, userType: { type: String, required: true, enum: ['CUSTOMER','HANDYMAN'], index: true },
  location: { type: String, default: 'Bole, Addis Ababa' }, socialLinks: { type: social, default: () => ({}) }, profilePhotoUrl: { type: String, default: '' },
}, { timestamps: { createdAt: true, updatedAt: false } });
const handymanSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  serviceType: { type: String, required: true, enum: categories, index: true }, description: { type: String, required: true, maxlength: 1200 },
  experienceYears: { type: Number, required: true, min: 0, max: 80 }, contactLinks: { type: social, default: () => ({}) },
  location: { type: String, required: true, index: true }, portfolio: { type: [workSchema], default: [] }, certificates: { type: [certificateSchema], default: [] }, awards: { type: [awardSchema], default: [] },
}, { timestamps: true });
handymanSchema.index({ serviceType: 1, location: 1 });
const requestSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true }, handymanId: { type: Schema.Types.ObjectId, ref: 'Handyman', required: true, index: true },
  issueDescription: { type: String, required: true, minlength: 12, maxlength: 600 }, preferredTime: { type: Date, required: true }, status: { type: String, enum: requestStatuses, default: 'PENDING', index: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Handyman = mongoose.models.Handyman || mongoose.model('Handyman', handymanSchema);
export const ServiceRequest = mongoose.models.ServiceRequest || mongoose.model('ServiceRequest', requestSchema);
export type UserDocument = mongoose.HydratedDocument<{ fullName: string; email: string; phone: string; userType: 'CUSTOMER'|'HANDYMAN'; location: string; passwordHash?: string; profilePhotoUrl?: string }>;
export type RequestStatus = typeof requestStatuses[number];
export type RequestId = Types.ObjectId;
