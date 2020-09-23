import { format, getDaysInMonth } from 'date-fns';

const increment = (d, h, m) => {
  const dhm = { d, h, m };

  if (m >= 60) {
    dhm.h += 1;
    dhm.m = 0;
  }
  if (h >= 24) {
    dhm.d += 1;
    dhm.h = 0;
  }
  return dhm;
};
const incrementByDate = (d, h, m) => {
  const dhm = { d, h, m };
  if (m >= 60) {
    dhm.h += 1;
    dhm.m -= 60;
  }
  if (h >= 24) {
    dhm.d += 1;
    dhm.h -= 24;
  }
  return dhm;
};

const convertMinutesInDHM = (maxPrice, rate) => {
  const round5 = (num) => {
    return Math.floor(num / 5) * 5;
  };
  const cd = 24 * 60 * rate;
  const amountMinute = Math.round(maxPrice / rate);
  const d = Math.floor(maxPrice / cd);
  const h = Math.floor(amountMinute / 60 - d * 24);
  const m = round5(amountMinute - (d * 24 * 60 + h * 60));
  return increment(d, h, m);
};

export const getMaxRentTime = (unit, maxPrice, rate, startRentDate) => {
  if (unit === 'сутки') {
    return {
      d: Math.floor(maxPrice / rate),
      h: new Date(startRentDate).getHours(),
      m: new Date(startRentDate).getMinutes(),
    };
  }
  if (unit === 'мин') {
    const { d, h, m } = convertMinutesInDHM(maxPrice, rate);
    const maxTimeHour = new Date(startRentDate).getHours() + h;
    const maxTimeMinute = new Date(startRentDate).getMinutes() + m;
    return incrementByDate(d, maxTimeHour, maxTimeMinute);
  }
  return false;
};

export const dhm = (start, end) => {
  const timeRange = end - start;
  if (timeRange <= 0 || start === 0) {
    return '0м';
  }
  const cd = 24 * 60 * 60 * 1000;
  const ch = 60 * 60 * 1000;
  let d = Math.floor(timeRange / cd);
  let h = Math.floor((timeRange - d * cd) / ch);
  let m = Math.round((timeRange - d * cd - h * ch) / 60000);

  if (m === 60) {
    h += 1;
    m = 0;
  }
  if (h === 24) {
    d += 1;
    h = 0;
  }
  const items = [
    { item: d, unit: 'д' },
    { item: h, unit: 'ч' },
    { item: m, unit: 'м' },
  ];
  const result = items.reduce((acc, { item, unit }) => {
    return item > 0 ? [...acc, `${item}${unit}`] : acc;
  }, []);
  return result.join(' ');
};

export const appendScript = (scriptToAppend, isScriptLoaded, setScriptLoadState) => {
  if (isScriptLoaded) return false;
  const script = document.createElement('script');
  script.src = scriptToAppend;
  script.async = true;
  script.type = 'text/javascript';
  script.onload = () => {
    setScriptLoadState();
  };
  script.onerror = () => console.log(`Error loading`);
  return document.head.appendChild(script);
};

export const getNumber = (number) => {
  if (!number) {
    return 'N/A';
  }
  const normalized = number
    .toUpperCase()
    .split('')
    .map((item, i) => {
      if (i === 0) {
        return `${item} `;
      }
      if (i === 4) {
        return ` ${item}`;
      }
      return item;
    })
    .join('');
  return normalized;
};

export const getFuel = (isFullTank, tank) => {
  if (isFullTank) {
    return '100%';
  }
  return tank ? `${tank}%` : 'неизвестно';
};

export const getRandomString = () => {
  const str = [];
  const possible = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 8; i += 1) {
    const symbol = possible.charAt(Math.floor(Math.random() * possible.length));
    str.push(symbol);
  }
  return str.join('');
};

export const setTokens = (data, basicToken) => {
  localStorage.setItem('accessToken', data.access_token);
  localStorage.setItem('refreshToken', data.refresh_token);
  localStorage.setItem('basicToken', basicToken);
  localStorage.setItem('expiresIn', data.expires_in);
  localStorage.setItem('expiresDate', Date.now() + data.expires_in * 1000);
};

export const getTokens = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const basicToken = localStorage.getItem('basicToken');
  const expiresIn = localStorage.getItem('expiresIn');
  const expiresDate = localStorage.getItem('expiresDate');
  return {
    accessToken,
    refreshToken,
    basicToken,
    expiresIn,
    expiresDate,
  };
};

export const destroyTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('basicToken');
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('expiresDate');
};

export const formatDate = (date) => {
  if (date === 'Данные отсутствуют') {
    return date;
  }
  return format(new Date(date), 'dd.MM.yyyy HH:mm');
};

export const getInterval = () => {
  const oneDayByMS = 86400000;
  const currentDate = Date.now();
  const daysInMonth = getDaysInMonth(new Date());
  const dayAgo = currentDate - oneDayByMS;
  const weekAgo = currentDate - oneDayByMS * 7;
  const monthAgo = currentDate - daysInMonth * oneDayByMS;
  return [
    { name: 'За день', id: dayAgo },
    { name: 'За неделю', id: weekAgo },
    { name: 'За месяц', id: monthAgo },
  ];
};

export const translateOrderStatus = (status) => {
  switch (status.name) {
    case 'new':
      return 'Новый';
    case 'issued':
      return 'В процессе';
    case 'confirmed':
      return 'Подтвержден';
    case 'cancelled':
      return 'Отменён';
    default:
      return 'Прочее';
  }
};
