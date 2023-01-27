const dev = process.env.NODE_ENV !== "production";
export const baseUrl = dev
  ? `http://localhost:3000/api`
  : "https://newsx-ofovweewere.vercel.app/api";
export const staticResourceUrl = dev
  ? `http://localhost:3000/uploads/`
  : "https://newsx-ofovweewere.vercel.app/uploads/";
