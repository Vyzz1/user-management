import cors from "cors";
const corsHandler = cors({
  origin: ["https://ephemeral-kelpie-56bf35.netlify.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

export default corsHandler;
