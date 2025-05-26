export class BaseStore {
  isLoading: boolean = false;
  error: string | null = null;
  baseUrl: string = 'http://localhost:8080';
  url: string = '';

  async get(url?: string) {
    console.log(
      `Fetching from: ${this.baseUrl}${this.url}${url ? `/${url}` : ''}`,
    );
    this.setLoading(true);
    try {
      const response = await fetch(
        `${this.baseUrl}${this.url}${url ? `/${url}` : ''}`,
      );
      this.setLoading(false);
      return response.json();
    } catch (error) {
      this.setError('Failed to fetch data');
      this.setLoading(false);
    }
  }

  async post(url: string, data: any) {
    this.setLoading(true);
    try {
      const response = await fetch(`${this.baseUrl}${this.url}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      this.setLoading(false);
      return response.json();
    } catch (error) {
      this.setError('Failed to post data');
      this.setLoading(false);
    }
  }

  async put(url: string, data: any) {
    this.setLoading(true);
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      this.setLoading(false);
      return response.json();
    } catch (error) {
      this.setError('Failed to update data');
      this.setLoading(false);
    }
  }

  async patch(url: string, data: any) {
    this.setLoading(true);
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      this.setLoading(false);
      return response.json();
    } catch (error) {
      this.setError('Failed to patch data');
      this.setLoading(false);
    }
  }

  async delete(url: string) {
    this.setLoading(true);
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'DELETE',
      });
      this.setLoading(false);
      return response.json();
    } catch (error) {
      this.setError('Failed to delete data');
      this.setLoading(false);
    }
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  setError(message: string | null) {
    this.error = message;
  }
}
