export const downloadTxt = (content: string, filename: string) => {
  // Создаем Blob с типом text/plain
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  
  // Создаем временную ссылку
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  // Добавляем в DOM, кликаем и удаляем
  document.body.appendChild(link);
  link.click();
  
  // Очищаем память
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};