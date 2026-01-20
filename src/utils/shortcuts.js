// default shortcuts
// for more info, check https://www.electronjs.org/docs/api/accelerator
import { isMac } from '@/utils/platform';
export default [
  {
    id: 'play',
    name: '播放/暂停',
    shortcut: 'CommandOrControl+P',
    globalShortcut: 'CommandOrControl+Alt+P',
  },
  {
    id: 'next',
    name: '下一首',
    shortcut: 'CommandOrControl+Right',
    globalShortcut: 'CommandOrControl+Alt+Right',
  },
  {
    id: 'previous',
    name: '上一首',
    shortcut: 'CommandOrControl+Left',
    globalShortcut: 'CommandOrControl+Alt+Left',
  },
  {
    id: 'increaseVolume',
    name: '增加音量',
    shortcut: 'CommandOrControl+Up',
    globalShortcut: 'CommandOrControl+Alt+Up',
  },
  {
    id: 'decreaseVolume',
    name: '减少音量',
    shortcut: 'CommandOrControl+Down',
    globalShortcut: 'CommandOrControl+Alt+Down',
  },
  {
    id: 'like',
    name: '喜欢歌曲',
    shortcut: 'CommandOrControl+L',
    globalShortcut: 'CommandOrControl+Alt+L',
  },
  {
    id: 'minimize',
    name: '隐藏/显示播放器',
    shortcut: 'CommandOrControl+M',
    globalShortcut: 'CommandOrControl+Alt+M',
  },
];

export function eventToKey(e) {
  if (e.key === 'Control') return 'Control';
  if (e.key === 'Meta' && isMac) return 'Command';
  if (e.key === 'Alt' || e.key === 'Shift') return e.key;
  if (e.key === ' ') return 'Space';
  // A-Z
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    return e.key.toUpperCase();
  }
  if (
    (e.keyCode >= 48 && e.keyCode <= 57) || // 0-9
    (e.keyCode >= 112 && e.keyCode <= 123) || // F1-F12
    ['=', '-', '`', '[', ']', ';', "'", ',', '.', '/'].includes(e.key) // 常用符号
  ) {
    return e.key;
  }
  // Arrows
  if (e.key.startsWith('Arrow')) {
    return e.key.slice(5);
  }
  return null;
}

// 键盘标识符转化
export function formatCombo(combo) {
  const map = {
    CommandOrControl: isMac ? '⌘' : 'Ctrl',
    Command: '⌘',
    Control: isMac ? '⌃' : 'Ctrl',
    Alt: isMac ? '⌥' : 'Alt',
    Shift: isMac ? '⇧' : 'Shift',
    Up: '↑',
    Down: '↓',
    Left: '←',
    Right: '→',
  };
  return combo
    .split('+')
    .map(k => map[k] || k)
    .join(' + ');
}

export function verifyCombo(combo) {
  const parts = combo.split('+').map(k => k.trim());
  if (parts.length < 2 || parts.length > 4) return '请输入2-4个按键';
  const modifiers = ['Control', 'Alt', 'Shift', 'Command'];
  if (!parts.some(k => modifiers.includes(k)))
    return '至少包含一个修饰键: Ctrl/Alt/Shift/Command';
  const nonModifiers = parts.filter(k => !modifiers.includes(k));
  if (nonModifiers.length < 1) {
    return '至少包含一个非修饰键';
  }
  return '';
}
