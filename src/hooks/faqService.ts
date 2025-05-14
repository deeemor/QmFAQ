import { FAQ } from '../types';





const API_URL = import.meta.env.VITE_API_URL;

//für likes
export async function likeFaq(id: string | number): Promise<FAQ> {
  try {
    const response = await fetch(`${API_URL}/like/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to like FAQ: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.title || errorData.message || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use the raw error text
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.text();
    if (!data) {
      return { id, likes: 1, dislikes: 0 } as FAQ; // Fallback if no response
    }
    
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to parse response JSON, using fallback', e);
      return { id, likes: 1, dislikes: 0 } as FAQ;
    }
  } catch (error) {
    console.error('Error liking FAQ:', error);
    throw error;
  }
}

//für dislikes
export async function dislikeFaq(id: string | number): Promise<FAQ> {
  try {
    const response = await fetch(`${API_URL}/dislike/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to dislike FAQ: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.title || errorData.message || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use the raw error text
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.text();
    if (!data) {
      return { id, likes: 0, dislikes: 1 } as FAQ; // Fallback if no response
    }
    
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to parse response JSON, using fallback', e);
      return { id, likes: 0, dislikes: 1 } as FAQ;
    }
  } catch (error) {
    console.error('Error disliking FAQ:', error);
    throw error;
  }
}