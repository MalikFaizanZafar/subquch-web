export interface Memeber {
  username?: string;
  password?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
}

export interface BuisnessImageModel {
  id?: number;
  imageUrl: string;
  banner?: boolean;
  file?: any;
  edited?:boolean;

}

export interface BuisnessModel {
  id: number;
  title: string;
  summary: string;
  totalWorth: number;
  monthlyWorth: number;
  detailDescription: string;
  disclaimer: string;
  logoUrl: string;
  remainingShares: number;
  enabled: boolean;
  startDate: Date;
  endDate: Date; // note: we will create author property in the Photo class below
  images: BuisnessImageModel[];
}