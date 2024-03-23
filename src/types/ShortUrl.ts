export interface ShortUrl {
  id: string;
  longUrl: string;
  shortUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  visits: number;
}

export interface ShortUrlResponse {
  status: number;
  statusMsg: string;
  data: ShortUrl;
}

export interface ShortUrlErrorResponse {
  status: number;
  statusMsg: string;
  message: string;
}
