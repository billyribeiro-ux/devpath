export type DevpathToastType = 'success' | 'error' | 'info' | 'achievement';

export function showDevpathToast(
  title: string,
  message: string,
  type: DevpathToastType = 'info'
): void {
  window.dispatchEvent(
    new CustomEvent('devpath-toast', {
      detail: { title, message, type },
    })
  );
}
