export type ReminderStatus = 'Upcoming' | 'Due Today' | 'Overdue' | 'Completed' | 'Rescheduled' | 'Cancelled';
export type ReminderChannel = 'WhatsApp' | 'Call' | 'SMS';

export interface Reminder {
  id: string;
  customerId: string;
  acUnitId?: string;
  title: string;
  dueDate: string;
  channel: ReminderChannel;
  status: ReminderStatus;
  note?: string;
}
