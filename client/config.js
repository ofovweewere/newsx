const dev = process.env.NODE_ENV !== "production";
export const baseUrl = dev
  ? `http://localhost:3000/api`
  : "https://your_deployment.server.com";
export const staticResourceUrl = dev
  ? `http://localhost:3000/uploads/`
  : "https://your_deployment.server.com";
