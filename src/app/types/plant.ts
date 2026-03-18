export interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
  other_name?: string[];
  cycle?: string;
  watering?: string;
  sunlight?: string[];
  default_image?: {
    original_url: string;
    regular_url: string;
    medium_url: string;
    small_url: string;
    thumbnail: string;
  };
  type?: string;
  description?: string;
  hydroponic_compatible?: boolean;
  attracts?: string[];
  propagation?: string[];
  maintenance?: string;
}
