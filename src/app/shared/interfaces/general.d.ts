export interface ImageConfig {
  base_url:         string;
  secure_base_url?: string;
  backdrop_sizes?:  string[];
  logo_sizes?:      string[];
  poster_sizes:     string[];
  profile_sizes?:   string[];
  still_sizes?:     string[];
}

export interface GuestSession {
  success: boolean;
  guest_session_id: string;
  expires_at: Date;
}

export interface RatedCard {
  id: number;
  rating: number;
}
