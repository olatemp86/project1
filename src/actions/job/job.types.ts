export const types = {
  'SET_JOBS': 'SET_JOB',
  'SET_JOBS_LIST': 'SET_JOBS_LIST',
  'SET_SCHEDULED_JOBS': 'SET_SCHEDULED_JOBS',
  'SET_TODAYS_JOBS': 'SET_TODAYS_JOBS',
  'SET_PREVIOUS_JOBS_CURSOR': 'SET_PREVIOUS_JOBS_CURSOR',
  'SET_NEXT_JOBS_CURSOR': 'SET_NEXT_JOBS_CURSOR',
  'SET_JOBS_TOTAL': 'SET_JOBS_TOTAL',
  'SET_CURRENT_JOBS_PAGE_INDEX': 'SET_CURRENT_JOBS_PAGE_INDEX',
  'SET_CURRENT_JOBS_PAGE_SIZE': 'SET_CURRENT_JOBS_PAGE_SIZE',
  'SET_JOBS_SEARCH_KEYWORD': 'SET_JOBS_SEARCH_KEYWORD',
  'JOB_LOADING': 'JOB_LOADING',
  'SET_REFRESH_JOB_STATUS': 'SET_REFRESH_JOB_STATUS',
  'SET_STREAM_JOB_STATUS': 'SET_STREAM_JOB_STATUS',
  'SET_SINGLE_JOB': 'SET_SINGLE_JOB',
  'GET_SINGLE_JOB': 'GET_SINGLE_JOB',
  'SET_JOB_LOADING': 'SET_JOB_LOADING',
  'SET_TODAYS_JOB_LOADING': 'SET_TODAYS_JOB_LOADING',
};

export interface Job {
  _id: string;
  _v: string;
  charges: number;
  scheduleDate: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  estimate: string;
  customer: {
    address: {
      city: string;
      state: string;
      zipCode: string;
    };
    contactName: string;
    info: {
      email: string;
    };
    profile: {
      displayName: string;
    };
    contact: {
      phone: string;
    };
    location?: {
      coordinates?: number[];
    }
    _t: string;
    _id: string;
  };
  description: string;
  employeeType: false;
  endTime: string;
  equipment_scanned: false;
  jobId: string;
  no_of_equipment_scanned: number;
  type: {
    title: string;
    _id: string;
  };
  comment: string;
  status: string;
  company: {
    info: {
      companyName: string;
      companyEmail: string;
    };
    contact: {
      phone: string;
    };
    _id: string;
  };
  startTime: string;
  completeOnTime: false;
  createdAt: string;
  createdBy: {
    profile: {
      displayName: string;
    };
    _t: string;
    _id: string;
  };
  technician: {
    profile: {
      displayName: string;
    };
    __t: string;
    _id: string;
  };
  ticket: {
    note: string;
    ticketId: string;
    jobLocation: string;
    _id: string;
  };
  timeSpent: number;
  jobSite?: {
    location?: {
      coordinates?: number[];
    }
  }
  jobLocation?: {
    location?: {
      coordinates?: number[];
    }
  }
  tasks: any[];
}

export interface JobsState {
  readonly isLoading: boolean;
  readonly isTodaysJobLoading: boolean;
  streaming?: boolean;
  readonly refresh: boolean;
  readonly data?: Job[];
  readonly jobsList?: Job[];
  readonly scheduledJobs?: Job[];
  readonly todaysJobs?: Job[];
  readonly jobObj?: Job;
  prevCursor: string;
  nextCursor: string;
  total: number;
  currentPageIndex: number;
  currentPageSize: number;
  keyword: string;
}

export enum JobActionType {
  GET = 'getJobs',
  SUCCESS = 'getJobsSuccess',
  FAILED = 'getJobsFailed',
}

export const JobTypes = ['pending', 'started', 'finished', 'cancelled'];
