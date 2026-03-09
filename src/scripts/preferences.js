class ThemeManager {
  constructor() {
    this.theme = 'theme-light'; // 默认主题
    this.init();
  }

  init() {
    this.loadTheme(); // 加载保存的主题
    this.bindEvents(); // 绑定切换按钮事件
    this.watchSystemTheme(); // 监听系统主题变化
  }

  setTheme(themeName) {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(themeName);
    this.theme = themeName;
    this.saveTheme(themeName); // 保存到本地存储
  }

  saveTheme(theme) {
    localStorage.setItem('user-theme', theme);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('user-theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }
}

export default new ThemeManager();
