export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: WebApp;
    };
  }

  interface Global {
    f: (url: string, options?: any) => Promise<any>;
  }

  var f: Global["f"];

  interface WebApp {
    initData: string;
    initDataUnsafe: any;
    version: string;
    platform: string;
    colorScheme: string;
    themeParams: any;
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    isClosingConfirmationEnabled: boolean;
    isFullscreen: boolean;

    close(): void;
    expand(): void;
    enableClosingConfirmation(): void;
    disableClosingConfirmation(): void;
    onEvent(eventType: string, eventHandler: () => void): void;
    offEvent(eventType: string, eventHandler: () => void): void;
    sendData(data: string): void;

    disableVerticalSwipes(): void;
    exitFullscreen(): void;
    requestFullscreen(): Promise<void>;
    lockOrientation(): void;
  }
}
