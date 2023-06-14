export interface IMeetingMember {
  login: string;
  name: string;
  userId: string;
  isConnected: boolean;
}

export interface IMeetingData {
  id: string;
  connectedMembers: IMeetingMember[];
  title: string;
}
