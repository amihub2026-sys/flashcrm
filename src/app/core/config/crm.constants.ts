export const CRM_NAME = 'ServiceFlow AC CRM';
export const DEFAULT_COUNTRY_CODE = '91';
export const DEFAULT_CITY = 'Madurai';

export const SERVICE_STATUSES = [
  'New', 'Assigned', 'Confirmed', 'In Progress', 'Waiting for Parts',
  'Completed', 'Rescheduled', 'Cancelled', 'Revisit Required'
] as const;

export const FOLLOW_UP_RESULTS = [
  'Contacted', 'No Answer', 'Busy', 'Call Later', 'Service Confirmed',
  'Rescheduled', 'Cancelled'
] as const;
