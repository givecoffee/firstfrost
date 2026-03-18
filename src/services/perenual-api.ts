import type { Plant } from '../app/types/plant';

/**
 * Perenual Plant API Integration
 * 
 * To use this service with real data:
 * 1. Sign up at https://perenual.com/docs/api
 * 2. Get your API key
 * 3. Replace 'YOUR_API_KEY_HERE' below with your actual key
 * 4. Update the components to use these functions instead of mock data
 */

const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://perenual.com/api';

interface PerenualResponse {
  data: Plant[];
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
}

/**
 * Search for plants by name
 */
export async function searchPlants(query: string, page = 1): Promise<PerenualResponse> {
  const url = `${BASE_URL}/species-list?key=${API_KEY}&q=${encodeURIComponent(query)}&page=${page}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching plants:', error);
    throw error;
  }
}

/**
 * Get plant details by ID
 */
export async function getPlantDetails(id: number): Promise<Plant> {
  const url = `${BASE_URL}/species/details/${id}?key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching plant details:', error);
    throw error;
  }
}

/**
 * Get list of plants with optional filters
 */
export async function getPlants(options?: {
  page?: number;
  edible?: boolean;
  indoor?: boolean;
  cycle?: string;
  watering?: string;
  sunlight?: string;
}): Promise<PerenualResponse> {
  const params = new URLSearchParams({
    key: API_KEY,
    page: (options?.page || 1).toString(),
  });

  if (options?.edible) params.append('edible', '1');
  if (options?.indoor) params.append('indoor', '1');
  if (options?.cycle) params.append('cycle', options.cycle);
  if (options?.watering) params.append('watering', options.watering);
  if (options?.sunlight) params.append('sunlight', options.sunlight);

  const url = `${BASE_URL}/species-list?${params.toString()}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching plants:', error);
    throw error;
  }
}

/**
 * Example usage:
 * 
 * // Search for tomatoes
 * const results = await searchPlants('tomato');
 * 
 * // Get details for a specific plant
 * const plant = await getPlantDetails(1);
 * 
 * // Get edible plants with frequent watering
 * const ediblePlants = await getPlants({
 *   edible: true,
 *   watering: 'frequent'
 * });
 */
