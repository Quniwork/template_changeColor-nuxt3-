import variables from '@/assets/_variables.sass';

export function getSassVariables() {
  return {
    '--color-primary': variables['$color-primary'],
    '--color-secondary': variables['$color-secondary'],
    '--color-primary-text': variables['$color-primary-text'],
    '--color-secondary-text': variables['$color-secondary-text'],
    '--color-primary-bg': variables['$color-primary-bg'],
    '--color-secondary-bg': variables['$color-secondary-bg'],
    '--color-tertiary-bg': variables['$color-tertiary-bg'],
    '--color-platform-bg': variables['$color-platform-bg'],
    '--color-header-bg': variables['$color-header-bg'],
    '--color-footer-bg': variables['$color-footer-bg'],
  };
}