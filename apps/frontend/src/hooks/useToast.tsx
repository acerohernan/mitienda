import toast from "react-hot-toast";

const success = (message: string) =>
  toast.success(message, {
    style: {
      border: "1px solid #22c55e",
      padding: "16px",
      color: "#22c55e",
    },
    iconTheme: {
      primary: "#22c55e",
      secondary: "#FFFAEE",
    },
    position: "bottom-center",
  });

const error = (message: string) =>
  toast.error(message, {
    style: {
      border: "1px solid #e11d48",
      padding: "16px",
      color: "#e11d48",
    },
    iconTheme: {
      primary: "#e11d48",
      secondary: "#FFFAEE",
    },
    position: "bottom-center",
  });

export function useToast() {
  return {
    success,
    error,
  };
}
