export interface PinData {
  id: string;
  description: string;
  imageUrl: string;
}

export interface SharedMoodBoard {
  prompt: string;
  pins: PinData[];
}
