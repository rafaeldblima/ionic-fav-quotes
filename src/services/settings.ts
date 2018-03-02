export class SettingsService {
  private altBackground = false;

  setBackground(isAlt: boolean) {
    this.altBackground = isAlt;
  }

  getBackground() : boolean {
    return this.altBackground;
  }
}
