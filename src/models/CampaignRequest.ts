import mongoose from 'mongoose';

const WorkflowStepSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'rejected'],
    default: 'pending',
  },
  assignedTo: String,
  completedAt: Date,
  files: [String],
  feedback: String,
});

const CampaignRequestSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true,
  },
  clientInfo: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: String,
  },
  status: {
    type: String,
    enum: ['pending', 'in_review', 'in_progress', 'completed', 'rejected'],
    default: 'pending',
  },
  workflow: [WorkflowStepSchema],
  notes: String,
}, {
  timestamps: true,
});

export default mongoose.models.CampaignRequest || mongoose.model('CampaignRequest', CampaignRequestSchema);
