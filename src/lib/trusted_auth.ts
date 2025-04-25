import { constants } from "./constants";

type FilterRule = {
    column_name: string;
    operator: string;
    values: string[];
}

type ParameterRule = {
  name: string;
  values: any[];
}
// These are optionally available to set filters and parameters for the token auth.
// They will be processed and passed to the token endpoint.

// Lesson 1.x Add a filter and a parameter for the user.
const filters: FilterRule[] = [{column_name: 'product type', operator: "IN", values: ['pants', 'shorts', 'skirts', 'jeans']}];
const params: ParameterRule[] = [{name: 'sales tax', values: [0.9] } ];

/**
 * Gets a token for the given user.
 * @returns A promise that resolves to the token (of any type).
 */
export const getAuthToken = async (): Promise<any> => {
  let endpoint: string = `${constants.tokenServer}/token?username=${constants.username}&passcode=${constants.passcode}`;
  endpoint = updateUrlWithFiltersAndParams(endpoint);
  console.log("token endpoint: " + endpoint);

  const response = await fetch(endpoint);
  const token = await response.json();
  console.log("token == ", token);

  return token;
};

function updateUrlWithFiltersAndParams(
  baseUrl: string,
): string {
  const url = new URL(baseUrl);

  // Add filter query parameters
  filters.forEach((filter, index) => {
    const idx = index + 1;
    url.searchParams.append(`fname_${idx}`, filter.column_name);
    url.searchParams.append(`foperator_${idx}`, filter.operator);
    // Join the values array into a comma-separated string.
    url.searchParams.append(`fvalue_${idx}`, filter.values.join(','));
  });

  // Add parameter query parameters
  params.forEach((param, index) => {
    const idx = index + 1;
    url.searchParams.append(`pname_${idx}`, param.name);
    url.searchParams.append(`pvalue_${idx}`, param.values.join(','));
  });

  return url.toString();
}

/**
 * This function is _only_ for step-by-step users. This approach is not recommended for production environments.
 *
 * This approach will use the username and password to call and get a token instead of a backend service.
 *
 * @param user The name of the user to get a token for.
 * @param password The user's password.
 * @returns A promise that resolves to the token string, or undefined if an error occurs.
 */
export const getAuthTokenLocal = async (user: string, password: string): Promise<string | undefined> => {
  const endpoint: string = `${constants.tsURL}/api/rest/2.0/auth/token/full`;

  const data: {
    username: string;
    validity_time_in_sec: number;
    auto_create: boolean;
    password: string;
  } = {
    username: user,
    validity_time_in_sec: 300,
    auto_create: false,
    password: password,
  };

  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });
    const j = await response.json();
    console.log('token response', j);
    return j.token;
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};