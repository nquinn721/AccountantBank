export class BaseStore {
  isLoading: boolean = false;
  error: string | null = null;
  baseUrl: string = "http://localhost:8080";

  async get(url: string) {
    this.setLoading(true);
    try {
      const response = await fetch(`${this.baseUrl}${url}`);
      this.setLoading(false);
      return response.json();
    } catch (error) {
      this.setError("Failed to fetch data");
      this.setLoading(false);
    }
  }

  async post(url: string, data: any) {
    this.setLoading(true);
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      this.setLoading(false);
      return response.json();
    } catch (error) {
      this.setError("Failed to post data");
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
