declare global {
  interface Window {
    ttq?: any;
  }
}

export const identifyUserInTiktok = (user: any) => {
  if (window.ttq) {
    window.ttq.identify({
      email: user?.email,
      external_id: user?.id
    });
  }
};

export const trackPageView = () => {
  if (window.ttq) {
    window.ttq.track('ViewContent');
  }
};