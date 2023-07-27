export interface NextEventProps {
  target?: any;
  id?: string;
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  categories?: string[];
}

export interface DiscoverEventsProps {
  sortByFilters: string[];
  activeFilters: string[];
  onFilterClick: any;
}

export interface EventListProps {
  // eslint-disable-next-line no-unused-vars
  handleSubscribeClick: (event: NextEventProps) => void;
  eventsToDisplay: NextEventProps[];
  subscriptions: NextEventProps[];
}

export interface EventPlannerHeaderProps {
  isDark: boolean;
  handleDarkModeClick: () => void;
}

export interface EventPlannerProps {
  toggleTheme: () => void;
}
