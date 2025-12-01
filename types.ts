import { LucideIcon } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
}

export enum UserType {
  CONTRACTOR = 'contractor',
  HOMEOWNER = 'homeowner'
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}
