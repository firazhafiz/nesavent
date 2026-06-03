export interface MockUser {
  name: string;
  role: string;
  faculty: string;
  avatar: string;
  notifCount: number;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface TrendingEvent {
  id: string;
  title: string;
  organizer: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  quota: number;
  remaining: number;
  image: string;
  tags: string[];
  isHot: boolean;
}

export interface LoopingTrendingEvent extends TrendingEvent {
  uniqueId: string;
}

export interface ForYouEvent {
  id: string;
  title: string;
  organizer: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  quota: number;
  remaining: number;
  image: string;
  tags: string[];
}

export interface UpcomingEvent {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  image: string;
  daysLeft: number;
}

export interface Ticket {
  id: string;
  eventTitle: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  ticketType: string;
  ticketCode: string;
  status: string;
  color: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

export interface LoopingBanner extends Banner {
  uniqueId: string;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  views: string;
  likes: string;
  image: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon: string;
}
