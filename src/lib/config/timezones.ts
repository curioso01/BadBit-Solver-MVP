export type TimezoneOption = { value: string; label: string; region: string };

export const curatedTimezoneOptions: TimezoneOption[] = [
  { value: 'America/Sao_Paulo', label: 'São Paulo (GMT-03:00)', region: 'Americas' },
  { value: 'America/New_York', label: 'New York (GMT-05:00/-04:00)', region: 'Americas' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (GMT-08:00/-07:00)', region: 'Americas' },
  { value: 'America/Mexico_City', label: 'Mexico City (GMT-06:00)', region: 'Americas' },
  { value: 'Europe/London', label: 'London (GMT+00:00/+01:00)', region: 'Europe' },
  { value: 'Europe/Madrid', label: 'Madrid (GMT+01:00/+02:00)', region: 'Europe' },
  { value: 'Europe/Lisbon', label: 'Lisbon (GMT+00:00/+01:00)', region: 'Europe' },
  { value: 'Europe/Berlin', label: 'Berlin (GMT+01:00/+02:00)', region: 'Europe' },
  { value: 'Asia/Dubai', label: 'Dubai (GMT+04:00)', region: 'Middle East' },
  { value: 'Asia/Tokyo', label: 'Tokyo (GMT+09:00)', region: 'Asia' },
  { value: 'Asia/Shanghai', label: 'Shanghai (GMT+08:00)', region: 'Asia' },
  { value: 'Australia/Sydney', label: 'Sydney (GMT+10:00/+11:00)', region: 'Oceania' },
  { value: 'UTC', label: 'UTC (GMT+00:00)', region: 'Global' }
];

export const getSafeTimezone = (value: string | undefined): string => {
  if (!value) return 'UTC';
  return curatedTimezoneOptions.some((tz) => tz.value === value) ? value : 'UTC';
};
