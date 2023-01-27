const dev = process.env.NODE_ENV !== "production";
export const baseUrl = dev
  ? `http://localhost:3000/api`
  : "https://newsx-ofovweewere.vercel.app/api";
export const staticResourceUrl = dev
  ? `http://localhost:3000/uploads/`
  : "https://api.cloudinary.com/v1_1/lamadev/image/upload";
