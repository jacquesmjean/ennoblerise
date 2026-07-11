export type FieldType = 'text' | 'email' | 'number' | 'date' | 'textarea' | 'select';

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
};

export type Collection = {
  table: string;
  title: string;
  singular: string;
  description: string;
  statusKey: string;
  statuses: string[];
  listColumns: { key: string; label: string }[];
  fields: Field[];
};

export const collections: Record<string, Collection> = {
  inquiries: {
    table: 'inquiries',
    title: 'Inquiries',
    singular: 'inquiry',
    description: 'Messages from the contact form and the site concierge.',
    statusKey: 'status',
    statuses: ['new', 'in_progress', 'resolved'],
    listColumns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'topic', label: 'Topic' },
      { key: 'source', label: 'Source' },
      { key: 'message', label: 'Message' },
    ],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'topic', label: 'Topic', type: 'text' },
      { key: 'message', label: 'Message', type: 'textarea' },
    ],
  },
  applications: {
    table: 'applications',
    title: 'Applications',
    singular: 'application',
    description: 'Volunteer, ambassador, partner, and country-chapter applications.',
    statusKey: 'status',
    statuses: ['new', 'reviewing', 'approved', 'declined'],
    listColumns: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'country', label: 'Country' },
      { key: 'email', label: 'Email' },
      { key: 'message', label: 'Message' },
    ],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'role', label: 'Role', type: 'select', options: ['volunteer', 'ambassador', 'partner', 'country'] },
      { key: 'country', label: 'Country', type: 'text' },
      { key: 'organization', label: 'Organization', type: 'text' },
      { key: 'message', label: 'Message', type: 'textarea' },
      { key: 'notes', label: 'Internal notes', type: 'textarea' },
    ],
  },
  donations: {
    table: 'donations',
    title: 'Donations',
    singular: 'donation',
    description: 'Pledges and gifts across all pillars. Update status as payments are received.',
    statusKey: 'status',
    statuses: ['pledged', 'received', 'recurring', 'cancelled', 'refunded'],
    listColumns: [
      { key: 'donor_name', label: 'Donor' },
      { key: 'amount', label: 'Amount' },
      { key: 'frequency', label: 'Frequency' },
      { key: 'designation', label: 'Designation' },
      { key: 'donor_email', label: 'Email' },
    ],
    fields: [
      { key: 'donor_name', label: 'Donor name', type: 'text', required: true },
      { key: 'donor_email', label: 'Donor email', type: 'email' },
      { key: 'amount', label: 'Amount (USD)', type: 'number', required: true },
      { key: 'frequency', label: 'Frequency', type: 'select', options: ['once', 'monthly'] },
      { key: 'designation', label: 'Designation', type: 'select', options: ['greatest', 'youth', 'educators', 'women'] },
      { key: 'dedication', label: 'Dedication', type: 'text' },
      { key: 'note', label: 'Note', type: 'textarea' },
    ],
  },
  partners: {
    table: 'partners',
    title: 'Partners',
    singular: 'partner',
    description: 'Institutional partners — schools, businesses, NGOs, and governments.',
    statusKey: 'stage',
    statuses: ['prospect', 'conversation', 'mou', 'active', 'dormant'],
    listColumns: [
      { key: 'name', label: 'Partner' },
      { key: 'type', label: 'Type' },
      { key: 'country', label: 'Country' },
      { key: 'contact_name', label: 'Contact' },
      { key: 'contact_email', label: 'Email' },
    ],
    fields: [
      { key: 'name', label: 'Partner name', type: 'text', required: true },
      { key: 'type', label: 'Type', type: 'select', options: ['institution', 'business', 'ngo', 'government', 'community'] },
      { key: 'country', label: 'Country', type: 'text' },
      { key: 'contact_name', label: 'Contact name', type: 'text' },
      { key: 'contact_email', label: 'Contact email', type: 'email' },
      { key: 'notes', label: 'Notes', type: 'textarea' },
    ],
  },
  chapters: {
    table: 'country_chapters',
    title: 'Country Chapters',
    singular: 'chapter',
    description: 'The country onboarding pipeline — from first interest to active programs.',
    statusKey: 'stage',
    statuses: ['interest', 'exploration', 'mou', 'onboarding', 'active'],
    listColumns: [
      { key: 'country_name', label: 'Country' },
      { key: 'region', label: 'Region' },
      { key: 'lead_name', label: 'Lead' },
      { key: 'lead_email', label: 'Lead email' },
      { key: 'ambassadors_count', label: 'Ambassadors' },
    ],
    fields: [
      { key: 'country_name', label: 'Country', type: 'text', required: true },
      { key: 'region', label: 'Region', type: 'text' },
      { key: 'lead_name', label: 'Chapter lead', type: 'text' },
      { key: 'lead_email', label: 'Lead email', type: 'email' },
      { key: 'ambassadors_count', label: 'Ambassadors', type: 'number' },
      { key: 'notes', label: 'Notes', type: 'textarea' },
    ],
  },
  grants: {
    table: 'grants',
    title: 'Grants',
    singular: 'grant',
    description: 'The funding pipeline — research, drafting, submission, award, and reporting.',
    statusKey: 'stage',
    statuses: ['research', 'drafting', 'submitted', 'awarded', 'declined', 'reporting', 'closed'],
    listColumns: [
      { key: 'funder', label: 'Funder' },
      { key: 'title', label: 'Title' },
      { key: 'amount_requested', label: 'Requested' },
      { key: 'deadline', label: 'Deadline' },
      { key: 'program', label: 'Program' },
    ],
    fields: [
      { key: 'funder', label: 'Funder', type: 'text', required: true },
      { key: 'title', label: 'Proposal title', type: 'text' },
      { key: 'amount_requested', label: 'Amount requested (USD)', type: 'number' },
      { key: 'amount_awarded', label: 'Amount awarded (USD)', type: 'number' },
      { key: 'deadline', label: 'Deadline', type: 'date' },
      { key: 'program', label: 'Program', type: 'select', options: ['general', 'youth', 'educators', 'women'] },
      { key: 'notes', label: 'Notes', type: 'textarea' },
    ],
  },
  scholarships: {
    table: 'scholarship_applications',
    title: 'Scholarship Applications',
    singular: 'application',
    description: 'Michael G. Henry Legacy Scholarship™ — applications and review pipeline.',
    statusKey: 'status',
    statuses: ['new', 'reviewing', 'interview', 'awarded', 'declined'],
    listColumns: [
      { key: 'name', label: 'Applicant' },
      { key: 'country', label: 'Country' },
      { key: 'institution', label: 'Institution' },
      { key: 'program', label: 'Program' },
      { key: 'email', label: 'Email' },
    ],
    fields: [
      { key: 'name', label: 'Applicant name', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'country', label: 'Country', type: 'text' },
      { key: 'institution', label: 'Institution', type: 'text' },
      { key: 'program', label: 'Program / major', type: 'text' },
      { key: 'notes', label: 'Reviewer notes', type: 'textarea' },
    ],
  },
  contracts: {
    table: 'contracts',
    title: 'Contracts',
    singular: 'contract',
    description: 'NDAs, partnership agreements, third-party services, and scholarship awards.',
    statusKey: 'status',
    statuses: ['draft', 'sent', 'signed', 'expired', 'terminated'],
    listColumns: [
      { key: 'counterparty', label: 'Counterparty' },
      { key: 'contract_type', label: 'Type' },
      { key: 'country', label: 'Jurisdiction' },
      { key: 'effective_date', label: 'Effective' },
      { key: 'counterparty_email', label: 'Email' },
    ],
    fields: [
      { key: 'counterparty', label: 'Counterparty', type: 'text', required: true },
      { key: 'contract_type', label: 'Type', type: 'select', options: ['nda', 'partner', 'third_party', 'scholarship'] },
      { key: 'counterparty_email', label: 'Counterparty email', type: 'email' },
      { key: 'country', label: 'Jurisdiction', type: 'text' },
      { key: 'effective_date', label: 'Effective date', type: 'date' },
      { key: 'expiry_date', label: 'Expiry date', type: 'date' },
      { key: 'content', label: 'Agreement text', type: 'textarea' },
    ],
  },
  staff: {
    table: 'profiles',
    title: 'Staff',
    singular: 'team member',
    description: 'Your team. Accounts are created in Supabase Auth; roles are managed here.',
    statusKey: 'status',
    statuses: ['active', 'invited', 'inactive'],
    listColumns: [
      { key: 'full_name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'title', label: 'Title' },
      { key: 'country', label: 'Country' },
    ],
    fields: [
      { key: 'full_name', label: 'Full name', type: 'text', required: true },
      { key: 'role', label: 'Role', type: 'select', options: ['admin', 'staff', 'ambassador'] },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'country', label: 'Country', type: 'text' },
    ],
  },
};
