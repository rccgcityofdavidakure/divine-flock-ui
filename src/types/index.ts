export type Role = 'Admin' | 'Pastor' | 'Leader' | 'Member';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  group: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Excused';
  serviceType: string;
}

export interface Transaction {
  id: string;
  type: 'Offering' | 'Tithe' | 'Donation' | 'Expense';
  amount: number;
  category: string;
  date: string;
  description: string;
  memberId?: string;
}

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'Service' | 'Meeting' | 'Youth' | 'Special';
  description: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  category: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  thumbnail: string;
  category: string;
  duration: string;
}