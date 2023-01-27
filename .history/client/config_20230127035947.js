const dev = process.env.NODE_ENV !== "production";
export const baseUrl = dev
  ? `http://localhost:3000/api`
  : "https://newsx-k8y5z7nk8-ofovweewere.vercel.app/";
export const staticResourceUrl = dev
  ? `http://localhost:3000/uploads/`
  : "https://newsx-k8y5z7nk8-ofovweewere.vercel.app/uploads/";
