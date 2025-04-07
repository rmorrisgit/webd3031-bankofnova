

import { Employer } from '../../lib/types'; // Adjust the path accordingly



const fetchEmployersData = async (): Promise<Employer[]> => {
  try {
    const response = await fetch('/api/user/employers');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch employers: ${response.statusText}`);
    }

    const data: Employer[] = await response.json();
    console.log("Fetched employers data:", data); // Log fetched data

    // Filter only employers (those with role = 'employer')
    const filteredEmployers = data.filter((employer: Employer) => employer.role === 'employer');

    return filteredEmployers;
  } catch (error) {
    console.error('Error fetching employers:', error);
    throw new Error('Failed to fetch employers');
  }
};

export { fetchEmployersData };