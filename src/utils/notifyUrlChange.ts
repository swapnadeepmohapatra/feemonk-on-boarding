export function notifyUrlChange(url: string) {
  // Call a function in the Android WebView interface
  if ((window as any).AndroidInterface) {
    (window as any).AndroidInterface.notifyUrlChange(url);
  }
}
