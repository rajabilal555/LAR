import { Notification } from "electron";
import { getStoredNumber, getStoredString } from "./storageHelper";

class NotificationHandler {
  private static instance: NotificationHandler | null = null;
  private intervalId: NodeJS.Timeout | null;

  // Interval in seconds
  private interval: number;
  private message: string;

  constructor(interval: number, message?: string) {
    this.intervalId = null;
    this.interval = interval;
    this.message = message;
  }

  static init(): NotificationHandler {
    if (!NotificationHandler.instance) {
      const interval = getStoredNumber("interval", 120);
      const message = getStoredString("message", "Time for a little break");
      NotificationHandler.instance = new NotificationHandler(interval, message);
    }
    NotificationHandler.instance.start();
    return NotificationHandler.instance;
  }

  static getInstance(): NotificationHandler {
    if (!NotificationHandler.instance) {
      throw new Error(
        "NotificationHandler has not been initialized please use the init() function first"
      );
    }
    return NotificationHandler.instance;
  }

  sendNotification(): void {
    const NOTIFICATION_TITLE = "Look Away 🔔";
    const NOTIFICATION_BODY = this.message;
    const notif = new Notification({
      title: NOTIFICATION_TITLE,
      body: NOTIFICATION_BODY,
    });
    notif.show();
    //? remove the notification after 20 seconds to stop them from pilling up
    setTimeout(() => notif.close(), 20000);
  }

  updateTime(newInterval: number): void {
    this.interval = newInterval;
    if (this.isRunning()) {
      this.restart();
    }
  }

  update(newInterval: number, message: string): void {
    this.interval = newInterval;
    this.message = message;
    if (this.isRunning()) {
      this.restart();
    }
  }

  updateMessage(message: string): void {
    this.message = message;
    if (this.isRunning()) {
      this.restart();
    }
  }

  start(): void {
    if (!this.isRunning()) {
      this.intervalId = setInterval(() => {
        this.sendNotification();
      }, this.interval * 1000);
    }
  }

  stop(): void {
    if (this.isRunning()) {
      clearInterval(this.intervalId!);
      this.intervalId = null;
    }
  }

  isRunning(): boolean {
    return this.intervalId !== null;
  }

  private restart(): void {
    this.stop();
    this.start();
  }
}

export default NotificationHandler;
