import type { ToastOptions } from "vue3-toastify";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import IconCross from "~/components/icons/IconCross.vue";
import IconTickCircle from "~/components/icons/IconTickCircle.vue";
import IconInfoCircle from "~/components/icons/IconInfoCircle.vue";
import IconWarning from "~/components/icons/IconWarning.vue";

export const useToast = () => {
  const showToast = (
    message: string,
    options: {
      autoClose?: number;
      type?: "success" | "info" | "error" | "warning";
    } = {}
  ) => {
    const { autoClose = 3000, type = "info" } = options;

    const toastOptions: ToastOptions = {
      icon:
        type === "success"
          ? h(IconTickCircle)
          : type === "info"
            ? h(IconInfoCircle, {
              width: "20",
              height: "20",
              stroke: "#53B1FD",
              class: "transform rotate-[90]",
            })
            : type === "error"
              ? h(IconInfoCircle, { width: "20", height: "20", stroke: "#F97066" })
              : h(IconWarning),
      autoClose: autoClose,
      theme: "dark",
      toastClassName: "custom-toast-container",
      bodyClassName: `custom-toast ${type}`,
      progressClassName: `custom-progress ${type}`,
      closeButton: () =>
        h(IconCross, {
          fill: "#ffffff",
          width: "24",
          height: "24",
        }),
    };

    toast(message, toastOptions);
  };

  return {
    showToast,
  };
};
