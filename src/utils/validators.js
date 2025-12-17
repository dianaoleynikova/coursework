export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUsername(username) {
  // 3-50 символів, тільки букви, цифри, підкреслення
  const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
  return usernameRegex.test(username);
}

export function validatePassword(password) {
  // Мінімум 8 символів
  return password && password.length >= 8;
}

export function validatePostTitle(title) {
  return title && title.length >= 5 && title.length <= 255;
}

export function validatePostContent(content) {
  return content && content.length >= 10;
}